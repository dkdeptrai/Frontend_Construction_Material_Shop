import React, { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/layouts/backButton/backButton";
import InputComponent from "../../components/InputComponent/InputComponent";
import ImageInputComponent from "../../components/ImageInputComponent/ImageInputComponent";

import "./ProductInfoPage.css";
//TODO: handle submission through api

function fetchProduct(id) {
  let product = {};
  //TODO: fetch product from api
  return product;
}

function ProductInfoPage() {
  const productId = useParams();
  const product = fetchProduct(productId);
  const [name, setName] = useState(product.name);
  const [origin, setOrigin] = useState(product.origin);
  const [description, setDescription] = useState(product.description);
  const [unitPrice, setUnitPrice] = useState(product.unitPrice);
  const [unit, setUnit] = useState(product.calculationUnit);
  const [image, setImage] = useState(product.image);

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
    <div
      className="ProductInfoPage
  "
    >
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

export default ProductInfoPage;
