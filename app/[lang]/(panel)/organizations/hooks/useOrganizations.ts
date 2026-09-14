import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userInfoApi,
  userOrganizationsApi,
} from "@/app/[lang]/(panel)/users/services/usersApiActions";
import {
  type UpdateOrganization,
  updateOrganization,
  updateOrganizationLogo,
} from "../services/organizationsApiActions";

function useUpdateOrganization() {
  const queryClient = useQueryClient();
  const updateOrganizationMutation = useMutation({
    mutationFn(props: UpdateOrganization) {
      return updateOrganization(props);
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: [userOrganizationsApi],
      });
      queryClient.refetchQueries({
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
      queryClient.refetchQueries({
        queryKey: [userOrganizationsApi],
      });
      queryClient.refetchQueries({
        queryKey: [userInfoApi],
      });
    },
  });
  return updateOrganizationLogoMutation;
}

export { useUpdateOrganization, useUpdateOrganizationLogo };
