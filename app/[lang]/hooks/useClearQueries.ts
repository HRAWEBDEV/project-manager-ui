import { useQueryClient } from "@tanstack/react-query";

export function useClearQueries() {
  const queryClient = useQueryClient();
  function clearQueries() {
    queryClient.clear();
  }
  return {
    clearQueries,
  };
}
