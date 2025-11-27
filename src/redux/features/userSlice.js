import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  maritalStatus: "",
  anniversaryDate: "",
  city: "",
  state: "",
  phone: "",
  email: "",
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetProfile: () => initialState,
  },
});

export const { setUser, updateProfile, resetProfile } = userSlice.actions;
export default userSlice.reducer;
