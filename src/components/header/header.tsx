"use client";

import Image from "next/image";
import React, { ChangeEvent } from "react";

import { useSearchContext } from "@/contexts/search-context";

import styles from "./header.module.css";

const LOGO_PATH = `/images/logos/alt_short_blue.svg`;

const Header = () => {
  const { searchValue, setSearchValue } = useSearchContext();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue && setSearchValue(event.target.value);

  return (
    <header>
      <div className={styles.header}>
        <Image
          src={LOGO_PATH}
          alt={`TMDB logo`}
          width={100}
          height={100}
          className={styles.logo}
          priority
        />
        <input
          type="text"
          id="searchValue"
          name="searchValue"
          value={searchValue}
          onChange={handleInputChange}
          placeholder="Search"
          className={styles.searcher}
        />
      </div>
    </header>
  );
};

export default Header;
