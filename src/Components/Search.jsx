import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../src/Components/apis";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const response_1 = await response.json();

    return {
      options: response_1.data.map((city) => {
        return {
          isResponseOk: true,
          latitude: city.latitude,
          longitude: city.longitude,
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  const customStyles = {
    control: (base) => ({
      ...base,
      width: 350,
      borderRadius: 100,
      border: 0,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: "#414141",
      Color: "#fff",
    }),
  };

  return (
    <AsyncPaginate
      styles={customStyles}
      className="AsyncPaginate"
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
