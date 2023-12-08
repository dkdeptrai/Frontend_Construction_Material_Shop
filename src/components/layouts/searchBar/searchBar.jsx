import React, { useState, useEffect } from "react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import FilterIcon from "../../../assets/icons/filter.svg?react";
import Select from "react-select";
import "./searchBar.css";

function SearchBar(props) {
  const options = props.options.map((option) => ({
    value: option,
    label: option,
  }));

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(props.selectedOption);
  }, [props.selectedOption]);

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="searchBarContainer">
      <SearchIcon className="searchIcon" />
      <input
        className="searchBar"
        type="text"
        placeholder={props.placeholder}
      />
      <Select
        className="searchOptions"
        options={options}
        isSearchable={false}
        onChange={handleChange}
        components={{
          DropdownIndicator: (props) => {
            return (
              <div>
                <FilterIcon {...props.innerProps} />
              </div>
            );
          },
        }}
      />
    </div>
  );
}

export default SearchBar;
