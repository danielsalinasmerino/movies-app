"use client";

import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import Image from "@/components/image/image";
import Loader from "@/components/loader/loader";
import { ENTER } from "@/constants";
import { routes } from "@/routes";
import { useI18Translation } from "@/utils/i18next";
import { useCurrentPath, useNavigate, useRouteId } from "@/utils/navigation";
import { useAppSelector } from "@/utils/react-redux";

import styles from "./header.module.css";

const LOADER_SIZE = 24;
const LOGO_PATH = `/images/logos/alt_short_blue.svg`;

const Header = () => {
  const isLoadingMoviesSearch = useAppSelector(
    (state) => state.moviesSearch.isLoading
  );

  const translate = useI18Translation("component.header");

  const currentPath = useCurrentPath();

  const navigate = useNavigate();

  const routeId = useRouteId();

  const isSearchPage = useMemo(
    () => currentPath.includes("search"),
    [currentPath]
  );

  const [searchValue, setSearchValue] = useState(isSearchPage ? routeId : "");

  useEffect(() => {
    if (!isSearchPage) setSearchValue("");
  }, [isSearchPage]);

  const loaderContainerStyle = useMemo(
    () => ({ width: LOADER_SIZE, opacity: isLoadingMoviesSearch ? 1 : 0 }),
    [isLoadingMoviesSearch]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== ENTER.key) return;

    const trimmedSearch = searchValue.trim();
    if (!trimmedSearch) return;

    navigate(routes.search(trimmedSearch));
  };

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
          onKeyDown={handleKeyDown}
        />
        <div style={loaderContainerStyle}>
          <Loader size={LOADER_SIZE} />
        </div>
      </div>
    </header>
  );
};

export default Header;
