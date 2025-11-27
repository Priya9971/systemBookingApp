import mongoose from "mongoose";

const BreakdownSchema = new mongoose.Schema({
  baseFare: Number,
  extraFare: Number,
  driverCharges: Number,
  tollTax: Number,
  airportParking: Number,
  nightCharges: Number,
  stateTax: Number,
  gst: Number,
  convenienceFee: Number,
  surgeFare: Number,
}, { _id: false });

const FareBreakdownSchema = new mongoose.Schema({
  breakdown: BreakdownSchema
}, { _id: false });

const SurgeAppliedRouteSchema = new mongoose.Schema({
  source: String,
  destination: String,
  basekm: Number,
  per_km_charges: Number,
  per_km_extra_charges: Number,
  driver_charges_perday: Number,
  tripType: String,
  carType: String,
  carModel: String,
  fuel_type: String,
  basic_type: String,
  toll_tax: Number,
  airport_parking: Number,
  state_tax: Number,
  night_charges: Number,
  gst: Number,
  isState_tax_include: Boolean,
  isAirport_parking: Boolean,
  status: { type: String, default: "Active" },
  total_price: Number,
  appliedSurgeSlug: String,
  fare_breakdown: FareBreakdownSchema
}, {
  timestamps: true
});

export default mongoose.models.SurgeAppliedRouteData || mongoose.model("SurgeAppliedRouteData", SurgeAppliedRouteSchema);