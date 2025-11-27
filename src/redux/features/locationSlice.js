import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  source: null,
  destination: null,
  pickupDate: { date: "", time: "", iso: "" },
  returnDate: null,
  distance: 0,
  duration: "", // ✅ Added duration to store estimated trip time
  rentalHours: 0, // ✅ Added rental hours for round trip/rentals
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setSource: (state, action) => {
      state.source = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setPickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
    setReturnDate: (state, action) => {
      state.returnDate = action.payload;
    },
    setRentalHours: (state, action) => {
      state.rentalHours = action.payload;
    },
  },
});

// ✅ Export all actions
export const { 
  setSource, 
  setDestination, 
  setPickupDate, 
  setReturnDate, 
  setDistance, 
  setDuration, 
  setRentalHours, 
} = locationSlice.actions;

export default locationSlice.reducer;
