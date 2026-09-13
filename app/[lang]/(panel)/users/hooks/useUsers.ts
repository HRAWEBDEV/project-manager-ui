import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type UpdateUser,
  userInfoApi,
  userOrganizationsApi,
  getUserInfo,
  getUserOrganizations,
  updateUser,
} from "@/app/[lang]/(panel)/users/services/usersApiActions";
import { useLogout } from "../../hooks/useLogout";

function useUsersInfo() {
  const { logout } = useLogout();
  const userInfoQuery = useQuery({
    staleTime: Infinity,
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

function useUpdateUser() {
  const queryClient = useQueryClient();
  const updateUserMutation = useMutation({
    mutationFn(props: UpdateUser) {
      return updateUser(props);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [userInfoApi],
      });
    },
  });
  return updateUserMutation;
}

export { useUsersInfo, useUserOrganizations, useUpdateUser };
