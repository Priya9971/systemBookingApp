import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { toggleModal, setUser } = authSlice.actions;
export default authSlice.reducer;
