import { useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  type UpdateUser,
  type UserSearchParams,
  userBaseApi,
  userInfoApi,
  userOrganizationsApi,
  userInvitationsApi,
  getUsers,
  getUserInfo,
  getUserOrganizations,
  updateUser,
  deleteUserAvatar,
  updateUserAvatar,
  getMyInvitations,
  answerMyInvitation,
} from "@/app/[lang]/(panel)/users/services/usersApiActions";
import { useLogout } from "../../hooks/useLogout";

function useUsers({
  enabled,
  ...props
}: { enabled: boolean } & UserSearchParams) {
  const usersQuery = useQuery({
    enabled: enabled,
    queryKey: [userBaseApi, props],
    placeholderData: keepPreviousData,
    async queryFn({ signal }) {
      const res = await getUsers({ signal, ...props });
      return res.data;
    },
  });
  return usersQuery;
}

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
      queryClient.invalidateQueries({
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
      queryClient.invalidateQueries({
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
      queryClient.invalidateQueries({
        queryKey: [userInfoApi],
      });
    },
  });
  return updateUserAvatarMutation;
}

function useMyInvitations() {
  const myInvitationsQuery = useQuery({
    queryKey: [userInvitationsApi],
    async queryFn({ signal }) {
      const res = await getMyInvitations({ signal });
      return res.data;
    },
  });
  return myInvitationsQuery;
}

function useAnswerMyInvitation() {
  const queryClient = useQueryClient();
  const answerMyInvitationMutation = useMutation({
    mutationFn(props: Parameters<typeof answerMyInvitation>[0]) {
      return answerMyInvitation(props);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [userInvitationsApi],
      });
      queryClient.invalidateQueries({
        queryKey: [userOrganizationsApi],
      });
    },
  });
  return answerMyInvitationMutation;
}

export {
  useUsers,
  useUsersInfo,
  useUserOrganizations,
  useUpdateUser,
  useUpdateUserAvatar,
  useDeleteUserAvatar,
  useMyInvitations,
  useAnswerMyInvitation,
};
