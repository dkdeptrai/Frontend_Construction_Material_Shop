import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/layouts/backButton/backButton";
import InputComponent from "../../components/InputComponent/InputComponent";
import ImageInputComponent from "../../components/ImageInputComponent/ImageInputComponent.jsx";

import "./ProductInfoPage.css";
import { API_CONST } from "../../constants/apiConstants.jsx";
function ProductInfoPage() {
  const params = useParams();
  const productId = params.id;
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        console.log(productId);
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/products/${productId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          const product = await response.json();
          setName(product.name);
          setOrigin(product.origin);
          setDescription(product.description);
          setUnitPrice(product.unitPrice);
          setUnit(product.calculationUnit);
          setImage(product.image);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchProductDetails();
  }, [productId]);

  const clearInput = () => {
    setName("");
    setOrigin("");
    setDescription("");
    setUnitPrice("");
    setUnit("");
    setImage(null);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        setIsLoading(false);

        return;
      }
    }

    const formData = new FormData();

    if (image) {
      formData.append("image", image);
    } else {
      alert("Please choose an image");
      setIsLoading(false);

      return;
    }
    for (let key in registerRequest) {
      formData.append(key, registerRequest[key]);
    }
    try {
      console.log(formData.get("name"));
      console.log(sessionStorage.getItem("token"));
      const response = await fetch(
        productId
          ? `${API_CONST}/products/${productId}`
          : `${API_CONST}/products?image=`,
        {
          method: productId ? "PUT" : "POST",
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
      setIsLoading(false);
    }

    setIsLoading(false);
    clearInput();
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
        <button
          className="submitButton"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : productId ? "Update" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductInfoPage;
