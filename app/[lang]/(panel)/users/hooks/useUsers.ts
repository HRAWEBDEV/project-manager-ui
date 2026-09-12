import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  userInfoApi,
  userOrganizationsApi,
  getUserInfo,
  getUserOrganizations,
} from "@/app/[lang]/(panel)/users/services/usersApiActions";
import { useLogout } from "../../hooks/useLogout";

function useUsersInfo() {
  const { logout } = useLogout();
  const userInfoQuery = useQuery({
    staleTime: "static",
    queryKey: [userInfoApi],
    async queryFn({ signal }) {
      const res = await getUserInfo({ signal });
      return res.data;
    },
  });
  useEffect(() => {
    if (userInfoQuery.isError) {
      logout();
    }
  }, [logout, userInfoQuery.isError]);

  return userInfoQuery;
}

function useUserOrganizations() {
  const userOrganizationsQuery = useQuery({
    staleTime: "static",
    queryKey: [userOrganizationsApi],
    async queryFn({ signal }) {
      const res = await getUserOrganizations({ signal });
      return res.data;
    },
  });
  return userOrganizationsQuery;
}

export { useUsersInfo, useUserOrganizations };
