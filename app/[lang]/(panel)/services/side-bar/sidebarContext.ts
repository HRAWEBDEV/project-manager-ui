import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = use(SidebarContext);
  if (!context) {
    throw new OutOfContext("sidebar context");
  }
  return context;
}

export type { SidebarContextProps };
export { SidebarContext, useSidebar };
