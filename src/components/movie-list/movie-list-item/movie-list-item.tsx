import Image from "next/image";
import React, { useMemo } from "react";
import "flag-icons/css/flag-icons.min.css";

import styles from "./movie-list-item.module.css";

interface MovieListItemProps {
  id: number;
  title: string;
  originalTitle: string;
  originalCountryCode: string;
  releaseYear?: number;
  overview: string;
  posterPath?: string;
}

const BASE_IMAGES_TMDB_URL = "https://image.tmdb.org/t/p/w500";

const MovieListItem: React.FC<MovieListItemProps> = ({
  id,
  title,
  originalTitle,
  originalCountryCode,
  releaseYear,
  overview,
  posterPath,
}) => {
  const posterSrc = useMemo(
    () => (posterPath ? `${BASE_IMAGES_TMDB_URL}${posterPath}` : ""),
    [posterPath]
  );

  const posterAlt = useMemo(() => `${title} Poster`, [title]);

  return (
    <div
      className={styles.movieListItem}
      data-testid={`movie-item-${id}`}
      data-movie-id={id}
    >
      <div>
        {posterPath ? (
          <Image
            src={posterSrc}
            alt={posterAlt}
            width={100}
            height={150}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            No Image Available
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <h2 className={styles.title}>
            {title} {releaseYear ? `- ${releaseYear}` : ""}
          </h2>
          <p className={styles.releaseYear}>
            Original title: {originalTitle}{" "}
            {originalCountryCode && (
              <span className={`fi fi-${originalCountryCode}`}></span>
            )}
          </p>
        </div>
        <p className={styles.overview}>{overview}</p>
      </div>
    </div>
  );
};

export default MovieListItem;
