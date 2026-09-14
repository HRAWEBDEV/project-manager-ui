import { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  type UpdateUser,
  userInfoApi,
  userOrganizationsApi,
  getUserInfo,
  getUserOrganizations,
  updateUser,
  deleteUserAvatar,
  updateUserAvatar,
} from "@/app/[lang]/(panel)/users/services/usersApiActions";
import { useLogout } from "../../hooks/useLogout";

function useUsersInfo() {
  const { logout } = useLogout();
  const userInfoQuery = useQuery({
    staleTime: Infinity,
    queryKey: [userInfoApi],
    placeholderData: keepPreviousData,
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
    staleTime: Infinity,
    queryKey: [userOrganizationsApi],
    placeholderData: keepPreviousData,
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
      queryClient.refetchQueries({
        queryKey: [userInfoApi],
      });
    },
  });
  return updateUserMutation;
}

function useDeleteUserAvatar() {
  const queryClient = useQueryClient();
  const deleteUserAvatarMutation = useMutation({
    mutationFn() {
      return deleteUserAvatar();
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: [userInfoApi],
      });
    },
  });
  return deleteUserAvatarMutation;
}

function useUpdateUserAvatar() {
  const queryClient = useQueryClient();
  const updateUserAvatarMutation = useMutation({
    mutationFn(data: FormData) {
      return updateUserAvatar(data);
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: [userInfoApi],
      });
    },
  });
  return updateUserAvatarMutation;
}

export {
  useUsersInfo,
  useUserOrganizations,
  useUpdateUser,
  useUpdateUserAvatar,
  useDeleteUserAvatar,
};
