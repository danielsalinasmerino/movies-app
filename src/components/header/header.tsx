"use client";

import Image from "next/image";
import React, { ChangeEvent, useMemo } from "react";

import Loader from "@/components/loader/loader";
import { useI18Translation } from "@/utils/i18next";
import { useAppDispatch, useAppSelector } from "@/utils/react-redux";
import { setSearchValue } from "@/utils/react-redux/features/moviesSearchSlice";

import styles from "./header.module.css";

const LOADER_SIZE = 24;
const LOGO_PATH = `/images/logos/alt_short_blue.svg`;

const Header = () => {
  const dispatch = useAppDispatch();

  const isLoadingMoviesSearch = useAppSelector(
    (state) => state.moviesSearch.isLoading
  );
  const searchValue = useAppSelector((state) => state.moviesSearch.searchValue);

  const translate = useI18Translation("component.header");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setSearchValue(event.target.value));

  const loaderContainerStyle = useMemo(
    () => ({ width: LOADER_SIZE, opacity: isLoadingMoviesSearch ? 1 : 0 }),
    [isLoadingMoviesSearch]
  );

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
          placeholder={translate("placeholder")}
          className={styles.searcher}
        />
        <div style={loaderContainerStyle}>
          <Loader size={LOADER_SIZE} />
        </div>
      </div>
    </header>
  );
};

export default Header;
