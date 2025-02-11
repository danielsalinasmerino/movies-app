import Image from "next/image";
import React from "react";
import "flag-icons/css/flag-icons.min.css";

import Button from "@/components/button/button";
import { MovieCredits, MovieCreditsTools } from "@/context/movies/domain";
import { useI18Translation } from "@/utils/i18next";

import styles from "./movie-list-item.module.css";

interface MovieListItemProps {
  id: number;
  title: string;
  originalTitle: string;
  originalCountryCode: string;
  releaseYear?: number;
  voteAverage: number;
  voteCount: number;
  posterPath?: string;
  credits?: MovieCredits;
}

const BASE_IMAGES_TMDB_URL = "https://image.tmdb.org/t/p/w500";

const MovieListItem: React.FC<MovieListItemProps> = ({
  id,
  title,
  originalTitle,
  originalCountryCode,
  releaseYear,
  voteAverage,
  voteCount,
  posterPath,
  credits,
}) => {
  const translate = useI18Translation("component.movieList.movieListItem");

  const renderPoster = () =>
    posterPath ? (
      <Image
        src={`${BASE_IMAGES_TMDB_URL}${posterPath}`}
        alt={`${title} Poster`}
        width={100}
        height={150}
        className={styles.image}
        loading="lazy"
      />
    ) : (
      <div className={styles.imagePlaceholder} aria-hidden="true">
        {translate("noImageAvailable")}
      </div>
    );

  const renderRating = () =>
    `${Math.round(voteAverage * 10) / 10} - ${voteCount}`;

  return (
    <div
      className={styles.movieListItem}
      data-testid={`movie-item-${id}`}
      data-movie-id={id}
    >
      <div>{renderPoster()}</div>
      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <h2 className={styles.title}>
            {title}{" "}
            {releaseYear && (
              <span className={styles.releaseYear}>{releaseYear}</span>
            )}
          </h2>
          <p>
            {originalTitle}{" "}
            {originalCountryCode && (
              <span className={`fi fi-${originalCountryCode}`} />
            )}
          </p>
        </div>
        <p className={styles.overview}>{renderRating()}</p>
        {credits && (
          <div className={styles.directors}>
            {MovieCreditsTools.getDirectors(credits).map((director) => (
              <Button key={director.id} label={director.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieListItem;
