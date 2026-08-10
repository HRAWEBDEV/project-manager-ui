import { axios } from "../../../services/axios/axiosConfig";

interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  avatar: string | null;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
  active: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UserInfo {
  user: User;
  organization: Organization;
}

const getUserInfoApi = "/users/info";
const logoutApi = "/auth/logout";

function getUserInfo({ signal }: { signal: AbortSignal }) {
  return axios.get<UserInfo>(getUserInfoApi, { signal });
}

function logout() {
  return axios.post(logoutApi);
}

export type { UserInfo, User, Organization };
export { getUserInfo, getUserInfoApi, logoutApi, logout };
