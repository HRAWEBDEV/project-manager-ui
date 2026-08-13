import PanelHeader from "@/app/[lang]/(app)/(panel)/components/home/header/PanelHeader";
import SidebarProvider from "./services/sidebar/SidebarProvider";
import { PanelInfoProvider } from "./services/panel-info/PanelInfoProvider";
import { ProfileProvider } from "./services/profile/ProfileProvider";
import { SettingProvider } from "./services/setting/SettingProvider";
import AppSidebar from "./components/home/navigation/Navigation";
import Tabs from "./components/tabs/Tabs";
import MainWrapper from "./components/home/main/MainWrapper";
import AxiosOrganizationInterceptor from "./services/axios/AxiosOrganizationInterceptor";
import AxiosCredentialInterceptor from "./services/axios/AxiosCredentialInterceptor";
import WorkspaceProvider from "./services/workspace/WorkspaceProvider";

export default function PanelLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <PanelInfoProvider>
        <AxiosOrganizationInterceptor />
        <WorkspaceProvider>
          <AxiosCredentialInterceptor />
          <SidebarProvider className="flex flex-col">
            <SettingProvider>
              <ProfileProvider>
                <PanelHeader />
                <div className="flex flex-1">
                  <AppSidebar />
                  <MainWrapper>{children}</MainWrapper>
                  <Tabs />
                </div>
              </ProfileProvider>
            </SettingProvider>
          </SidebarProvider>
        </WorkspaceProvider>
      </PanelInfoProvider>
    </div>
  );
}
