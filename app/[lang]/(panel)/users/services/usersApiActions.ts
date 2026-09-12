import { axios } from "@/app/utils/defaultAxios";
import { type Organization } from "@/app/[lang]/(panel)/organizations/services/organizationsApiActions";

interface User {
  id: string;
  username: string;
  active: boolean;
  avatar: string | null;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  phoneNumberVerified: boolean;
  updatedAt: string;
  createdAt: string;
}

interface UserInfo {
  user: User;
  organization: Organization;
}

const userBaseApi = "/users";
const userInfoApi = `${userBaseApi}/info`;
const userOrganizationsApi = `${userBaseApi}/organizations`;

function getUserInfo({ signal }: { signal: AbortSignal }) {
  return axios.get<UserInfo>(userInfoApi, { signal });
}

function getUserOrganizations({ signal }: { signal: AbortSignal }) {
  return axios.get<{ organizations: Organization[] }>(userOrganizationsApi, {
    signal,
  });
}

export { userInfoApi, userOrganizationsApi, getUserInfo, getUserOrganizations };
