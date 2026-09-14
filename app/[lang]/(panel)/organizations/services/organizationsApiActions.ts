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
type UpdateOrganization = Pick<Organization, "name" | "description">;

const organizationsBaseApi = "/organizations";
const organizationsLogoApi = `${organizationsBaseApi}/logo`;

function updateOrganization(props: UpdateOrganization) {
  return axios.patch<{ id: string }>(organizationsBaseApi, props);
}

function updateOrganizationLogo(data: FormData) {
  return axios.post(organizationsLogoApi, data);
}

export type { Organization, UpdateOrganization };
export { organizationsBaseApi, updateOrganization, updateOrganizationLogo };
