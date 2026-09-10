import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { getLocaleDateFns } from "@/utils/getLocaleDateFns";

export function useLocaleDateFns() {
  const { localeInfo } = useBaseConfig();
  return getLocaleDateFns(localeInfo.calendar);
}
