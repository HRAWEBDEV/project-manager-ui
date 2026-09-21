import { SVGProps } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
import { GoOrganization } from "react-icons/go";
import { MdWorkspaces } from "react-icons/md";
import { FaRegKeyboard } from "react-icons/fa";
import { MdOutlineWeb } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { settingItems } from "./settingItems";

export function getSettingsIcon(
  mode?: (typeof settingItems)[number]["key"],
  props?: SVGProps<SVGSVGElement>,
) {
  switch (mode) {
    case "userInfo":
      return <FaUserCircle {...props} />;
    case "notifications":
      return <IoMdNotifications {...props} />;
    case "organization":
      return <GoOrganization {...props} />;
    case "organizationMembers":
      return <FaPeopleGroup {...props} />;
    case "workspace":
      return <BsPersonWorkspace {...props} />;
    case "myWorkspaces":
      return <MdWorkspaces {...props} />;
    case "shortcuts":
      return <FaRegKeyboard {...props} />;
    case "userInterface":
      return <MdOutlineWeb {...props} />;
    case "logout":
      return <RiLogoutBoxRFill {...props} />;
  }
  return null;
}
