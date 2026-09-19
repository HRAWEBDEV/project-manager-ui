import SidebarProvider from "../../[lang]/(panel)/services/side-bar/SidebarProvider";
import OrganizationProvider from "./services/organization/OrganizationProvider";
import ProfileProvider from "./services/profile/ProfileProvider";
import HistoryProvider from "./[organization]/[workspace]/services/history/HistoryProvider";

export default function PanelLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <HistoryProvider>
      <SidebarProvider>
        <ProfileProvider>
          <OrganizationProvider>{children}</OrganizationProvider>
        </ProfileProvider>
      </SidebarProvider>
    </HistoryProvider>
  );
}
