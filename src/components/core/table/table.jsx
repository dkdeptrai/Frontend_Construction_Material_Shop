import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./table.css";

function Table(props) {
  const columns = props.columns;
  const rows = props.rows;
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

  return (
    <div>
      <DataGrid
        className="table"
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={handleRowSelection}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={pageSizeOptions}
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
