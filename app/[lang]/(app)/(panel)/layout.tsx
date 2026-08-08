import PanelHeader from "@/app/[lang]/(app)/(panel)/components/home/header/PanelHeader";
import { SidebarInset } from "./components/home/navigation/Sidebar";
import SidebarProvider from "./services/sidebar/SidebarProvider";
import { PanelInfoProvider } from "./services/panel-info/PanelInfoProvider";
import { ProfileProvider } from "./services/profile/ProfileProvider";
import AppSidebar from "./components/home/navigation/Navigation";

export default function PanelLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <PanelInfoProvider>
        <SidebarProvider className="flex flex-col">
          <ProfileProvider>
            <PanelHeader />
            <div className="flex flex-1">
              <AppSidebar />
              <SidebarInset>{children}</SidebarInset>
            </div>
          </ProfileProvider>
        </SidebarProvider>
      </PanelInfoProvider>
    </div>
  );
}
