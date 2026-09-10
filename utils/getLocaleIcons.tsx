import { type Locale } from "@/internalization/app/localization";
import IranFlag from "@/components/flags/IranFlag";
import { SVGProps } from "react";

export function getLocaleIcon(locale: Locale, props?: SVGProps<SVGSVGElement>) {
  switch (locale) {
    case "en":
      return null;
  }
  return <IranFlag {...props} />;
}
