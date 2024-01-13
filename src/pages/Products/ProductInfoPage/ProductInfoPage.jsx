import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import BackButton from "../../../components/layouts/backButton/backButton.jsx";
import InputComponent from "../../../components/InputComponent/InputComponent.jsx";
import ImageInputComponent from "../../../components/ImageInputComponent/ImageInputComponent.jsx";
import "./ProductInfoPage.css";
import { API_CONST } from "../../../constants/apiConstants.jsx";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen.jsx";

function ProductInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const [isLoading, setIsLoading] = useState(false);
  const name = useSelector((state) => state.productInfo.name);
  const origin = useSelector((state) => state.productInfo.origin);
  const description = useSelector((state) => state.productInfo.description);
  const unitPrice = useSelector((state) => state.productInfo.unitPrice);
  const unit = useSelector((state) => state.productInfo.unit);
  const image = useSelector((state) => state.productInfo.image);

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
          dispatch({
            type: "SET_PRODUCT_INFO_PAGE_NAME",
            payload: product.name,
          });
          dispatch({
            type: "SET_PRODUCT_INFO_PAGE_ORIGIN",
            payload: product.origin,
          });
          dispatch({
            type: "SET_PRODUCT_INFO_PAGE_DESCRIPTION",
            payload: product.description,
          });
          dispatch({
            type: "SET_PRODUCT_INFO_PAGE_UNIT_PRICE",
            payload: product.unitPrice,
          });
          dispatch({
            type: "SET_PRODUCT_INFO_PAGE_UNIT",
            payload: product.calculationUnit,
          });
          dispatch({
            type: "SET_PRODUCT_INFO_PAGE_IMAGE",
            payload: product.imageUrl,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchProductDetails();
  }, [productId]);

  const navigateBackToProducts = () => {
    dispatch({ type: "SET_PRODUCTS_PAGE_SUBROUTE", payload: null });
    navigate("/products");
  };

  const clearInput = () => {
    setImage(null);
    dispatch({ type: "SET_PRODUCT_INFO_PAGE_NAME", payload: "" });
    dispatch({ type: "SET_PRODUCT_INFO_PAGE_ORIGIN", payload: "" });
    dispatch({ type: "SET_PRODUCT_INFO_PAGE_DESCRIPTION", payload: "" });
    dispatch({ type: "SET_PRODUCT_INFO_PAGE_UNIT_PRICE", payload: "" });
    dispatch({ type: "SET_PRODUCT_INFO_PAGE_UNIT", payload: "" });
    dispatch({ type: "SET_PRODUCT_INFO_PAGE_IMAGE", payload: null });
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
      {isLoading && <LoadingScreen />}

      <BackButton content="Add Product" handleClick={navigateBackToProducts} />
      <form>
        <InputComponent
          label="Name"
          type="text"
          value={name}
          setValue={(value) =>
            dispatch({
              type: "SET_PRODUCT_INFO_PAGE_NAME",
              payload: value,
            })
          }
        />
        <InputComponent
          label="Origin"
          type="text"
          value={origin}
          setValue={(value) =>
            dispatch({
              type: "SET_PRODUCT_INFO_PAGE_ORIGIN",
              payload: value,
            })
          }
        />
        <div className="units">
          <InputComponent
            label="Unit Price"
            type="number"
            value={unitPrice}
            setValue={(value) =>
              dispatch({
                type: "SET_PRODUCT_INFO_PAGE_UNIT_PRICE",
                payload: value,
              })
            }
          />
          <InputComponent
            label="Unit"
            type="text"
            value={unit}
            setValue={(value) =>
              dispatch({
                type: "SET_PRODUCT_INFO_PAGE_UNIT",
                payload: value,
              })
            }
          />
        </div>
        <InputComponent
          label="Description"
          type="text"
          value={description}
          setValue={(value) =>
            dispatch({
              type: "SET_PRODUCT_INFO_PAGE_DESCRIPTION",
              payload: value,
            })
          }
        />

        <ImageInputComponent
          imageUrl={image}
          setImage={(value) =>
            dispatch({
              type: "SET_PRODUCT_INFO_PAGE_IMAGE",
              payload: value,
            })
          }
        />
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
