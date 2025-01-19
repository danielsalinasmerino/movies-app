"use client";

import Image from "next/image";
import React, { ChangeEvent } from "react";

import { useAppDispatch, useAppSelector } from "@/utils/react-redux";
import { setSearchValue } from "@/utils/react-redux/features/searchSlice";

import styles from "./header.module.css";

const LOGO_PATH = `/images/logos/alt_short_blue.svg`;

const Header = () => {
  const dispatch = useAppDispatch();

  const searchValue = useAppSelector((state) => state.search.value);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchValue(event.target.value));

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
