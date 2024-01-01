import React, { useState, useEffect } from "react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import FilterIcon from "../../../assets/icons/filter.svg?react";
import RemoveIcon from "../../../assets/icons/remove.svg?react";

import "./searchBar.css";

function AppliedFilters({ filters, onRemove }) {
  return (
    <ul className="filterGrid">
      {Object.entries(filters).map(([key, value]) => (
        <li className="filterItem" key={key}>
          <span className="filterKey">{value.label}</span>: {value.value}
          <RemoveIcon
            className="removeFilterButton"
            onClick={() => onRemove(key)}
          />
        </li>
      ))}
    </ul>
  );
}
//TODO: handle api fetch
function SearchBar(props) {
  const [filters, setFilters] = useState({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://your-api-endpoint")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Fetch error: ", error);
        // Set error state here
      });
  }, []);

  const options = props.options.map((option) => ({
    value: option,
    label: option,
  }));

  const handleSearch = props.handleSearch;

  const handleFiltersSubmit = (event) => {
    event.preventDefault();

    if (selectedKey.trim() === "" || selectedValue.trim() === "") {
      return;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [selectedKey]: { label: selectedKey, value: selectedValue },
    }));
    setSelectedValue("");
  };

  const handleKeyChange = (event) => {
    setSelectedKey(event.target.value);
  };

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if (props.options && props.options.length > 0) {
      setSelectedKey(props.options[0]);
    }
  }, [props.options]);

  const removeFilter = (key) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[key];
      return newFilters;
    });
  };

  return (
    <div>
      <div className="searchBarContainer">
        <SearchIcon className="searchIcon" />
        <input
          className="searchBar"
          type="text"
          placeholder={props.placeholder}
        />
        <button
          className="filterButton"
          onClick={() => setShowFilterPanel(!showFilterPanel)}
        >
          <FilterIcon />
        </button>
        <button className="searchButton" onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>
      <div>
        {showFilterPanel && (
          <div className="filterPanel">
            <AppliedFilters filters={filters} onRemove={removeFilter} />
            <form onSubmit={handleFiltersSubmit}>
              <label>
                Filter:
                <select
                  value={selectedKey}
                  onChange={handleKeyChange}
                  style={{ margin: "20px", width: "auto" }}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Value:
                <input
                  type="text"
                  value={selectedValue}
                  onChange={handleValueChange}
                />
              </label>
              <button type="submit">Apply Filter</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
