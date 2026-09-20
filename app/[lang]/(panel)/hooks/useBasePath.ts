import { useMemo } from "react";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { useOrganizationContext } from "../services/organization/organizationContext";
import { useWorkspacesContext } from "@/app/[lang]/(panel)/[organization]/services/workspaces/workspacesContext";

export function useBasePath() {
  const { locale } = useBaseConfig();
  const { activeOrganization } = useOrganizationContext();
  const { activeWorksapce } = useWorkspacesContext();

  const basePath = useMemo(() => {
    return `/${locale}/${activeOrganization.slug}/${activeWorksapce.slug}`;
  }, [locale, activeOrganization, activeWorksapce]);
  return basePath;
}
