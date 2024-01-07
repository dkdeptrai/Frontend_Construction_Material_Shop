import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subroute: null,
  products: [],
  selectedRowIds: [],
  paginationModel: {
    pageSize: 10,
    page: 0,
    total: 0,
  },
  searchPaginationModel: {
    pageSize: 10,
    page: 0,
    total: 0,
  },
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSubroute: (state, action) => {
      state.subroute = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedRowIds: (state, action) => {
      state.selectedRowIds = action.payload;
    },
    setPaginationModel: (state, action) => {
      state.paginationModel = action.payload;
    },
    setSearchPaginationModel: (state, action) => {
      state.searchPaginationModel = action.payload;
    },
  },
});

export const {
  setSubroute,
  setProducts,
  setSelectedRowIds,
  setPaginationModel,
  setSearchPaginationModel,
} = productsSlice.actions;

export default productsSlice.reducer;
