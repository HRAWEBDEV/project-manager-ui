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
  userName: string;
  userLastName: string;
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

function getOrganizationInvitations({ signal }: { signal: AbortSignal }) {
  return axios.get<{ invitations: Invitation[] }>(organizationInvitationsApi, {
    signal,
  });
}

function inviteUserToOrganization({ email }: { email: string }) {
  return axios.post<{ id: string }>(organizationInvitationsApi, { email });
}

export type {
  Organization,
  OrganizationMember,
  UpdateOrganization,
  InvitationStatus,
  Invitation,
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
};
