import React, { useState, useEffect } from "react";
import BackButton from "../layouts/backButton/backButton";
import InputComponent from "../InputComponent/InputComponent";

function AddWarehousePage() {
  //TODO: handle submission through api
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
      if (
        key !== "imageURL" &&
        (registerRequest[key] === null || registerRequest[key] === "")
      ) {
        alert(`Please fill in the ${key}`);
        return;
      }
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
    <div className="addProductPage">
      <BackButton content="Add Product" />
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
