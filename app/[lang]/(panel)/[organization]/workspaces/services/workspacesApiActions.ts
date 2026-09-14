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
  organizationSlug: string;
  workspaceMemberRole: string;
}

type UpdateWorkspace = Pick<Workspace, "name" | "description">;
type CreateWorkspace = Pick<Workspace, "name" | "description">;

const workspacesBaseApi = "/workspaces";

function getWorkspaces({ signal }: { signal: AbortSignal }) {
  return axios.get<{ workspaces: Workspace[] }>(workspacesBaseApi, { signal });
}

function updateWorkspace(id: string, props: UpdateWorkspace) {
  return axios.patch<{ id: string }>(`${workspacesBaseApi}/${id}`, props);
}

function createWorkspace(props: CreateWorkspace) {
  return axios.post<{ id: string }>(workspacesBaseApi, props);
}

function deleteWorkspace(id: string) {
  return axios.delete(`${workspacesBaseApi}/${id}`);
}

export type { Workspace, UpdateWorkspace, CreateWorkspace };
export {
  workspacesBaseApi,
  getWorkspaces,
  updateWorkspace,
  createWorkspace,
  deleteWorkspace,
};
