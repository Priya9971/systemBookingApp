import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await dbConnect();
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || "1";

    const responseBody = req.body;
    const xVerify = req.headers["x-verify"];

    // ✅ verify checksum
    const payloadBase64 = Buffer.from(JSON.stringify(responseBody)).toString("base64");
    const computedChecksum =
      crypto
        .createHash("sha256")
        .update(payloadBase64 + saltKey)
        .digest("hex") + "###" + saltIndex;

    if (computedChecksum !== xVerify) {
      return res.status(400).json({ error: "Invalid checksum" });
    }

    const { merchantTransactionId, code } = responseBody.data;

    // ✅ idempotent update
    const order = await Order.findOne({ orderId: merchantTransactionId });
    if (!order) return res.status(404).json({ error: "Order not found" });

    if (order.status === "PENDING") {
      order.status = code === "PAYMENT_SUCCESS" ? "SUCCESS" : "FAILED";
      order.phonepeResponse = responseBody;
      await order.save();
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
