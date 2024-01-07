import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./table.css";

function Table(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // default values
  const defaultPagignationModel = { page: 0, pageSize: 10, total: 0 };
  const paginationModel = props.paginationModel || defaultPagignationModel;

  //Add cellName's field's name so that we can navigate to more information page

  const cellName = props.cellName;
  //IdentifyRoute is the field's name that we can identify each row

  const noCheckboxSelection = props.noCheckboxSelection;

  const identifyRoute = props.identifyRoute;

  const handlePaginationChange = (params) => {
    props.onPaginationModelChange((prevModel) => {
      if (prevModel.page !== params.page) {
        return { ...prevModel, page: params.page };
      } else {
        return prevModel;
      }
    });

    // props.fetchPageData(params.page, params.pageSize);
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
        paginationMode="server"
        rowCount={paginationModel.total}
        rows={props.rows}
        columns={props.columns}
        checkboxSelection={!noCheckboxSelection}
        onRowSelectionModelChange={props.onRowSelection}
        rowSelectionModel={props.selectedRowIds}
        pagination={true}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationChange}
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
