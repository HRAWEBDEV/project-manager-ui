"server-only";
import {
  type Locale,
  getLocaleOrDefault,
} from "@/internalization/app/localization";

type TasksDictionary = typeof import("./fa.json");

const dictionaries: Record<Locale, () => Promise<TasksDictionary>> = {
  fa: () => import("./fa.json").then((res) => res.default),
  en: () => import("./fa.json").then((res) => res.default),
};

function getTasksDictionary({ locale }: { locale: Locale }) {
  const activeLocale = getLocaleOrDefault(locale);
  return dictionaries[activeLocale]();
}

export type { TasksDictionary };
export { getTasksDictionary };
