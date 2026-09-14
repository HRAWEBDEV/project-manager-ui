import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  type UpdateWorkspace,
  type CreateWorkspace,
  workspacesBaseApi,
  getWorkspaces,
  updateWorkspace,
  createWorkspace,
  deleteWorkspace,
} from "../services/workspacesApiActions";

function useWorkspaces() {
  const workspacesQuery = useQuery({
    queryKey: [workspacesBaseApi],
    placeholderData: keepPreviousData,
    async queryFn({ signal }) {
      const res = await getWorkspaces({ signal });
      return res.data;
    },
  });
  return workspacesQuery;
}

function useUpdateWorkspace() {
  const queryClient = useQueryClient();
  const updateWorkspaceMutation = useMutation({
    mutationFn({ id, ...props }: { id: string } & UpdateWorkspace) {
      return updateWorkspace(id, props);
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: [workspacesBaseApi],
      });
    },
  });
  return updateWorkspaceMutation;
}

function useCreateWorkspace() {
  const queryClient = useQueryClient();
  const createWorkspaceMutation = useMutation({
    mutationFn(props: CreateWorkspace) {
      return createWorkspace(props);
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: [workspacesBaseApi],
      });
    },
  });
  return createWorkspaceMutation;
}

function useDeleteWorkspace() {
  const queryClient = useQueryClient();
  const deleteWorkspaceMutation = useMutation({
    mutationFn(id: string) {
      return deleteWorkspace(id);
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: [workspacesBaseApi],
      });
    },
  });
  return deleteWorkspaceMutation;
}

export {
  useWorkspaces,
  useUpdateWorkspace,
  useCreateWorkspace,
  useDeleteWorkspace,
};
