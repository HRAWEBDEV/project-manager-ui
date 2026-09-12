import { axios } from "@/app/utils/defaultAxios";

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

interface Organization {
  id: string;
  description: string | null;
  logo: string | null;
  name: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
}

interface UserInfo {
  user: User;
  organization: Organization;
}

const userBaseApi = "/users";
const userInfoApi = `${userBaseApi}/info`;

function getUserInfo({ signal }: { signal: AbortSignal }) {
  return axios.get<UserInfo>(userInfoApi, { signal });
}

export { userInfoApi, getUserInfo };
