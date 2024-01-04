import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import BackButton from "../../components/layouts/backButton/backButton.jsx";
import InputComponent from "../../components/InputComponent/InputComponent.jsx";
import { idID } from "@mui/material/locale";
import { API_CONST } from "../../constants/apiConstants.jsx";
import { selectedIdsLookupSelector } from "@mui/x-data-grid";

function WarehouseInfoPage() {
  const params = useParams();
  const warehouseId = params.id;
  const location = useLocation();
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isChange, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          setAddress(warehouse.address);
          setCapacity(warehouse.capacity);
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      }
    };
    fetchWarehouseDetails();
  }, [warehouseId]);

  const clearInput = () => {
    setAddress("");
    setCapacity("");
  };
  const handleChange = (e) => {
    setIsChanged(true);
  };

  const handleClick = async (e) => {
    console.log(`clicking`);
    e.preventDefault();
    setIsLoading(true);
    const registerRequest = {
      address: address,
      capacity: capacity,
    };

    for (let key in registerRequest) {
      if (
        key !== "imageURL" &&
        (registerRequest[key] === null || registerRequest[key] === "")
      ) {
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
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    setIsLoading(false);
    clearInput();
  };

  return (
    <div className="warehouseInfoPage">
      <BackButton content="Warehouse Information" />
      <form>
        <InputComponent
          label="Address"
          type="text"
          value={address}
          setValue={setAddress}
        />
        <InputComponent
          label="Capacity"
          type="number"
          value={capacity}
          setValue={setCapacity}
        />

        <button
          className="submitButton"
          onClick={handleClick}
          // disabled={!isChange}
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
