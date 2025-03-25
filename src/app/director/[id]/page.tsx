"use client";

import { useMemo } from "react";

import Image from "@/components/image/image";
import {
  useGetPersonDetails,
  useGetPersonMoviesCredits,
} from "@/context/persons/application";
import { PersonMoviesCreditsTools } from "@/context/persons/domain";
import { Job } from "@/context/shared/domain/Job";
import { useRouteId } from "@/utils/navigation";

import styles from "./director.module.css";

export default function Director() {
  const directorId = useRouteId();

  const { data: personDetails } = useGetPersonDetails({
    personId: Number(directorId),
  });

  const { data: personMoviesCredits } = useGetPersonMoviesCredits({
    personId: Number(directorId),
  });

  const moviesDirectedBy = useMemo(() => {
    if (personMoviesCredits) {
      return PersonMoviesCreditsTools.getMoviesWhereIsCrewByJob(
        personMoviesCredits,
        Job.Director
      );
    }
    return [];
  }, [personMoviesCredits]);

  if (!personDetails) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <Image
          baseImageUrl={"TMDB"}
          src={personDetails.profilePath}
          alt={personDetails.name}
          width={120}
          height={120}
          className={styles.profileImage}
          loading="lazy"
        />
        <div>
          <h1 className={styles.name}>{personDetails.name}</h1>
          <p className={styles.department}>
            {personDetails.knownForDepartment}
          </p>
          <p className={styles.details}>
            Born: {personDetails.birthday} in {personDetails.placeOfBirth}
          </p>
        </div>
      </div>

      {/* Biography Section */}
      <div className={styles.biography}>
        <h2>Biography</h2>
        <p>{personDetails.biography}</p>
      </div>

      {/* Filmography */}
      <div className={styles.filmography}>
        <h2>Filmography</h2>
        <div className={styles.moviesGrid}>
          {moviesDirectedBy.length > 0 ? (
            moviesDirectedBy.map((movie) => (
              <div key={movie.id} className={styles.movieCard}>
                <p>
                  {movie.title} ({movie.releaseYear})
                </p>
              </div>
            ))
          ) : (
            <p className={styles.noMovies}>No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
