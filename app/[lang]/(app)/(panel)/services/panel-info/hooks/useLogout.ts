import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/panelInfoApiActions";
import { useExit } from "./useExit";

export function useLogout() {
  const exit = useExit();
  const mutation = useMutation({
    mutationFn: async () => {
      return logout();
    },
    onSuccess: () => {
      exit();
    },
  });
  return mutation;
}
