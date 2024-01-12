import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../../components/layouts/backButton/backButton.jsx";
import InputComponent from "../../../components/InputComponent/InputComponent.jsx";
import { API_CONST } from "../../../constants/apiConstants.jsx";

function WarehouseInfoPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const warehouseId = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const address = useSelector((state) => state.warehouseInfo.address);
  const capacity = useSelector((state) => state.warehouseInfo.capacity);
  console.log(
    "subroute",
    useSelector((state) => state.warehouses.subroute)
  );
  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      if (warehouseId) {
        console.log(`Warehouse id: ${warehouseId}`);
        try {
          const response = await fetch(
            `${API_CONST}/warehouses/${warehouseId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          const warehouse = await response.json();
          dispatch({
            type: "SET_WAREHOUSE_INFO_PAGE_ADDRESS",
            payload: warehouse.address,
          });
          dispatch({
            type: "SET_WAREHOUSE_INFO_PAGE_CAPACITY",
            payload: warehouse.capacity,
          });
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      }
    };
    fetchWarehouseDetails();
  }, [warehouseId]);

  const clearInput = () => {
    dispatch({
      type: "SET_WAREHOUSE_INFO_PAGE_ADDRESS",
      payload: "",
    });
    dispatch({
      type: "SET_WAREHOUSE_INFO_PAGE_CAPACITY",
      payload: "",
    });
  };

  const navigateBackToWarehouses = () => {
    console.log("navigateBackToWarehouses");
    dispatch({ type: "SET_WAREHOUSES_PAGE_SUBROUTE", payload: null });

    navigate("/warehouses");
  };

  const addNewWarehouse = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const registerRequest = {
      address: address,
      capacity: capacity,
    };

    for (let key in registerRequest) {
      if (registerRequest[key] === "" || registerRequest[key] === null) {
        alert(`Please fill in the ${key}`);
        setIsLoading(false);
        return;
      }
    }

    try {
      console.log(sessionStorage.getItem("token"));
      const response = await fetch(
        warehouseId
          ? `${API_CONST}/warehouses/${warehouseId}`
          : `${API_CONST}/warehouses`,
        {
          method: warehouseId ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerRequest),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert(
        warehouseId
          ? `Warehouse updated successfully!`
          : `Warehouse added successfully!`
      );

      setIsLoading(false);
      clearInput();
      if (warehouseId) {
        navigateBackToWarehouses();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="warehouseInfoPage">
      <BackButton
        content="Warehouse Information"
        handleClick={navigateBackToWarehouses}
      />
      <form>
        <InputComponent
          label="Address"
          type="text"
          value={address}
          setValue={(value) => {
            dispatch({
              type: "SET_WAREHOUSE_INFO_PAGE_ADDRESS",
              payload: value,
            });
          }}
        />
        <InputComponent
          label="Capacity"
          type="number"
          value={capacity}
          setValue={(value) => {
            dispatch({
              type: "SET_WAREHOUSE_INFO_PAGE_CAPACITY",
              payload: value,
            });
          }}
        />

        <button
          className="submitButton"
          onClick={addNewWarehouse}
          disabled={isLoading}
        >
          {isLoading
            ? "Submitting..."
            : warehouseId
            ? "Update"
            : "Add Warehouse"}
        </button>
      </form>
    </div>
  );
}
export default WarehouseInfoPage;
