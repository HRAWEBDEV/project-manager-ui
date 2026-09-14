import SidebarProvider from "../../[lang]/(panel)/services/side-bar/SidebarProvider";
import OrganizationProvider from "./services/organization/OrganizationProvider";
import ProfileProvider from "./services/profile/ProfileProvider";

export default function PanelLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <SidebarProvider>
      <ProfileProvider>
        <OrganizationProvider>{children}</OrganizationProvider>
      </ProfileProvider>
    </SidebarProvider>
  );
}
