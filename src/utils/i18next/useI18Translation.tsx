import { useCallback } from "react";

import i18next from "./i18n";

export function useI18Translation(parentKey: string, ns?: string) {
  return useCallback(
    (subkey: string) => i18next.t(`${parentKey}.${subkey}`, { ns }),
    [parentKey, ns]
  );
}
