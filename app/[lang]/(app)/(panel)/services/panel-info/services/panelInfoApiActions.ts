import { axios } from "@/app/[lang]/(app)/services/axios/axiosConfig";

interface UserInfo {
  user: {
    createdAt: Date;
    updatedAt: Date;
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
  };
  organization: {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    description: string | null;
  } | null;
}

const getUserInfoApi = "/users/info";

function getUserInfo({ signal }: { signal: AbortSignal }) {
  return axios.get<UserInfo>(getUserInfoApi, { signal });
}

export type { UserInfo };
export { getUserInfo, getUserInfoApi };
