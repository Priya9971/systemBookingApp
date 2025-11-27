import mongoose from "mongoose";

const SurgeSchema = new mongoose.Schema(
  {
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    taxiType: [{ type: String, required: true }], // CHANGED from String to [String]
    surgeFareType: [{ type: String, required: true }], // CHANGED from String to [String]
    tat: { type: String },
    surgeAmount: { type: String, required: true },
    sourceCity: { type: String, required: true },
    destinationCity: { type: String, required: true },
    appliedDateTime: { type: String, required: true },
    breakOn: {
      type: Boolean,
      default: false,
    },
    selectedPartner: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Surge || mongoose.model("Surge", SurgeSchema);
