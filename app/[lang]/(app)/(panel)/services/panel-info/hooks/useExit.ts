import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";

export function useExit() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { locale } = useBaseConfig();

  const exit = useCallback(() => {
    queryClient.clear();
    router.replace(`/${locale}/auth/sign-in`);
  }, [queryClient, router, locale]);

  return exit;
}
