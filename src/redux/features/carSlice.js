import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cars: [
    {
      id: 1,
      name: "Indica, Wagon R",
      type: "Hatchback",
      seats: 4,
      fuel: "CNG",
      price: 7438,
      discount: 15,
      image: "/car1.jpg",
    },
    {
      id: 2,
      name: "Swift Dzire",
      type: "Sedan",
      seats: 4,
      fuel: "Petrol",
      price: 8200,
      discount: 10,
      image: "/car2.jpg",
    },
  ],
  filters: { minPrice: 0, maxPrice: 10000, fuelType: "" },
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export const { setFilters } = carSlice.actions;
export default carSlice.reducer;
