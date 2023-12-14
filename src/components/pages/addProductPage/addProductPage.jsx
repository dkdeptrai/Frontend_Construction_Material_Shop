import React, { useState } from "react";
import BackButton from "../../layouts/backButton/backButton";
import InputComponent from "../../InputComponent/InputComponent";
import ImageInputComponent from "../../ImageInputComponent/ImageInputComponent";

import "./addProductPage.css";

function AddProductPage() {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");

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
      </form>
    </div>
  );
}

export default AddProductPage;
