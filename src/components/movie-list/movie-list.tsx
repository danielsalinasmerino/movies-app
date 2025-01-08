import React from "react";

import MovieListItem from "@/components/movie-list/movie-list-item/movie-list-item";
import { Movie } from "@/context/movies/domain";

import styles from "./movie-list.module.css";

interface MovieListProps {
  movies: Array<Movie>;
  query: string;
}

const MovieList: React.FC<MovieListProps> = ({ movies, query }) => {
  return (
    <div className={styles.movieList}>
      <div className={styles.movieListHeader}>
        {`Showing results for "${query}"`.toLocaleUpperCase()}
      </div>
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
        />
      ))}
    </div>
  );
};

export default MovieList;
