import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    gender: { type: String, default: "" },
    dateOfBirth: { type: String, default: "" },
    maritalStatus: { type: String, default: "" },
    anniversaryDate: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    phone: { type: String, unique: true, required: true },
    email: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);

