import React, { useState, useEffect } from "react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import FilterIcon from "../../../assets/icons/filter.svg?react";

import "./searchBar.css";
import Select from "react-select";

function SearchBar(props) {
  const handleSearch = props.handleSearch;
  const options = props.options
    ? Array.isArray(props.options)
      ? props.options.map((option) => ({
          value: option,
          label: option,
        }))
      : Object.entries(props.options).map(([key, value]) => ({
          value: value,
          label: key,
        }))
    : [];
  const optionsCount = Object.keys(options).length;

  const handleChange = (option) => {
    if (option === null) {
      props.setFilter("");
    } else {
      props.setFilter(option.value);
    }
  };
  return (
    <div>
      <div className="searchBarContainer">
        <input
          value={props.value}
          className="searchBar"
          type="text"
          placeholder={props.placeholder}
          onChange={props.handleSearchQueryChange}
        />
        {optionsCount > 0 && (
          <Select
            placeholder="Filter"
            className="searchOptions"
            options={options}
            isSearchable={false}
            isClearable={false}
            defaultValue={options[0]}
            onChange={handleChange}
            components={{
              DropdownIndicator: () => {
                return (
                  <div>
                    <FilterIcon style={{ margin: "4px 10px 0px 10px" }} />
                  </div>
                );
              },
            }}
          />
        )}
        <button className="searchButton" onClick={handleSearch}>
          <SearchIcon />
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default SearchBar;
