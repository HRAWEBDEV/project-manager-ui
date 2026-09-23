import { createContext, use } from "react";
import {
  type Locale,
  type LocaleInfo,
} from "@/internalization/app/localization";
import { OutOfContext } from "@/utils/OutOfContext";
import { appColorTemplates } from "@/app/utils/appTemplates";

interface BaseConfig {
  locale: Locale;
  localeInfo: LocaleInfo;
  appVersion: string;
  appBirthDate: Date;
  setLocale: (newLocale: Locale) => unknown;
  onChangeColorTemplate: (color: (typeof appColorTemplates)[number]) => unknown;
}

const appVersion = "0.1.0";
const appBirthDate = new Date(2026, 9, 7);
const baseConfigContext = createContext<BaseConfig | null>(null);

function useBaseConfig(): BaseConfig {
  const val = use(baseConfigContext);
  if (!val) throw new OutOfContext("BaseConfig");
  return val;
}

export type { BaseConfig };
export { baseConfigContext, appVersion, appBirthDate, useBaseConfig };
