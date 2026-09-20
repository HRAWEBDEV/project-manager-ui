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
  username: string;
  userAvatar: string | null;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string | null;
}

type UpdateOrganization = Pick<Organization, "name" | "description">;

const organizationsBaseApi = "/organizations";
const organizationsLogoApi = `${organizationsBaseApi}/logo`;
const organizationMembersApi = `${organizationsBaseApi}/members`;

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
  return axios.get<OrganizationMember[]>(organizationMembersApi, { signal });
}

export type { Organization, OrganizationMember, UpdateOrganization };
export {
  organizationsBaseApi,
  organizationsLogoApi,
  organizationMembersApi,
  updateOrganization,
  updateOrganizationLogo,
  deleteOrganizationLogo,
  getOrganizationMembers,
};
