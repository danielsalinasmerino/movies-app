import { useCallback } from "react";

import i18next from "./i18n";

export function useI18Translation(
  parentKey: string,
  ns: string = "translation"
) {
  return useCallback(
    (subkey: string, variables?: Record<string, string>) =>
      i18next.t(`${parentKey}.${subkey}`, { ns, ...variables }),
    [parentKey, ns]
  );
}
