import AppSidebar from "../../services/side-bar/components/AppSidebar";
import { SidebarInset } from "../../services/side-bar/components/Sidebar";
import Header from "./components/header/Header";
import MainWrapper from "./components/main/MainWrapper";
import TabsNav from "./components/tabs/TabsNav";
import SettingsModal from "./services/settings/components/SettingsModal";
import SettingsProvider from "./services/settings/SettingsProvider";

export default function OrganizationLayout(
  props: LayoutProps<"/[lang]/[organization]">,
) {
  return (
    <SettingsProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <MainWrapper>{props.children}</MainWrapper>
        <TabsNav />
        <SettingsModal />
      </SidebarInset>
    </SettingsProvider>
  );
}
