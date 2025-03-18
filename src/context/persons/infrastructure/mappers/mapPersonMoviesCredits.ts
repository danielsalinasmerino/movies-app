import { mapMovie } from "@/context/movies/infrastructure/mappers";
import {
  PersonMoviesCredits,
  PersonMoviesCreditsTools,
} from "@/context/persons/domain";

// TODO: Do not use any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapPersonMoviesCredits = (data: any): PersonMoviesCredits => {
  return PersonMoviesCreditsTools.create({
    id: data.id,
    moviesWhereIsCast: Array.isArray(data.cast)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.cast.map((castData: any) => {
          return {
            ...mapMovie(castData),
            character: castData.character,
            creditId: castData.credit_id,
            order: castData.order,
          };
        })
      : [],
    moviesWhereIsCrew: Array.isArray(data.crew)
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.crew.map((crewData: any) => {
          return {
            ...mapMovie(crewData),
            creditId: crewData.credit_id,
            department: crewData.department,
            job: crewData.job,
          };
        })
      : [],
  });
};
