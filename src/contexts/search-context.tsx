"use client";

import React, { createContext, ReactNode, useState } from "react";

interface ContextValue {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<ContextValue>({
  searchValue: "",
  setSearchValue: () => {
    throw new Error("setSearchValue must be used within a SearchProvider");
  },
});

export const useSearchContext = (): ContextValue => {
  const context = React.useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const SearchProvider: React.FC<Props> = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
