import { useQuery } from "@tanstack/react-query";
import {
  getWorkspaces,
  workspacesBaseApi,
} from "../services/workspacesApiActions";

function useWorkspaces() {
  const workspacesQuery = useQuery({
    queryKey: [workspacesBaseApi],
    async queryFn({ signal }) {
      const res = await getWorkspaces({ signal });
      return res.data;
    },
  });
  return workspacesQuery;
}

export { useWorkspaces };
