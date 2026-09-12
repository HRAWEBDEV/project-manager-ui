import SidebarProvider from "../../[lang]/(panel)/services/side-bar/SidebarProvider";
import AppSidebar from "../../[lang]/(panel)/services/side-bar/components/AppSidebar";
import { SidebarInset } from "../../[lang]/(panel)/services/side-bar/components/Sidebar";
import Header from "./components/header/Header";
import MainWrapper from "./components/main/MainWrapper";
import ProfileProvider from "../../[lang]/(panel)/services/profile/ProfileProvider";
import WorkspaceProvider from "../../[lang]/(panel)/services/workspace/WorkspaceProvider";
import TabsNav from "./components/tabs/TabsNav";
import SettingsProvider from "./services/settings/SettingsProvider";
import SettingsModal from "./services/settings/components/SettingsModal";

export default function PanelLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <SidebarProvider>
      <ProfileProvider>
        <WorkspaceProvider>
          <SettingsProvider>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <MainWrapper>{children}</MainWrapper>
              <TabsNav />
              <SettingsModal />
            </SidebarInset>
          </SettingsProvider>
        </WorkspaceProvider>
      </ProfileProvider>
    </SidebarProvider>
  );
}
