import React, { useState } from "react";
import BackButton from "../../components/layouts/backButton/backButton";
import InputComponent from "../../components/InputComponent/InputComponent";
import ImageInputComponent from "../../components/ImageInputComponent/ImageInputComponent";

import "./addProductPage.css";
//TODO: handle submission through api
function AddProductPage() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();

    const registerRequest = {
      name: name,
      origin: origin,
      description: description,
      unitPrice: unitPrice,
      calculationUnit: unit,
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
      const response = await fetch(
        "http://localhost:8080/api/v1/products?image=",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

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
