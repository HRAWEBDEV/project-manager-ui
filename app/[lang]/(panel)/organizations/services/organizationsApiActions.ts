import { axios } from "@/app/utils/defaultAxios";

interface Organization {
  id: string;
  description: string | null;
  logo: string | null;
  name: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
}

type OrganizationRole = "owner" | "admin" | "member";
interface OrganizationMember {
  id: string;
  organizationId: string;
  role: OrganizationRole;
  joinedAt: string;
  addedBy: string | null;
  organizationName: string;
  userId: string;
  username: string;
  userAvatar: string | null;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string | null;
}

type InvitationStatus = "pending" | "accepted" | "declined";
interface Invitation {
  id: string;
  organizationId: string;
  organizationName: string;
  userId: string;
  username: string;
  userFirstName: string;
  userLastName: string;
  invitedUserId: string;
  invitedUserAvatar: string | null;
  invitedUsername: string;
  invitedUserFirstName: string;
  invitedUserLastName: string;
  email: string;
  status: InvitationStatus;
  expiresAt: string;
  acceptedAt: string | null;
  createAt: string;
}

type UpdateOrganization = Pick<Organization, "name" | "description">;

const organizationsBaseApi = "/organizations";
const organizationsLogoApi = `${organizationsBaseApi}/logo`;
const organizationMembersApi = `${organizationsBaseApi}/members`;
const organizationInvitationsApi = `${organizationsBaseApi}/invitations`;

function updateOrganization(props: UpdateOrganization) {
  return axios.patch<{ id: string }>(organizationsBaseApi, props);
}

function updateOrganizationLogo(data: FormData) {
  return axios.post(organizationsLogoApi, data);
}

function deleteOrganizationLogo() {
  return axios.delete(organizationsLogoApi);
}

function getOrganizationMembers({ signal }: { signal: AbortSignal }) {
  return axios.get<{
    members: OrganizationMember[];
  }>(organizationMembersApi, { signal });
}

interface GetOrganizationInvitationsProps {
  userId?: string;
}
function getOrganizationInvitations({
  signal,
  userId,
}: {
  signal: AbortSignal;
} & GetOrganizationInvitationsProps) {
  const searchParams = new URLSearchParams([["active", "true"]]);
  if (userId) searchParams.append("userId", userId);
  return axios.get<{ invitations: Invitation[] }>(
    `${organizationInvitationsApi}?${searchParams.toString()}`,
    {
      signal,
    },
  );
}

function inviteUserToOrganization({ email }: { email: string }) {
  return axios.post<{ id: string }>(organizationInvitationsApi, { email });
}

function deleteUserInvitation(id: string) {
  return axios.delete<{ id: string }>(`${organizationInvitationsApi}/${id}`);
}

export type {
  Organization,
  OrganizationMember,
  UpdateOrganization,
  InvitationStatus,
  Invitation,
  GetOrganizationInvitationsProps,
};
export {
  organizationsBaseApi,
  organizationsLogoApi,
  organizationMembersApi,
  organizationInvitationsApi,
  updateOrganization,
  updateOrganizationLogo,
  deleteOrganizationLogo,
  getOrganizationMembers,
  getOrganizationInvitations,
  inviteUserToOrganization,
  deleteUserInvitation,
};
