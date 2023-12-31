import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSelectedProductsAmount } from "../../../actions/selectedProductsAction";

import "./table.css";

function Table(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const columns = props.columns;
  const rows = props.rows;
  //Add cellName's field's name so that we can navigate to more information page

  const cellName = props.cellName;
  //IdentifyRoute is the field's name that we can identify each row

  const selectedRowIds = props.selectedRowIds;

  const noCheckboxSelection = props.noCheckboxSelection;

  const identifyRoute = props.identifyRoute;
  const handleRowSelection = props.onRowSelection;
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const handlePaginationChange = (params) => {
    const newPaginationModel = {
      pageSize: params.pageSize,
      page: params.page,
    };

    props.fetchPageData(newPaginationModel.page, newPaginationModel.pageSize);
  };

  const handlePageChange = (params) => {
    console.log("Page changed", params);
    setPage(params.page);
  };

  const handleCellClick = (params, event) => {
    if (
      params.field === cellName &&
      (params.field === "name" || params.field === "customerPhone")
    ) {
      navigate(location.pathname + "/" + params.row[identifyRoute]);
    }
    if (params.field === cellName && params.field === "amount") {
      event.stopPropagation();
    }
  };

  return (
    <div>
      <DataGrid
        className="table"
        rows={rows}
        columns={columns}
        checkboxSelection={!noCheckboxSelection}
        onRowSelectionModelChange={handleRowSelection}
        rowSelectionModel={selectedRowIds}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10]}
        onCellClick={handleCellClick}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#FAFBFB",
          },
          "& .MuiDataGrid-cell": {
            border: "1px solid #EAECF0",
          },
          "& .MuiDataGrid-columnHeader": {
            border: "1px solid #EAECF0",
          },
        }}
      />
    </div>
  );
}

export default Table;
