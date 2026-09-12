import { useQuery } from "@tanstack/react-query";
import {
  userInfoApi,
  getUserInfo,
} from "@/app/[lang]/(panel)/users/services/usersApiActions";

function useUsersInfo() {
  const userInfoQuery = useQuery({
    staleTime: "static",
    queryKey: [userInfoApi],
    async queryFn({ signal }) {
      const res = await getUserInfo({ signal });
      return res.data;
    },
  });
  return userInfoQuery;
}

export { useUsersInfo };
