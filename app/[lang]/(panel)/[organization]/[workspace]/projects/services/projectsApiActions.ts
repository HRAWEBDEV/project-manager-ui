import { axios } from "@/app/utils/defaultAxios";

const projectsBaseApi = "/projects";

interface Project {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  createdBy: string;
  archived: boolean;
  organizationId: string;
  workspaceId: string;
}

type UpdateProject = Pick<Project, "name" | "description" | "color">;
type CreateProject = Pick<Project, "name" | "description" | "color">;

function getProjects({ signal }: { signal: AbortSignal }) {
  return axios.get<{ projects: Project[] }>(projectsBaseApi, {
    signal,
  });
}

function createProject(props: CreateProject) {
  return axios.post<{ id: string }>(projectsBaseApi, props);
}

function updateProject(id: string, props: UpdateProject) {
  return axios.patch<{ id: string }>(`${projectsBaseApi}/${id}`, props);
}

function deleteProject(id: string) {
  return axios.delete(`${projectsBaseApi}/${id}`);
}

function uploadProjectIcon(id: string, data: FormData) {
  return axios.post(`${projectsBaseApi}/${id}/icon`, data);
}

function deleteProjectIcon(id: string) {
  return axios.delete(`${projectsBaseApi}/${id}/icon`);
}

export type { Project, UpdateProject, CreateProject };
export {
  projectsBaseApi,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectIcon,
  deleteProjectIcon,
};
