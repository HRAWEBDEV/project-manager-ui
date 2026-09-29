import { useQuery } from "@tanstack/react-query";
import { tasksBaseApi, getTasks } from "../services/tasksApiActions";

function useTasks() {
  const tasksQuery = useQuery({
    queryKey: [tasksBaseApi],
    async queryFn({ signal }) {
      const res = await getTasks({ signal });
      return res.data;
    },
  });
  return tasksQuery;
}

export { useTasks };
