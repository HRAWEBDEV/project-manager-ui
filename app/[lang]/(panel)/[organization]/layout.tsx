import WorkspacesProvider from "./services/workspaces/WorkspacesProvider";

export default function OrganizationLayout(
  props: LayoutProps<"/[lang]/[organization]">,
) {
  return <WorkspacesProvider>{props.children}</WorkspacesProvider>;
}
