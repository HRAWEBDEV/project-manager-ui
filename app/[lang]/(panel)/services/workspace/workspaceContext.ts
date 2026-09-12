import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";
import { useUserOrganizations } from "@/app/[lang]/(panel)/users/hooks/useUsers";
import { type Organization } from "../../organizations/services/organizationsApiActions";

interface WorkspaceContextProps {
  userOrganizationsQuery: ReturnType<typeof useUserOrganizations>;
  activeOrganization: Organization;
}

const WorkspaceContext = createContext<WorkspaceContextProps | null>(null);

function useWorkspaceContext() {
  const val = use(WorkspaceContext);
  if (!val) throw new OutOfContext("WorkspaceContext");
  return val;
}

export type { WorkspaceContextProps };
export { WorkspaceContext, useWorkspaceContext };
