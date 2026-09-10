import { supportedDateFns } from "@/internalization/app/localization";
import { type Calendar } from "@/internalization/app/localization";

export function getLocaleDateFns(calendarType: Calendar) {
  return supportedDateFns[calendarType];
}
