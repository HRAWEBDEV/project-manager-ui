import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userInfoApi,
  userOrganizationsApi,
} from "@/app/[lang]/(panel)/users/services/usersApiActions";
import {
  type UpdateOrganization,
  updateOrganization,
  updateOrganizationLogo,
  deleteOrganizationLogo,
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

export {
  useUpdateOrganization,
  useUpdateOrganizationLogo,
  useDeleteOrganizationLogo,
};
