import { axios } from "@/app/utils/defaultAxios";

interface Workspace {
  id: string;
}

const workspacesBaseApi = "/workspaces";

function getWorkspaces({ signal }: { signal: AbortSignal }) {
  return axios.get<{ workspaces: Workspace[] }>(workspacesBaseApi, { signal });
}

export { workspacesBaseApi, getWorkspaces };
