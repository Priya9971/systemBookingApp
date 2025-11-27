import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await dbConnect();
    const { orderId } = req.body;

    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || "1";
    const baseUrl = process.env.PHONEPE_BASE_URL;

    const url = `/pg/v1/status/${merchantId}/${orderId}`;

    const checksum = crypto
      .createHash("sha256")
      .update(url + saltKey)
      .digest("hex") + "###" + saltIndex;

    const response = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    });

    const data = await response.json();

    // ✅ update DB status if needed
    const order = await Order.findOne({ orderId });
    if (order && order.status === "PENDING") {
      order.status = data.success ? "SUCCESS" : "FAILED";
      order.phonepeResponse = data;
      await order.save();
    }

    return res.json(data);
  } catch (err) {
    console.error("Verify Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
