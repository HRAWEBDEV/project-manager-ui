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

type UpdateUser = Pick<
  User,
  "username" | "firstName" | "lastName" | "email" | "phoneNumber"
>;

interface UserInfo {
  user: User;
  organization: Organization;
}

const userBaseApi = "/users";
const userInfoApi = `${userBaseApi}/info`;
const userOrganizationsApi = `${userBaseApi}/organizations`;
const userAvatarApi = `${userBaseApi}/avatar`;

interface UserSearchParams {
  email?: string;
  username?: string;
  paging?: {
    pageSize: number;
    page: number;
  };
}

function getUsers({
  signal,
  email,
  username,
  paging,
}: {
  signal: AbortSignal;
} & UserSearchParams) {
  const searchParams = new URLSearchParams([]);
  if (email) searchParams.append("email", email);
  if (username) searchParams.append("username", username);
  if (paging) {
    searchParams.append("pageSize", paging.pageSize.toString());
    searchParams.append("page", paging.page.toString());
  }
  return axios.get<{
    users: Omit<
      User,
      "phoneNumber" | "phoneNumberVerified" | "emailVerified"
    >[];
    total: number;
  }>(`${userBaseApi}?${searchParams.toString()}`, { signal });
}

function getUserInfo({ signal }: { signal: AbortSignal }) {
  return axios.get<UserInfo>(userInfoApi, { signal });
}

function getUserOrganizations({ signal }: { signal: AbortSignal }) {
  return axios.get<{ organizations: Organization[] }>(userOrganizationsApi, {
    signal,
  });
}

function updateUser(props: UpdateUser) {
  return axios.patch<{ id: string }>(userBaseApi, props);
}

function updateUserAvatar(data: FormData) {
  return axios.post(userAvatarApi, data);
}

function deleteUserAvatar() {
  return axios.delete(userAvatarApi);
}

export type { User, UserInfo, UpdateUser, UserSearchParams };
export {
  userBaseApi,
  userInfoApi,
  userOrganizationsApi,
  userAvatarApi,
  getUsers,
  getUserInfo,
  getUserOrganizations,
  updateUser,
  deleteUserAvatar,
  updateUserAvatar,
};
