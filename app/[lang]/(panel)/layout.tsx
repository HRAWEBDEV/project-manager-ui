import SidebarProvider from "../../[lang]/(panel)/services/side-bar/SidebarProvider";
import ProfileProvider from "./[organization]/services/profile/ProfileProvider";
import OrganizationProvider from "./services/organization/OrganizationProvider";

export default function PanelLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <SidebarProvider>
      <ProfileProvider>
        <OrganizationProvider>{children}</OrganizationProvider>
      </ProfileProvider>
    </SidebarProvider>
  );
}
