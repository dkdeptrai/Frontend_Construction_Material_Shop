import React from "react";
import SearchBar from "../../layouts/searchBar/searchBar";
import "./productsPage.css";

function ProductsPage() {
  const options = ["product", "category", "brand", "price", "quantity"];
  return (
    <div className="pageContainer">
      <SearchBar
        options={options}
        placeholder="Search Inventory by name, ID or any related keywords"
      />
    </div>
  );
}

export default ProductsPage;
