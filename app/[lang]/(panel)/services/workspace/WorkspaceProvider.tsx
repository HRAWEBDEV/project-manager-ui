"use client";
import { WorkspaceContext } from "./workspaceContext";
import { ReactNode, useMemo, useEffect, useCallback } from "react";
import { useUserOrganizations } from "@/app/[lang]/(panel)/users/hooks/useUsers";
import { useParams, useRouter } from "next/navigation";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import LinearLoading from "@/components/LinearLoading";
import { type Organization } from "../../organizations/services/organizationsApiActions";

export default function WorkspaceProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { locale } = useBaseConfig();
  const { organization: organizationParam } = useParams();
  const userOrganizationsQuery = useUserOrganizations();
  const activeOrganization = useMemo(() => {
    if (!userOrganizationsQuery.isSuccess) return;
    const defaultOrganization = userOrganizationsQuery.data.organizations[0];
    if (!organizationParam) return defaultOrganization;
    const activeOrganization = userOrganizationsQuery.data.organizations.find(
      (item) => item.slug === organizationParam,
    );
    if (activeOrganization) return activeOrganization;
    return defaultOrganization;
  }, [
    organizationParam,
    userOrganizationsQuery.data,
    userOrganizationsQuery.isSuccess,
  ]);

  const ctx = {
    userOrganizationsQuery,
    activeOrganization: activeOrganization!,
  };

  const handleChangeOrganization = useCallback(
    (organization: Organization) => {
      router.replace(`/${locale}/${organization.slug}`);
    },
    [locale, router],
  );

  useEffect(() => {
    if (!activeOrganization) return;
    if (!organizationParam || organizationParam !== activeOrganization?.slug) {
      handleChangeOrganization(activeOrganization);
    }
  }, [activeOrganization, organizationParam, handleChangeOrganization]);

  return (
    <WorkspaceContext.Provider value={ctx}>
      {userOrganizationsQuery.isLoading && (
        <div className="w-full">
          <LinearLoading />
        </div>
      )}
      {!!activeOrganization && children}
    </WorkspaceContext.Provider>
  );
}
