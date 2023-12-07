import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./states/Modal.jsx";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
