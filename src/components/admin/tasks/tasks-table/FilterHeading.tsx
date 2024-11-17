import React from "react";
import SearchInput from "./SearchInput";
import LayoutSwitch from "./LayoutSwitch";
import SortBy from "./SortBy";
import Filters from "./Filters";

const FilterHeading = () => {
  return (
    <div className="flex justify-between items-center">
      <SearchInput />
      <LayoutSwitch />
      <SortBy />
      <Filters />
    </div>
  );
};

export default FilterHeading;
