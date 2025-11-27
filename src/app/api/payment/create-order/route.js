// app/api/payment/create-order/route.js
import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { upiId, selectedOption, amountToPayNow, totalAmount } = body;

    console.log("📩 Received Data:", { upiId, selectedOption, amountToPayNow, totalAmount });

    // ✅ validate UPI ID
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(upiId)) {
      return new Response(JSON.stringify({ error: "Invalid UPI ID format" }), { status: 400 });
    }

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || "1";
    const baseUrl = process.env.PHONEPE_BASE_URL;

    const orderId = `ORD-${Date.now()}`;

    // ✅ Choose final amount
    const finalAmount = selectedOption === "partial" ? amountToPayNow : totalAmount;

    await Order.create({
      orderId,
      amount: finalAmount,
      upiId,
      status: "PENDING",
    });

    const payload = {
      merchantId,
      merchantTransactionId: orderId,
      merchantUserId: `U${Date.now()}`,
      amount: finalAmount * 100, // convert ₹ to paise
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-status?orderId=${orderId}`,
      redirectMode: "POST",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/webhook`,
      paymentInstrument: {
        type: "UPI_COLLECT",
        vpa: upiId,
      },
    };

    const payloadString = JSON.stringify(payload);
    const base64Payload = Buffer.from(payloadString).toString("base64");

    const checksum =
      crypto.createHash("sha256").update(base64Payload + "/pg/v1/pay" + saltKey).digest("hex") +
      "###" +
      saltIndex;

    return new Response(
      JSON.stringify({
        success: true,
        orderId,
        data: base64Payload,
        checksum,
        url: `${baseUrl}/pg/v1/pay`,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Create Order Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
