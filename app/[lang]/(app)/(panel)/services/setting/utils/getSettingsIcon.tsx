import { ComponentProps } from "react";
import { settingsTabs } from "./settingsTabs";
import { cn } from "@/lib/utils";
import { FaUser } from "react-icons/fa6";
import { HiMiniBuildingOffice } from "react-icons/hi2";

export function getSettingsIcon(
  title: (typeof settingsTabs)[number]["title"],
  props?: ComponentProps<"svg">,
) {
  switch (title) {
    case "userInfo":
      return <FaUser {...props} className={cn("", props?.className)} />;
    case "organization":
      return (
        <HiMiniBuildingOffice {...props} className={cn("", props?.className)} />
      );
    default:
      return null;
  }
}
