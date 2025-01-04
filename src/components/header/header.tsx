"use client";

import React, { ChangeEvent } from "react";

import { useSearchContext } from "@/contexts/search-context";

const Header = () => {
  const { searchValue, setSearchValue } = useSearchContext();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue && setSearchValue(event.target.value);

  return (
    <header>
      <div>
        <input
          type="text"
          id="searchValue"
          name="searchValue"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search here..."
        />
      </div>
    </header>
  );
};

export default Header;
