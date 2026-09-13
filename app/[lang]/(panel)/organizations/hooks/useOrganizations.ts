import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  userInfoApi,
  userOrganizationsApi,
} from "@/app/[lang]/(panel)/users/services/usersApiActions";
import {
  type UpdateOrganization,
  updateOrganization,
} from "../services/organizationsApiActions";

function useUpdateOrganization() {
  const queryClient = useQueryClient();
  const updateOrganizationMutation = useMutation({
    mutationFn(props: UpdateOrganization) {
      return updateOrganization(props);
    },
    onSuccess() {
      // todo: fix this
      // queryClient.invalidateQueries({
      //   queryKey: [userOrganizationsApi],
      // });
      queryClient.invalidateQueries({
        queryKey: [userInfoApi],
      });
    },
  });
  return updateOrganizationMutation;
}

export { useUpdateOrganization };
