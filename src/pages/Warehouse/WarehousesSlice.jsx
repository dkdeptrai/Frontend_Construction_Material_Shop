import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subroute: null,
};

export const warehousesSlice = createSlice({
  name: "warehouses",
  initialState,
  reducers: {
    setSubroute: (state, action) => {
      state.subroute = action.payload;
    },
  },
});

export const { setSubroute } = warehousesSlice.actions;

export default warehousesSlice.reducer;
