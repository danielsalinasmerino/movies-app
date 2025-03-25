import React, { useCallback } from "react";
import "flag-icons/css/flag-icons.min.css";

import Button from "@/components/button/button";
import Image from "@/components/image/image";
import { MovieCredits, MovieCreditsTools } from "@/context/movies/domain";
import { routes } from "@/routes";
import { useI18Translation } from "@/utils/i18next";
import { useNavigate } from "@/utils/navigation";

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

  const navigate = useNavigate();

  const renderPoster = () =>
    posterPath ? (
      <Image
        baseImageUrl={"TMDB"}
        src={posterPath}
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

  const navigateToDirectorPage = useCallback(
    (directorId: number) => navigate(routes.director(directorId.toString())),
    [navigate]
  );

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
              <Button
                key={director.id}
                label={director.name}
                onClick={() => navigateToDirectorPage(director.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieListItem;
