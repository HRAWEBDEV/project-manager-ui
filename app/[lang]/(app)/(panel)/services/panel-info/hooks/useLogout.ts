import { useMutation, QueryClient } from "@tanstack/react-query";
import { logout } from "../services/panelInfoApiActions";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();
  const { locale } = useBaseConfig();
  const queryClient = new QueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return logout();
    },
    onSuccess: () => {
      queryClient.clear();
      router.replace(`/${locale}/auth/sign-in`);
    },
  });
  return mutation;
}
