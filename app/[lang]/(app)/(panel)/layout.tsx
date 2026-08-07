import PanelHeader from "@/app/[lang]/(app)/(panel)/components/home/PanelHeader";
import { AppSidebar, SidebarInset } from "./components/home/Sidebar";
import SidebarProvider from "./services/sidebar/SidebarProvider";

export default function PanelLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <PanelHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
