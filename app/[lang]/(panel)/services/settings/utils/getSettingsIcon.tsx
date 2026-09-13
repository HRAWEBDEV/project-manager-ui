import { SVGProps } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { GoOrganization } from "react-icons/go";
import { settingItems } from "./settingItems";

export function getSettingsIcon(
  mode?: (typeof settingItems)[number]["key"],
  props?: SVGProps<SVGSVGElement>,
) {
  switch (mode) {
    case "userInfo":
      return <FaUserCircle {...props} />;
    case "organization":
      return <GoOrganization {...props} />;
    case "workspace":
      return <BsPersonWorkspace {...props} />;
    case "general":
      return <IoSettingsSharp {...props} />;
    case "logout":
      return <RiLogoutBoxRFill {...props} />;
  }
  return null;
}
