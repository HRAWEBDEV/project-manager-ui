"use client";
import { ReactNode, useState } from "react";
import {
  type BaseConfig,
  baseConfigContext,
  appBirthDate,
  appVersion,
} from "./baseConfigContext";
import { type Locale, locales } from "@/internalization/app/localization";
import { setUserLocale } from "@/utils/userLocaleManager";
import { ThemeProvider } from "next-themes";
import { appColorTemplates } from "@/app/utils/appTemplates";

interface Props {
  activeLocale: Locale;
  children: ReactNode;
}

export default function BaseConfigProvider({ children, activeLocale }: Props) {
  const [activeColor, setActiveColor] = useState<
    (typeof appColorTemplates)[number] | null
  >(null);
  // locale handler
  function onChangeLocale(newLocale: Locale) {
    if (newLocale === activeLocale) return;
    setUserLocale(newLocale);
    const url = new URL(location.href);
    url.pathname = url.pathname.replace(`/${activeLocale}`, `/${newLocale}`);
    location.href = url.href;
  }
  //
  function handleChangeColorTemplate(
    newColorTemplate: (typeof appColorTemplates)[number],
  ) {
    document.documentElement.classList.add(newColorTemplate);
    setActiveColor(newColorTemplate);
    if (activeColor) {
      document.documentElement.classList.remove(activeColor);
    }
  }
  //
  const activeLocaleInfo = locales[activeLocale];
  // context value
  const ctx: BaseConfig = {
    locale: activeLocale,
    localeInfo: activeLocaleInfo,
    appVersion,
    appBirthDate,
    setLocale: onChangeLocale,
    onChangeColorTemplate: handleChangeColorTemplate,
  };

  // useEffect(() => {
  //   const ctx = new AbortController();
  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     e.returnValue = true;
  //     return true;
  //   };
  //   window.onbeforeunload = handleBeforeUnload;
  //   window.addEventListener("beforeunload", handleBeforeUnload, {
  //     signal: ctx.signal,
  //   });
  //   return () => ctx.abort();
  // }, []);

  return (
    <baseConfigContext.Provider value={ctx}>
      <ThemeProvider attribute="class" defaultTheme="system">
        {children}
      </ThemeProvider>
    </baseConfigContext.Provider>
  );
}
