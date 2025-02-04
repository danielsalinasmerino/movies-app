import React from "react";

import MovieListItem from "@/components/movie-list/movie-list-item/movie-list-item";
import { MovieWithCredits } from "@/context/movies/domain";

import styles from "./movie-list.module.css";

interface MovieListProps {
  movies: Array<MovieWithCredits>;
  query: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, query }) => {
  const renderResultsMessage = () => {
    if (!query) return null;

    const message = movies.length
      ? `Showing results for "${query}"`
      : `No results found for "${query}"`;

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
