import { SVGProps } from "react";
import { navigationItems } from "./navigationItems";
import { GrNotes, GrProjects, GrTask } from "react-icons/gr";
import { BsChatSquareText } from "react-icons/bs";

export function getNavigationIcon(
  type: (typeof navigationItems)[number]["type"],
  props?: SVGProps<SVGSVGElement>,
) {
  switch (type) {
    case "chats":
      return <BsChatSquareText {...props} />;
    case "projects":
      return <GrProjects {...props} />;
    case "tasks":
      return <GrTask {...props} />;
    case "notes":
      return <GrNotes {...props} />;
    default:
      return null;
  }
}
