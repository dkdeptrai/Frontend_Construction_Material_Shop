import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BackButton from "../../../components/layouts/backButton/backButton.jsx";
import InputComponent from "../../../components/InputComponent/InputComponent.jsx";
import ImageInputComponent from "../../../components/ImageInputComponent/ImageInputComponent.jsx";
import "./ProductInfoPage.css";
import { API_CONST } from "../../../constants/apiConstants.jsx";
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle.jsx";

function ProductInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        try {
          const response = await fetch(`${API_CONST}/products/${productId}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });
          const product = await response.json();
          setName(product.name);
          setOrigin(product.origin);
          setDescription(product.description);
          setUnitPrice(product.unitPrice);
          setUnit(product.calculationUnit);
          setImage(product.imageUrl);
          console.log(image);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchProductDetails();
  }, [productId]);

  const navigateBackToProducts = () => {
    dispatch({ type: "SET_SUBROUTE", payload: null });
    navigate("/products");
  };

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
      if (productId) {
        alert("Product updated successfully!");
      } else {
        alert("Product added successfully!");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    setIsLoading(false);
    clearInput();
  };

  return (
    <div className="addProductPage">
      {isLoading && <LoadingCircle />}

      <BackButton content="Add Product" handleClick={navigateBackToProducts} />
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

        <ImageInputComponent imageUrl={image} setImage={setImage} />
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
