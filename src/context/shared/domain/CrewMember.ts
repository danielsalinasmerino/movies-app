import { Person } from "@/context/shared/domain";

export type CrewMember = Person & {
  creditId: string;
  department: string;
  job: string;
};

export const CrewMembers = {
  create: (param: Partial<CrewMember>): CrewMember => param as CrewMember,
};
