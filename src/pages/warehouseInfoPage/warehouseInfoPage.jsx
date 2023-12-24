import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../../components/layouts/backButton/backButton.jsx";
import InputComponent from "../../components/InputComponent/InputComponent.jsx";

function WarehouseInfoPage() {
  const location = useLocation();
  const warehouse = location.state.warehouse;
  const [name, setName] = useState(warehouse.name);
  const [address, setAddress] = useState(warehouse.address);
  const [capacity, setCapacity] = useState(warehouse.capacity);
  const [isChange, setIsChanged] = useState(false);

  const handleChange = (e) => {
    setIsChanged(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const registerRequest = {
      name: name,
      address: address,
      capacity: capacity,
    };

    for (let key in registerRequest) {
      if (
        key !== "imageURL" &&
        (registerRequest[key] === null || registerRequest[key] === "")
      ) {
        alert(`Please fill in the ${key}`);
        return;
      }

      //TODO: handle api call
    }

    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    } else {
      alert("Please choose an image");
      return;
    }
    for (let key in registerRequest) {
      formData.append(key, registerRequest[key]);
    }
    try {
      console.log(formData.get("name"));
      console.log(sessionStorage.getItem("token"));
      const response = await fetch("http://localhost:8080/api/v1/warehouses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert("Warehouse added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="warehouseInfoPage">
      <BackButton content="Warehouse Information" />
      <form>
        <InputComponent
          label="Name"
          type="text"
          value={name}
          setValue={setName}
        />
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
          disabled={!isChange}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default WarehouseInfoPage;
