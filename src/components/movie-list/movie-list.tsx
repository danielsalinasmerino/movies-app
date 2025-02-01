import React from "react";

import MovieListItem from "@/components/movie-list/movie-list-item/movie-list-item";
import { MovieWithCredits } from "@/context/movies/domain";

import styles from "./movie-list.module.css";

interface MovieListProps {
  movies: Array<MovieWithCredits>;
  query: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, query }) => {
  return (
    <div className={styles.movieList}>
      {query && (
        <div className={styles.movieListHeader}>
          {`Showing results for "${query}"`.toLocaleUpperCase()}
        </div>
      )}
      {movies.map((movie) => (
        <MovieListItem
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseYear={movie.releaseYear}
          posterPath={movie.posterPath}
          originalTitle={movie.originalTitle}
          originalCountryCode={movie.originalCountryCode}
          overview={movie.overview}
          credits={movie.credits}
        />
      ))}
    </div>
  );
};

export default MovieList;
