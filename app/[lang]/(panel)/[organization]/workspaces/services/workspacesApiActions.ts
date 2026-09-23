import { axios } from "@/app/utils/defaultAxios";
import { OrganizationMember } from "../../../organizations/services/organizationsApiActions";

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

type WorkspaceMemberRole = "admin" | "member";

interface WorkspaceMember {
  id: string;
  workspaceId: string;
  organizationMemberId: string;
  role: WorkspaceMemberRole;
  joinedAt: string;
  addedBy: string | null;
  addedByUsername: string | null;
  addedByFirstName: string | null;
  addedByLastName: string | null;
  workspaceName: string;
  userId: string;
  userAvatar: string | null;
  username: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string | null;
  organizationId: string;
  organizationName: string;
}
type CreateWorkspaceMember = Pick<
  WorkspaceMember,
  "organizationMemberId" | "role"
>;
type UpdateWorkspaceMember = Pick<WorkspaceMember, "role">;

type UpdateWorkspace = Pick<Workspace, "name" | "description">;
type CreateWorkspace = Pick<Workspace, "name" | "description">;

const workspacesBaseApi = "/workspaces";
const workspaceMembersApi = `${workspacesBaseApi}/members`;

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

function getWorkspaceMembers({ signal }: { signal: AbortSignal }) {
  return axios.get<{
    workspaceMembers: WorkspaceMember[];
  }>(workspaceMembersApi, {
    signal,
  });
}

function addWorkspaceMember({
  organizationMemberId,
  role,
}: CreateWorkspaceMember) {
  return axios.post<{
    id: string;
  }>(workspaceMembersApi, {
    organizationMemberId,
    role,
  });
}

function updateWorkspaceMember(id: string, { role }: UpdateWorkspaceMember) {
  return axios.patch(`${workspaceMembersApi}/${id}`, {
    role,
  });
}

function deleteWrokspaceMember(id: string) {
  return axios.delete(`${workspaceMembersApi}/${id}`);
}

export type {
  Workspace,
  WorkspaceMember,
  WorkspaceMemberRole,
  UpdateWorkspace,
  CreateWorkspace,
  CreateWorkspaceMember,
  UpdateWorkspaceMember,
};
export {
  workspacesBaseApi,
  workspaceMembersApi,
  getWorkspaces,
  updateWorkspace,
  createWorkspace,
  deleteWorkspace,
  getWorkspaceMembers,
  addWorkspaceMember,
  deleteWrokspaceMember,
  updateWorkspaceMember,
};
