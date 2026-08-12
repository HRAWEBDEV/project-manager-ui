import { axios } from "../../../services/axios/axiosConfig";

interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdBy: string;
  organizationId: string;
  organizationName: string | null;
  organizationRole: "owner" | "admin" | "member" | null;
  workspaceMemberRole: string;
}

const getWorkspacesApi = "/workspaces";

function getWorkspaces({ signal }: { signal: AbortSignal }) {
  return axios.get<{ workspaces: Workspace[] }>(getWorkspacesApi, { signal });
}

export type { Workspace };
export { getWorkspacesApi, getWorkspaces };
