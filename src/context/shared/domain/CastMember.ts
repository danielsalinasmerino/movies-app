import { Person } from "@/context/persons/domain";

export type CastMember = Person & {
  castId: number;
  character: string;
  creditId: string;
  order: number;
};

export const CastMembers = {
  create: (param: Partial<CastMember>): CastMember => param as CastMember,
};
