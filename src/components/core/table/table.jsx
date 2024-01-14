import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./table.css";

function Table(props) {
  const navigate = useNavigate();
  const location = useLocation();

  //Add cellName's field's name so that we can navigate to more information page

  const cellName = props.cellName;
  const longNavigate = props.longNavigate; //if true, we will navigate to more information page when click on any cell
  //IdentifyRoute is the field's name that we can identify each row

  const noCheckboxSelection = props.noCheckboxSelection;
  const disableRowSelectionOnClick = props.disableRowSelectionOnClick || false;

  const identifyRoute = props.identifyRoute;

  const handlePaginationChange = (params) => {
    if (props.paginationModel.page !== params.page) {
      props.onPaginationModelChange({
        ...props.paginationModel,
        page: params.page,
      });
    }
  };
  const handleCellClick = props.handleCellClick
    ? props.handleCellClick
    : (params, event) => {
        if (
          params.field === cellName &&
          (params.field === "name" || params.field === "id")
        ) {
          if (longNavigate) {
            navigate("/orders/" + params.row[identifyRoute]);
          } else {
            navigate(location.pathname + "/" + params.row[identifyRoute]);
          }
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
        rowCount={props.paginationModel?.total ?? 0}
        rows={props.rows}
        columns={props.columns}
        checkboxSelection={!noCheckboxSelection}
        onRowSelectionModelChange={props.onRowSelection}
        rowSelectionModel={props.selectedRowIds}
        pagination={true}
        paginationModel={props.paginationModel}
        onPaginationModelChange={handlePaginationChange}
        pageSizeOptions={[10]}
        onCellClick={handleCellClick}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
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
