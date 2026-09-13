"use client";
import { ReactNode, useMemo, useEffect, useCallback } from "react";
import { WorkspacesContext } from "./workspacesContext";
import { useWorkspaces } from "../../workspaces/hooks/useWorkspaces";
import { useParams, useRouter } from "next/navigation";
import { useOrganizationContext } from "../../../services/organization/organizationContext";
import { type Workspace } from "../../workspaces/services/workspacesApiActions";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import WorkspaceAxiosInterceptor from "./WorkspaceAxiosInterceptor";

export default function WorkspacesProvider({
  children,
}: {
  children: ReactNode;
}) {
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
    if (!workspaceParam) return defaultWorkspace;
    const activeParamWorkspace = workspacesQuery.data.workspaces.find(
      (item) => item.slug === workspaceParam,
    );
    if (!activeParamWorkspace) return defaultWorkspace;
    if (activeParamWorkspace.organizationId !== activeOrganization.id)
      return defaultWorkspace;
    return activeParamWorkspace;
  }, [
    activeOrganization,
    workspaceParam,
    workspacesQuery.data,
    workspacesQuery.isSuccess,
  ]);

  const handleChangeWorkspace = useCallback(
    (workspace: Workspace) => {
      router.replace(`/${locale}/${activeOrganization.slug}/${workspace.slug}`);
    },
    [activeOrganization, locale, router],
  );

  const ctx = {
    workspacesQuery,
    activeWorksapce: activeWorksapce!,
  };

  useEffect(() => {
    if (!activeWorksapce) return;
    if (!workspaceParam || workspaceParam !== activeWorksapce?.slug) {
      handleChangeWorkspace(activeWorksapce);
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
