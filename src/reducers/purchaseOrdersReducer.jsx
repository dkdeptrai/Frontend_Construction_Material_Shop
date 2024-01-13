const initialState = {
  purchaseOrdersData: [],
  subroute: null,
  searchResults: [],
  paginationModel: {
    pageSize: 10,
    page: 0,
    total: 0,
  },
};

const purchaseOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PURCHASE_ORDERS":
      return {
        ...state,
        purchaseOrdersData: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_SUBROUTE":
      return {
        ...state,
        subroute: action.payload,
      };
    case "SET_PURCHASE_ORDERS_PAGE_PAGINATION_MODEL":
      return {
        ...state,
        paginationModel: action.payload,
      };
  }
  return state;
};

export default purchaseOrdersReducer;
