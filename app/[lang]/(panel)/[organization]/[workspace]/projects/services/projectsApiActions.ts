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

function getProjects({ signal }: { signal: AbortSignal }) {
  return axios.get<{ projects: Project[] }>(projectsBaseApi, {
    signal,
  });
}

export type { Project };
export { projectsBaseApi, getProjects };
