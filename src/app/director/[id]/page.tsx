"use client";

import { useGetPersonDetails } from "@/context/persons/application";
import { useRouteId } from "@/utils/navigation";

import styles from "./director.module.css";

export default function Director() {
  const directorId = useRouteId();

  const { data } = useGetPersonDetails({
    personId: Number(directorId),
  });

  console.log(data);

  return (
    <div
      className={styles.page}
    >{`Hello this is the page for ${directorId}!`}</div>
  );
}
