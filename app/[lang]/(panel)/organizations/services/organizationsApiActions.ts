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

function updateOrganization(props: UpdateOrganization) {
  return axios.patch<{ id: string }>(organizationsBaseApi, props);
}

export type { Organization, UpdateOrganization };
export { organizationsBaseApi, updateOrganization };
