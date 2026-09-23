import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import {
  type UpdateWorkspace,
  type CreateWorkspace,
  type CreateWorkspaceMember,
  type UpdateWorkspaceMember,
  workspacesBaseApi,
  workspaceMembersApi,
  getWorkspaces,
  updateWorkspace,
  createWorkspace,
  deleteWorkspace,
  getWorkspaceMembers,
  addWorkspaceMember,
  updateWorkspaceMember,
  deleteWrokspaceMember,
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
      queryClient.invalidateQueries({
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
      queryClient.invalidateQueries({
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
      queryClient.invalidateQueries({
        queryKey: [workspacesBaseApi],
      });
    },
  });
  return deleteWorkspaceMutation;
}

function useWorkspaceMembers() {
  const workspaceMembersQuery = useQuery({
    queryKey: [workspaceMembersApi],
    placeholderData: keepPreviousData,
    async queryFn({ signal }) {
      const res = await getWorkspaceMembers({ signal });
      return res.data;
    },
  });
  return workspaceMembersQuery;
}

function useAddWorkspaceMember() {
  const queryClient = useQueryClient();
  const addWorkspaceMemberMutation = useMutation({
    mutationFn(props: CreateWorkspaceMember) {
      return addWorkspaceMember(props);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [workspaceMembersApi],
      });
    },
  });
  return addWorkspaceMemberMutation;
}

function useUpdateWorkspaceMember() {
  const queryClient = useQueryClient();
  const updateWorkspaceMemberMutation = useMutation({
    mutationFn({ id, ...props }: { id: string } & UpdateWorkspaceMember) {
      return updateWorkspaceMember(id, props);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [workspaceMembersApi],
      });
    },
  });
  return updateWorkspaceMemberMutation;
}

function useDeleteWorkspaceMember() {
  const queryClient = useQueryClient();
  const deleteWorkspaceMemberMutation = useMutation({
    mutationFn(id: string) {
      return deleteWrokspaceMember(id);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [workspaceMembersApi],
      });
    },
  });
  return deleteWorkspaceMemberMutation;
}

export {
  useWorkspaces,
  useUpdateWorkspace,
  useCreateWorkspace,
  useDeleteWorkspace,
  useWorkspaceMembers,
  useAddWorkspaceMember,
  useUpdateWorkspaceMember,
  useDeleteWorkspaceMember,
};
