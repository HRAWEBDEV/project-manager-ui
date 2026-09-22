import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  userInfoApi,
  userOrganizationsApi,
} from "@/app/[lang]/(panel)/users/services/usersApiActions";
import {
  type UpdateOrganization,
  type GetOrganizationInvitationsProps,
  organizationMembersApi,
  organizationInvitationsApi,
  updateOrganization,
  updateOrganizationLogo,
  deleteOrganizationLogo,
  getOrganizationMembers,
  getOrganizationInvitations,
  inviteUserToOrganization,
  deleteUserInvitation,
} from "../services/organizationsApiActions";

function useUpdateOrganization() {
  const queryClient = useQueryClient();
  const updateOrganizationMutation = useMutation({
    mutationFn(props: UpdateOrganization) {
      return updateOrganization(props);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [userOrganizationsApi],
      });
      queryClient.invalidateQueries({
        queryKey: [userInfoApi],
      });
    },
  });
  return updateOrganizationMutation;
}

function useUpdateOrganizationLogo() {
  const queryClient = useQueryClient();
  const updateOrganizationLogoMutation = useMutation({
    mutationFn(data: FormData) {
      return updateOrganizationLogo(data);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [userOrganizationsApi],
      });
      queryClient.invalidateQueries({
        queryKey: [userInfoApi],
      });
    },
  });
  return updateOrganizationLogoMutation;
}

function useDeleteOrganizationLogo() {
  const queryClient = useQueryClient();
  const deleteOrganizationLogoMutation = useMutation({
    mutationFn() {
      return deleteOrganizationLogo();
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [userOrganizationsApi],
      });
      queryClient.invalidateQueries({
        queryKey: [userInfoApi],
      });
    },
  });
  return deleteOrganizationLogoMutation;
}

function useOrganizationMembers() {
  const organizationMembersQuery = useQuery({
    queryKey: [organizationMembersApi],
    async queryFn({ signal }) {
      const res = await getOrganizationMembers({ signal });
      return res.data;
    },
  });
  return organizationMembersQuery;
}

function useOrganizationInvitations({
  enabled = true,
  ...props
}: { enabled?: boolean } & GetOrganizationInvitationsProps) {
  const organizationInvitationsQuery = useQuery({
    enabled,
    queryKey: [organizationInvitationsApi, props || "all"],
    async queryFn({ signal }) {
      const res = await getOrganizationInvitations({ signal, ...props });
      return res.data;
    },
  });
  return organizationInvitationsQuery;
}

function useInviteUserToOrganization() {
  const queryClient = useQueryClient();
  const inviteUserToOrganizationMutation = useMutation({
    mutationFn({ email }: { email: string }) {
      return inviteUserToOrganization({ email });
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [organizationInvitationsApi],
      });
    },
  });
  return inviteUserToOrganizationMutation;
}

function useDeleteUserInvitation() {
  const queryClient = useQueryClient();
  const deleteUserInvitationMutation = useMutation({
    mutationFn(id: string) {
      return deleteUserInvitation(id);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [organizationInvitationsApi],
      });
    },
  });
  return deleteUserInvitationMutation;
}

export {
  useUpdateOrganization,
  useUpdateOrganizationLogo,
  useDeleteOrganizationLogo,
  useOrganizationMembers,
  useOrganizationInvitations,
  useInviteUserToOrganization,
  useDeleteUserInvitation,
};
