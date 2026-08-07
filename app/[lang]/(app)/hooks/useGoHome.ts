import { useRouter } from "next/navigation";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";

export function useGoHome() {
  const router = useRouter();
  const { locale } = useBaseConfig();

  function goHome() {
    router.push(`/${locale}`);
  }

  return goHome;
}
