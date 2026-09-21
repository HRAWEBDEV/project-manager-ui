import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  userInfoApi,
  userOrganizationsApi,
} from "@/app/[lang]/(panel)/users/services/usersApiActions";
import {
  type UpdateOrganization,
  organizationMembersApi,
  organizationInvitationsApi,
  updateOrganization,
  updateOrganizationLogo,
  deleteOrganizationLogo,
  getOrganizationMembers,
  getOrganizationInvitations,
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

function useOrganizationInvitations() {
  const organizationInvitationsQuery = useQuery({
    queryKey: [organizationInvitationsApi],
    async queryFn({ signal }) {
      const res = await getOrganizationInvitations({ signal });
      return res.data;
    },
  });
  return organizationInvitationsQuery;
}

export {
  useUpdateOrganization,
  useUpdateOrganizationLogo,
  useDeleteOrganizationLogo,
  useOrganizationMembers,
  useOrganizationInvitations,
};
