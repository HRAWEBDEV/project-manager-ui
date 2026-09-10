"server-only";
import {
  type Locale,
  getLocaleOrDefault,
} from "@/internalization/app/localization";

type AuthDictionary = typeof import("./fa.json");

const dictionaries: Record<Locale, () => Promise<AuthDictionary>> = {
  fa: () => import("./fa.json").then((res) => res.default),
  en: () => import("./fa.json").then((res) => res.default),
};

function getAuthDictionary({ locale }: { locale: Locale }) {
  const activeLocale = getLocaleOrDefault(locale);
  return dictionaries[activeLocale]();
}

export type { AuthDictionary };
export { getAuthDictionary };
