// tripSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    pickupCity: '',
    dropCity: '',
    pickupDate: '',
    pickupTime: '',
    tripType: '',
    distance: 0,
    duration: ''
  },
  reducers: {
    setTripData: (state, action) => ({ ...state, ...action.payload })
  }
});

export const { setTripData } = tripSlice.actions;
export default tripSlice.reducer;
