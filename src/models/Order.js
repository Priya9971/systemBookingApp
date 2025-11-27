import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true }, // merchantTransactionId
    amount: { type: Number, required: true }, // in paisa (PhonePe requires *100)
    upiId: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    phonepeResponse: { type: Object }, // raw PhonePe response
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);


