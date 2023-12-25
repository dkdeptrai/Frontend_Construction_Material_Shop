import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";

import "./table.css";
import { current } from "@reduxjs/toolkit";

function Table(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = props.columns;
  const rows = props.rows;
  //Add cellName's field's name so that we can navigate to more information page
  
  const cellName = props.cellName;
  //IdentifyRoute is the field's name that we can identify each row

  const selectedRowIds = props.selectedRowIds;

  const noCheckboxSelection = props.noCheckboxSelection;

  const identifyRoute = props.identifyRoute;
  const handleRowSelection = props.onRowSelection;
  const pageSizeOptions = [5, 10, 20];
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const handlePageSizeChange = (params) => {
    console.log("Page size changed", params);
    setPageSize(params.pageSize);
  };

  const handlePageChange = (params) => {
    console.log("Page changed", params);
    setPage(params.page);
  };

  const handleCellClick = (params) => {
    if (params.field === cellName && params.field === "name") {
      navigate(location.pathname + "/" + params.row[identifyRoute]);
    }
    if (params.field === cellName && params.field === "amount") {
      
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
        pageSizeOptions={pageSizeOptions}
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
