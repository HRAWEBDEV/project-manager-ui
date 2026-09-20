"use client";
import { ReactNode, useMemo, useEffect, useCallback } from "react";
import { WorkspacesContext } from "./workspacesContext";
import { useParams, useRouter } from "next/navigation";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import WorkspaceAxiosInterceptor from "./WorkspaceAxiosInterceptor";
import { useOrganizationContext } from "@/app/[lang]/(panel)/services/organization/organizationContext";
import { useWorkspaces } from "../../workspaces/hooks/useWorkspaces";
import { useClearQueries } from "@/app/[lang]/hooks/useClearQueries";
import { getActiveWorkspace, saveActiveWorkspace } from "./workspaceManager";
import { saveActiveOrganization } from "@/app/[lang]/(panel)/services/organization/organizationManager";

export default function WorkspacesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { clearQueries } = useClearQueries();
  const { locale } = useBaseConfig();
  const router = useRouter();
  const { workspace: workspaceParam } = useParams();
  const { activeOrganization } = useOrganizationContext();
  const workspacesQuery = useWorkspaces();

  const activeWorksapce = useMemo(() => {
    if (!workspacesQuery.isSuccess) return;
    const defaultWorkspace = workspacesQuery.data.workspaces.find(
      (item) => item.organizationId === activeOrganization.id,
    );
    if (workspaceParam) {
      const activeParamWorkspace = workspacesQuery.data.workspaces.find(
        (item) => item.slug === workspaceParam,
      );
      if (
        activeParamWorkspace &&
        activeParamWorkspace.organizationId === activeOrganization.id
      ) {
        return activeParamWorkspace;
      }
    }
    const activeLocalWorkspace = getActiveWorkspace();
    if (activeLocalWorkspace) {
      const foundedActiveLocalWorkspace = workspacesQuery.data.workspaces.find(
        (item) => item.slug === activeLocalWorkspace,
      );
      if (
        foundedActiveLocalWorkspace &&
        foundedActiveLocalWorkspace.organizationId === activeOrganization.id
      ) {
        return foundedActiveLocalWorkspace;
      }
    }
    return defaultWorkspace;
  }, [
    activeOrganization,
    workspaceParam,
    workspacesQuery.data,
    workspacesQuery.isSuccess,
  ]);

  const handleChangeWorkspace = useCallback(
    (organzationSlug: string, workspaceSlug: string) => {
      router.replace(`/${locale}/${organzationSlug}/${workspaceSlug}`);
      saveActiveWorkspace(workspaceSlug);
      saveActiveOrganization(organzationSlug);
      clearQueries();
    },
    [locale, router, clearQueries],
  );

  const ctx = {
    workspacesQuery,
    activeWorksapce: activeWorksapce!,
    onChangeWorkspace: handleChangeWorkspace,
  };

  useEffect(() => {
    if (!activeWorksapce) return;
    if (!workspaceParam || workspaceParam !== activeWorksapce?.slug) {
      handleChangeWorkspace(
        activeWorksapce.organizationSlug,
        activeWorksapce.slug,
      );
    }
  }, [activeWorksapce, workspaceParam, handleChangeWorkspace]);

  return (
    <WorkspacesContext.Provider value={ctx}>
      {activeWorksapce && (
        <>
          <WorkspaceAxiosInterceptor />
          {children}
        </>
      )}
    </WorkspacesContext.Provider>
  );
}
