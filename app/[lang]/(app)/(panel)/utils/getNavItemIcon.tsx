import { ComponentProps } from "react";
import { navItems } from "./navItems";
import { cn } from "@/lib/utils";
import { FaTasks } from "react-icons/fa";
import { BsChatSquareDotsFill } from "react-icons/bs";
import { TbAppsFilled } from "react-icons/tb";
import { HiHome } from "react-icons/hi2";

export function getNavItemIcon(
  title: (typeof navItems)[number]["title"],
  props?: ComponentProps<"svg">,
) {
  switch (title) {
    case "home":
      return <HiHome {...props} className={cn("", props?.className)} />;
    case "chats":
      return (
        <BsChatSquareDotsFill {...props} className={cn("", props?.className)} />
      );
    case "projects":
      return <TbAppsFilled {...props} className={cn("", props?.className)} />;
    case "tasks":
      return <FaTasks {...props} className={cn("", props?.className)} />;
    default:
      return null;
  }
}
