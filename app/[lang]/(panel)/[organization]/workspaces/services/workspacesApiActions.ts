import { axios } from "@/app/utils/defaultAxios";

interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdBy: string;
  organizationId: string;
  organizationName: string;
  organizationRole: string;
  workspaceMemberRole: string;
}

const workspacesBaseApi = "/workspaces";

function getWorkspaces({ signal }: { signal: AbortSignal }) {
  return axios.get<{ workspaces: Workspace[] }>(workspacesBaseApi, { signal });
}

export type { Workspace };
export { workspacesBaseApi, getWorkspaces };
