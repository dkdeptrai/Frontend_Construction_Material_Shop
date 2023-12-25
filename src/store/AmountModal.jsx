import { createSlice } from "@reduxjs/toolkit";

export const amountModalSlice = createSlice({
  name: "anmountModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openAmountModal: (state) => {
      state.isOpen = true;
    },
    closeAmountModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAmountModal, closeAmountModal } = amountModalSlice.actions;

export default amountModalSlice.reducer;
