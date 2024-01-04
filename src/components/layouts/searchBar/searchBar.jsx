import React, { useState, useEffect } from "react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import FilterIcon from "../../../assets/icons/filter.svg?react";
import RemoveIcon from "../../../assets/icons/remove.svg?react";

import "./searchBar.css";

function SearchBar(props) {
  const handleSearch = props.handleSearch;

  return (
    <div>
      <div className="searchBarContainer">
        <input
          className="searchBar"
          type="text"
          placeholder={props.placeholder}
          onChange={props.handleSearchQueryChange}
        />
        <button className="searchButton" onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default SearchBar;
