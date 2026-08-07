import * as dateFns from "date-fns";
import * as dateFnsJalali from "date-fns-jalali";
import { faIR, enUS } from "date-fns-jalali/locale";

type LocaleInfo = (typeof locales)[keyof typeof locales];
type ContentDirection = LocaleInfo["contentDirection"];
type Calendar = LocaleInfo["calendar"];
type Locale = keyof typeof locales;

const locales = {
  fa: {
    locale: "fa",
    extension: "IR",
    contentDirection: "rtl",
    calendar: "jalali",
    localeName: "فارسی",
    localeShortName: "فا",
    active: true,
  },
  en: {
    locale: "en",
    extension: "US",
    contentDirection: "ltr",
    calendar: "gregorian",
    localeName: "English",
    localeShortName: "EN",
    active: false,
  },
} as const;

function getLocalInfo(locale: Locale): LocaleInfo {
  if (locale in locales) return locales[locale];
  return locales["en"];
}

function getLocaleOrDefault(locale: Locale): Locale {
  if (locale in locales) return locale;
  return "en";
}

const localesList = Object.keys(locales);

const supportedDateFns = {
  fa: dateFnsJalali,
  en: dateFns,
} as const;

const dateFnsLocale = {
  fa: faIR,
  en: enUS,
} as const;

export type { ContentDirection, Calendar, Locale, LocaleInfo };
export {
  locales,
  getLocalInfo,
  localesList,
  supportedDateFns,
  getLocaleOrDefault,
  dateFnsLocale,
};
