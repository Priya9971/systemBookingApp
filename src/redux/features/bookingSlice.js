import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  car: null,
  trip: null,
  passengerInfo: {
    name: '',
    email: '',
    phone: '',
    gender: '',
  },
  payment: null,
  useBillingAddress: false,
  filteredRoutes: null, // ✅ Should be null before filtering
  surgeRoutes: [],       // can stay empty array
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDetails: (state, action) => {
      const {
        car,
        trip,
        passengerInfo,
        payment,
        useBillingAddress,
      } = action.payload;

      if (car) state.car = car;
      if (trip) state.trip = trip;
      if (passengerInfo) {
        state.passengerInfo = { ...state.passengerInfo, ...passengerInfo };
      }
      if (payment !== undefined) state.payment = payment;
      if (useBillingAddress !== undefined) {
        state.useBillingAddress = useBillingAddress;
      }
    },

    clearBookingDetails: (state) => {
      state.car = null;
      state.trip = null;
      state.passengerInfo = initialState.passengerInfo;
      state.payment = null;
      state.useBillingAddress = false;
      state.filteredRoutes = null; // ✅ Reset to null
      state.surgeRoutes = [];
    },

    resetBookingState: (state) => { // ✅ added for tab change
      state.car = null;
      state.trip = null;
      state.passengerInfo = initialState.passengerInfo;
      state.payment = null;
      state.useBillingAddress = false;
      state.filteredRoutes = null;
      state.surgeRoutes = [];
    },

    updatePassengerInfo: (state, action) => {
      state.passengerInfo = { ...state.passengerInfo, ...action.payload };
    },

    setFilteredRoutes: (state, action) => {
      // ✅ If payload is a valid array, set it; otherwise, reset to null
      state.filteredRoutes = Array.isArray(action.payload)
        ? action.payload
        : null;
    },

    setSurgeRoutes: (state, action) => {
      state.surgeRoutes = Array.isArray(action.payload)
        ? action.payload
        : [];
    },
  },
});

export const {
  setBookingDetails,
  clearBookingDetails,
  updatePassengerInfo,
  resetBookingState,
  setFilteredRoutes,
  setSurgeRoutes,
} = bookingSlice.actions;

export default bookingSlice.reducer;
