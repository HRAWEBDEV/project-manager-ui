import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useOrganizationContext } from "../services/organization/organizationContext";
import { useWorkspacesContext } from "../[organization]/[workspace]/services/workspaces/workspacesContext";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";

export function useGoHome() {
  const router = useRouter();
  const { locale } = useBaseConfig();
  const { activeOrganization } = useOrganizationContext();
  const { activeWorksapce } = useWorkspacesContext();

  const goHome = useCallback(() => {
    router.push(
      `/${locale}/${activeOrganization.slug}/${activeWorksapce.slug}`,
    );
  }, [locale, router, activeOrganization, activeWorksapce]);
  return goHome;
}
