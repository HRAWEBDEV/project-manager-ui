import { use, createContext } from "react";
import { OutOfContext } from "@/utils/OutOfContext";
import { Workspace } from "../../workspace/services/workspaceApiActions";

interface WorkspaceCotnextProps {
  isOpen: boolean;
  data?: Workspace[];
  onChangeActiveWorkspace: (slug: string) => unknown;
  activeWorkspace: Workspace | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetching: boolean;
  toggleWorkspace: (state?: boolean) => unknown;
}

const workspaceContext = createContext<WorkspaceCotnextProps | null>(null);

function useWorkspaceContext() {
  const val = use(workspaceContext);
  if (!val) throw new OutOfContext("workspace context");
  return val;
}

export type { WorkspaceCotnextProps };
export { workspaceContext, useWorkspaceContext };
