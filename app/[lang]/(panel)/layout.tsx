import SidebarProvider from "../../[lang]/(panel)/services/side-bar/SidebarProvider";
import OrganizationProvider from "./services/organization/OrganizationProvider";
import ProfileProvider from "./services/profile/ProfileProvider";
import ShortcutsProvider from "./services/shortcuts/ShortcutsProvider";

export default function PanelLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <ShortcutsProvider>
      <SidebarProvider>
        <ProfileProvider>
          <OrganizationProvider>{children}</OrganizationProvider>
        </ProfileProvider>
      </SidebarProvider>
    </ShortcutsProvider>
  );
}
