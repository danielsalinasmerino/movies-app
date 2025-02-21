import { useParams } from "next/navigation";

export function useRouteId(): string {
  const id = useParams()?.id as string | undefined;
  return id ?? "";
}
