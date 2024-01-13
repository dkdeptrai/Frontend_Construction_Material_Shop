const initialState = {
  subroute: null,
  employees: [],
  paginationModel: {
    page: 0,
    pageSize: 10,
    total: 0,
  },
  searchResults: [],
  selectedRowIds: [],
  showSearchResults: false,
  searchPaginationModel: {
    page: 0,
    pageSize: 10,
    total: 0,
  },
  searchQuery: "",
  filterOption: "name",
};

const employeePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES_PAGE_SUBROUTE":
      return {
        ...state,
        subroute: action.payload,
      };
    case "SET_EMPLOYEES_PAGE_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
      };
    case "SET_EMPLOYEES_PAGE_PAGINATION_MODEL":
      return {
        ...state,
        paginationModel: action.payload,
      };
    case "SET_EMPLOYEES_PAGE_SELECTED_ROW_IDS":
      return {
        ...state,
        selectedRowIds: action.payload,
      };
    case "SET_EMPLOYEES_PAGE_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_EMPLOYEES_PAGE_SHOW_SEARCH_RESULTS":
      return {
        ...state,
        showSearchResults: action.payload,
      };
    case "SET_EMPLOYEES_PAGE_SEARCH_PAGINATION_MODEL":
      return {
        ...state,
        searchPaginationModel: action.payload,
      };
    case "SET_EMPLOYEES_PAGE_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_EMPLOYEES_PAGE_FILTER_OPTION":
      console.log(action.payload);
      return {
        ...state,
        filterOption: action.payload,
      };
  }

  return state;
};

export default employeePageReducer;
