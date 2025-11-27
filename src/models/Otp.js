// models/Otp.js
import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    otpHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },

    // security & rate limiting
    attempts: { type: Number, default: 0 },
    requestCount: { type: Number, default: 1 },
    lastRequestAt: { type: Date, default: Date.now },
    lockedUntil: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
