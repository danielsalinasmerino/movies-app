import React from "react";

import MovieCard from "@/components/movie-list/movie-card/movie-card";
import { Movie } from "@/context/movies/domain";

import styles from "./movie-list.module.css";

interface MovieListProps {
  movies: Array<Movie>;
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          overview={movie.overview}
          posterPath={movie.posterPath}
        />
      ))}
    </div>
  );
};

export default MovieList;
