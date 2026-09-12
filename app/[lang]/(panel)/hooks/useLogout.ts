import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { useQueryClient } from "@tanstack/react-query";
import { useLogout as useAuthLogout } from "../../(auth)/hooks/useAuth";

export function useLogout() {
  const confirmLogout = useAuthLogout();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { locale } = useBaseConfig();

  const logout = useCallback(() => {
    confirmLogout.mutateAsync().then(() => {
      router.push(`/${locale}/sign-in`);
      queryClient.clear();
    });
  }, [locale, router, queryClient, confirmLogout]);

  return {
    logout,
    isPending: confirmLogout.isPending,
  };
}
