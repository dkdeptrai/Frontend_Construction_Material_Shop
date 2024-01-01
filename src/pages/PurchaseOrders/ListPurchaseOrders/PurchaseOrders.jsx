import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";
import StatusContainer from "../../../components/StatusContainer/StatusContainer.jsx";

//selected products state
import { useDispatch } from "react-redux";
import { setSelectedProducts } from "../../../actions/selectedProductsAction.jsx";

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [purchaseOrders, setSaleOrders] = useState([]);

  useEffect(() => {
    dispatch(setSelectedProducts([]));
  }, []);

  const handleClick = () => {
    navigate("/purchaseorders/add");
  };

  const options = [
    "Employee Code",
    "Employee Name",
    "Total",
    "Date",
    "Status",
  ];

  const orderColumns = [
    {
      field: "index",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => saleOrders.indexOf(params.row) + 1,
    },
    {
      field: "employeeCode",
      headerName: "Customer's phone number",
      flex: 0.4,
    },
    {
      field: "employeeName",
      headerName: "Customer's name",
      flex: 0.6,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.image} />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      flex: 0.4,
    },
    { field: "date", headerName: "Date", flex: 0.4 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.4,
      renderCell: (params) => <StatusContainer status={params.value} />,
    },
  ];

  return (
    <div className="pageContainer">
      <div className="toolBar">
        <SearchBar
          className="searchBar"
          options={options}
          placeholder="Search Products by name, ID or any related keywords"
        />
        <div className="buttonContainer">
          <ExportButton onClick={() => {}} />
          <NewButton text="New Order" onClick={handleClick} />
        </div>
      </div>
      <Table
        className="table"
        columns={orderColumns}
        rows={purchaseOrders}
        cellName="employeeCode"
        identifyRoute="id"
        noCheckboxSelection
      />
    </div>
  );
};

export default PurchaseOrders;
