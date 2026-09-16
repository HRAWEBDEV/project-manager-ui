"server-only";
import {
  type Locale,
  getLocaleOrDefault,
} from "@/internalization/app/localization";

type ProjectsDictionary = typeof import("./fa.json");

const dictionaries: Record<Locale, () => Promise<ProjectsDictionary>> = {
  fa: () => import("./fa.json").then((res) => res.default),
  en: () => import("./fa.json").then((res) => res.default),
};

function getProjectsDictionary({ locale }: { locale: Locale }) {
  const activeLocale = getLocaleOrDefault(locale);
  return dictionaries[activeLocale]();
}

export type { ProjectsDictionary };
export { getProjectsDictionary };
