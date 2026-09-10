import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "../../services/side-bar/components/Sidebar";
import PanelAddress from "./PanelAddress";
import HeaderProfile from "./HeaderProfile";
import HeaderTools from "./HeaderTools";
import HistoryControllers from "../../services/history/components/HistoryControllers";

export default function Header() {
  return (
    <header className="flex h-(--panel-header-height) shrink-0 items-center gap-2 border-b border-border">
      <div className="flex items-center gap-1 ps-4 grow">
        <SidebarTrigger />
        <div className="hidden lg:block">
          <HistoryControllers />
        </div>
        <Separator
          orientation="vertical"
          className="me-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <PanelAddress />
      </div>
      <div className="flex flex-row-reverse items-center gap-1 pe-4">
        <HeaderProfile />
        <Separator
          orientation="vertical"
          className="me-2 data-vertical:h-4 data-vertical:self-auto"
        />
        <HeaderTools />
      </div>
    </header>
  );
}
