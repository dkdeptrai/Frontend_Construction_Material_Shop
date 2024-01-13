import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//pages and components
import SearchBar from "../../../components/layouts/searchBar/searchBar.jsx";
import Table from "../../../components/core/table/table.jsx";
import ExportButton from "../../../components/layouts/exportButton/exportButton.jsx";
import NewButton from "../../../components/layouts/newButton/newButton.jsx";
import StatusContainer from "../../../components/StatusContainer/StatusContainer.jsx";
import { API_CONST } from "../../../constants/apiConstants.jsx";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen.jsx";

//selected products state
import { useDispatch, useSelector } from "react-redux";

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
    total: 0,
  });

  //loadiing circle
  const [loading, setLoading] = useState(true);

  const purchaseOrdersFromStore = useSelector(
    (state) => state.purchaseOrders.purchaseOrdersData
  );

  //get all sale orders
  useEffect(() => {
    if (purchaseOrdersFromStore.length > 0) {
      console.log("get purchase orders from store");
      setPurchaseOrders(purchaseOrdersFromStore);
      setLoading(false);
      return;
    }
    fetch(API_CONST + "/orders?orderType=PURCHASE", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        const newPurchaseOrders = [];
        for (let i = 0; i < data.results.length; i++) {
          const order = data.results[i];
          const employeeData = await fetch(
            API_CONST + "/users/employees/" + order.createdUserId,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          );

          const employee = await employeeData.json();

          const dateString = new Date(order.createdTime).toLocaleDateString();

          const newOrder = {
            id: order.id,
            employeeCode: employee.employeeCode,
            employeeName: employee.name,
            total: order.total,
            date: dateString,
            status: order.status,
          };
          newPurchaseOrders.push(newOrder);
        }
        dispatch({ type: "SET_PURCHASE_ORDERS", payload: newPurchaseOrders });
        console.log("get PUrCHASE orders from api");
        setPurchaseOrders(newPurchaseOrders);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleClick = () => {
    navigate("/purchase-orders/add");
  };

  const options = ["Employee Code", "Employee Name", "Total", "Date", "Status"];

  const orderColumns = [
    {
      field: "id",
      headerName: "No.",
      width: 50,
      valueGetter: (params) => purchaseOrders.indexOf(params.row) + 1,
    },
    {
      field: "employeeCode",
      headerName: "Employee's code",
      flex: 0.4,
    },
    {
      field: "employeeName",
      headerName: "Employee's name",
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
      valueGetter: (params) => params.row.total.toLocaleString() + " $",
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
      {loading && <LoadingScreen />}
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
        paginationModel={paginationModel}
        noCheckboxSelection
      />
    </div>
  );
};

export default PurchaseOrders;
