import React, { useState, useEffect } from "react";
import BackButton from "../components/layouts/backButton/backButton";
import InputComponent from "../components/InputComponent/InputComponent";

function AddWarehousePage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState(0);

  const handleClick = async (e) => {
    e.preventDefault();

    const registerRequest = {
      name: name,
      address: address,
      capacity: capacity,
    };

    for (let key in registerRequest) {
      if (registerRequest[key] === null || registerRequest[key] === "") {
        alert(`Please fill in the ${key}`);
        return;
      }
    }
  };

  return (
    <div className="addProductPage">
      <BackButton content="Add Warehouse" />
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

        <button className="submitButton" onClick={handleClick}>
          Add Warehouse
        </button>
      </form>
    </div>
  );
}

export default AddWarehousePage;
