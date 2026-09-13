import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";
import { useWorkspaces } from "../../workspaces/hooks/useWorkspaces";
import { type Workspace } from "../../workspaces/services/workspacesApiActions";

interface WorkspacesContextProps {
  workspacesQuery: ReturnType<typeof useWorkspaces>;
  activeWorksapce: Workspace;
}

const WorkspacesContext = createContext<WorkspacesContextProps | null>(null);

function useWorkspacesContext() {
  const val = use(WorkspacesContext);
  if (!val) throw new OutOfContext("WorkspacesContext");
  return val;
}

export type { WorkspacesContextProps };
export { WorkspacesContext, useWorkspacesContext };
