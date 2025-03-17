import { CastMember, CrewMember } from "@/context/shared/domain";

// TODO
export type PersonCredits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export const PersonCreditsTools = {
  create: (param: Partial<PersonCredits>): PersonCredits =>
    param as PersonCredits,
};
