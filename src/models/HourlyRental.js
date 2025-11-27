import mongoose from "mongoose";

const hourlyRentalSchema = new mongoose.Schema(
  {
    source: { type: String, required: true, trim: true },

    package: {
      type: String,
      required: true,
      enum: [
        "2Hrs 20Km",
        "4Hrs 40Km",
        "6Hrs 60Km",
        "8Hrs 80Km",
        "10Hrs 100Km",
        "12Hrs 120Km",
      ],
    },

    carType: {
      type: String,
      required: true,
      enum: ["Sedan", "Hatchback", "SUV", "Innova-Crysta", "TempoTraveller"],
    },
    carModel: {
      type: String,
      enum: [
        "Indica/Wagon R",
        "Dzire/Equivalent",
        "Dzire",
        "Ertiga/Xylo",
        "Ertiga",
        "Innova Crysta",
        "Innova Hycross",
      ],
    },

    fuel_type: {
      type: String,
      enum: ['CNG','CNG/Pertrol','Petrol', 'Electric'],
      trim: true
    },
    per_km_charges: { type: Number, required: true, min: 0 },
    extra_km: { type: Number, default: 0, min: 0 },
    base_fare: { type: Number, required: true, min: 0 },
    actual_fare: { type: Number, required: true, min: 0 },
    extra_hour: { type: Number, default: 0, min: 0 },
    night_charges: { type: Number, default: 0, min: 0 },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      trim: true,
    },

    slug: { type: String },
  },
  {
    timestamps: true,
  }
);


const HourlyRental =
  mongoose.models?.HourlyRental ||
  mongoose.model("HourlyRental", hourlyRentalSchema);

export default HourlyRental;
