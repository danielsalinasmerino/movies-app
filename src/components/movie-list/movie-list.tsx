import React from "react";

import MovieListItem from "@/components/movie-list/movie-list-item/movie-list-item";
import { MovieWithCredits } from "@/context/movies/domain";
import { useI18Translation } from "@/utils/i18next";

import styles from "./movie-list.module.css";

interface MovieListProps {
  movies: Array<MovieWithCredits>;
  query: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, query }) => {
  const translate = useI18Translation("component.movieList");

  const renderResultsMessage = () => {
    if (!query) return null;

    const message = movies.length
      ? translate("showingResults", { query })
      : translate("noResultsFound", { query });

    return (
      <div className={styles.movieListHeader}>{message.toUpperCase()}</div>
    );
  };

  return (
    <div className={styles.movieList}>
      {renderResultsMessage()}
      {movies.map((movie) => (
        <MovieListItem key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default MovieList;
