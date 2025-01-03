import Image from "next/image";
import React from "react";

import styles from "./movie-card.module.css";

interface MovieCardProps {
  id: number;
  title: string;
  releaseDate: string;
  overview: string;
  posterPath?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  releaseDate,
  overview,
  posterPath,
}) => {
  return (
    <div className={styles.movieCard} data-movie-id={id}>
      <div className={styles.movieCardImage}>
        {posterPath ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={`${title} Poster`}
            width={300}
            height={450}
            className={styles.image}
          />
        ) : (
          <div className={styles.movieCardPlaceholder}>No Image Available</div>
        )}
      </div>
      <div className={styles.movieCardContent}>
        <h2 className={styles.movieCardTitle}>{title}</h2>
        <p className={styles.movieCardReleaseDate}>
          Release Date: {releaseDate}
        </p>
        <p className={styles.movieCardOverview}>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
