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

type UpdateWorkspace = Pick<Workspace, "name" | "description">;

const workspacesBaseApi = "/workspaces";

function getWorkspaces({ signal }: { signal: AbortSignal }) {
  return axios.get<{ workspaces: Workspace[] }>(workspacesBaseApi, { signal });
}

function updateWorkspace(id: string, props: UpdateWorkspace) {
  return axios.patch<{ id: string }>(`${workspacesBaseApi}/${id}`, props);
}

export type { Workspace, UpdateWorkspace };
export { workspacesBaseApi, getWorkspaces, updateWorkspace };
