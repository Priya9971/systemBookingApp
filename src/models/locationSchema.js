import mongoose from "mongoose";

// Location Schema
const LocationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, default: "" }, 
});

// Date & Time Schema
const DateTimeSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true }, 
});

// Main Reservation Schema
const ReservationSchema = new mongoose.Schema(
  {
    tripType: { 
      type: String, 
      enum: ["oneway", "roundtrip", "airport_transfer", "hourly_rental"],
      required: true 
    },
    
    distance: { type: String }, 
    duration: { type: String }, 
    
    // Common fields for all trip types
    pickupLocation: { type: LocationSchema, required: true },
    dropLocation: { type: LocationSchema }, 
    pickupDate: { type: DateTimeSchema, required: true },
    
    // Fields specific to certain trip types
    returnDate: { type: DateTimeSchema }, 

    // Extra fields for Hourly Rental
    rentalHours: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Location  || mongoose.model("Location", ReservationSchema);
