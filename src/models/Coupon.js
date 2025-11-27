import mongoose from "mongoose";

// Define the schema for Coupon
const CouponSchema = new mongoose.Schema(
  {
    couponName: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    image: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["Active", "Inactive", "Deactivated"], default: "Inactive" },
    slug: { type: String },
  },
  {
    timestamps: true, 
  }
);


export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);