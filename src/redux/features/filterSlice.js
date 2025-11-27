import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    hotelName: "",
    priceRange: [125, 980],
    propertyTypes: [],
    starRating: [],
  },
  reducers: {
    setHotelName: (state, action) => {
      state.hotelName = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setPropertyTypes: (state, action) => {
      state.propertyTypes = action.payload;
    },
    setStarRating: (state, action) => {
      state.starRating = action.payload;
    },
  },
});

export const { setHotelName, setPriceRange, setPropertyTypes, setStarRating } = filterSlice.actions;
export default filterSlice.reducer; // Ensure the reducer is exported
