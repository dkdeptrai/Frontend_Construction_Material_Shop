import React from "react";
import SearchIcon from "../../../assets/icons/search.svg?react";
import FilterIcon from "../../../assets/icons/filter.svg?react";
import Select from "react-select";

import "./searchBar.css";

function SearchBar(props) {
  const options = props.options.map((option) => ({
    value: option,
    label: option,
  }));

  const handleChange = (option) => {
    if (option === null) {
      props.setFilter("");
    } else {
      props.setFilter(option.value);
    }
  };

  return (
    <div className="searchBarContainer">
      <SearchIcon className="searchIcon" />
      <input
        className="searchBar"
        type="text"
        placeholder={props.placeholder}
      />
      {props.options.length > 0 && (
        <Select
          placeholder="Filter"
          className="searchOptions"
          options={options}
          isSearchable={false}
          isClearable={true}
          onChange={handleChange}
          components={{
            DropdownIndicator: (props) => {
              return (
                <div>
                  <FilterIcon
                    style={{ margin: "4px 10px 0px 10px" }}
                    {...props.innerProps}
                  />
                </div>
              );
            },
            ClearIndicator: (props) => {
              return <div onClick={props.clearValue}>x</div>;
            },
          }}
        />
      )}
    </div>
  );
}

export default SearchBar;
