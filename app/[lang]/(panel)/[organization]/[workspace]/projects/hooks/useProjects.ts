import { useQuery } from "@tanstack/react-query";
import { projectsBaseApi, getProjects } from "../services/projectsApiActions";

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

export { useProjects };
