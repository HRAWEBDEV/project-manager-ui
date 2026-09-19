import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type UpdateProject,
  type CreateProject,
  projectsBaseApi,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectIcon,
  deleteProjectIcon,
} from "../services/projectsApiActions";

function useProjects() {
  const projectsQuery = useQuery({
    queryKey: [projectsBaseApi],
    async queryFn({ signal }) {
      const res = await getProjects({ signal });
      return res.data;
    },
  });
  return projectsQuery;
}

function useUpdateProject() {
  const queryClient = useQueryClient();
  const updateProjectMutation = useMutation({
    mutationFn({ id, ...props }: { id: string } & UpdateProject) {
      return updateProject(id, props);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [projectsBaseApi],
      });
    },
  });
  return updateProjectMutation;
}

function useCreateProject() {
  const queryClient = useQueryClient();
  const createProjectMutation = useMutation({
    mutationFn(props: CreateProject) {
      return createProject(props);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [projectsBaseApi],
      });
    },
  });
  return createProjectMutation;
}

function useDeleteProject() {
  const queryClient = useQueryClient();
  const deleteProjectMutation = useMutation({
    mutationFn(id: string) {
      return deleteProject(id);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [projectsBaseApi],
      });
    },
  });
  return deleteProjectMutation;
}

function useUploadProjectIcon() {
  const queryClient = useQueryClient();
  const uploadProjectIconMutation = useMutation({
    mutationFn({ id, data }: { id: string; data: FormData }) {
      return uploadProjectIcon(id, data);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [projectsBaseApi],
      });
    },
  });
  return uploadProjectIconMutation;
}

function useDeleteProjectIcon() {
  const queryClient = useQueryClient();
  const deleteProjectIconMutation = useMutation({
    mutationFn(id: string) {
      return deleteProjectIcon(id);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [projectsBaseApi],
      });
    },
  });
  return deleteProjectIconMutation;
}

export {
  useProjects,
  useUpdateProject,
  useCreateProject,
  useDeleteProject,
  useUploadProjectIcon,
  useDeleteProjectIcon,
};
