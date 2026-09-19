import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useBasePath } from "./useBasePath";

export function useGoHome() {
  const router = useRouter();
  const basePath = useBasePath();

  const goHome = useCallback(() => {
    router.push(basePath);
  }, [router, basePath]);
  return goHome;
}
