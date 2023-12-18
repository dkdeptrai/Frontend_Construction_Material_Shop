import React, { useState } from "react";
import BackButton from "../../layouts/backButton/backButton";
import InputComponent from "../../InputComponent/InputComponent";
import ImageInputComponent from "../../ImageInputComponent/ImageInputComponent";

import "./addProductPage.css";
//TODO: handle submission through api
function AddProductPage() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    const registerRequest = {
      name: name,
      origin: origin,
      description: description,
      unitPrice: unitPrice,
      calculationUnit: unit,
      image: image,
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

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerRequest),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert("Product added successfully");
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
          label="Origin"
          type="text"
          value={origin}
          setValue={setOrigin}
        />
        <div className="units">
          <InputComponent
            label="Unit Price"
            type="number"
            value={unitPrice}
            setValue={setUnitPrice}
          />
          <InputComponent
            label="Unit"
            type="text"
            value={unit}
            setValue={setUnit}
          />
        </div>
        <InputComponent
          label="Description"
          type="text"
          value={description}
          setValue={setDescription}
        />

        <ImageInputComponent setImage={setImage} />
        <button className="submitButton" onClick={handleClick}>
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
