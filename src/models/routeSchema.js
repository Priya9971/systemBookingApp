import mongoose from "mongoose";

// Define Route schema
const RouteSchema = new mongoose.Schema(
  {
    source: { type: String, required: true },
    destination: { type: String, required: true },
    basekm: { type: Number, required: true },
    per_km_charges: { type: Number, required: true },
    per_km_extra_charges: { type: Number, required: true },
    driver_charges_perday: { type: Number, default: 0 },

    tripType: {
      type: String,
      enum: ["OneWay", "RoundTrip", "Airport-Transfer"],
      required: true,
      trim: true,
    },

    carType: {
      type: String,
      enum: ["Sedan", "Hatchback", "SUV", "Tempo-Traveller"],
      required: true,
      trim: true,
    },

    carModel: {
      type: String,
      enum: [
        "Indica/Wagon R",
        "Dzire/Equivalent",
        "Dzire",
        "Ertiga/Xylo",
        "Ertiga",
        "InnovaCryst",
        "InnovaHycross",
        "",
      ],
      trim: true,
    },

    basic_type: {
      type: String,
      enum: ["Airport-pickup", "Airport-drop", "Unknown"],
      default: "Unknown",
      trim: true,
    },

    fuel_type: {
      type: String,
      enum: ["CNG", "CNG/Pertrol", "Petrol", "Electric"],
      trim: true,
    },

    toll_tax: { type: Number, default: 0 },
    airport_parking: { type: Number, default: 0 },
    state_tax: { type: Number, default: 0 },
    night_charges: { type: Number, default: 0 },
    gst: { type: Number, default: 5 },

    total_price: { type: Number, required: true },

    isState_tax_include: { type: Boolean, default: false },
    isAirport_parking: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    slug: { type: String },
  },
  { timestamps: true }
);

// Export model safely in Next.js
export default mongoose.models.Route || mongoose.model("Route", RouteSchema);
