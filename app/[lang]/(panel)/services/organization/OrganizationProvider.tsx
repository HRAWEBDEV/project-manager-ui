"use client";
import { OrganizationContext } from "./organizationContext";
import { ReactNode, useMemo, useEffect, useCallback } from "react";
import { useUserOrganizations } from "@/app/[lang]/(panel)/users/hooks/useUsers";
import { useParams, useRouter } from "next/navigation";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import LinearLoading from "@/components/LinearLoading";
import { type Organization } from "../../organizations/services/organizationsApiActions";
import OrganzationAxiosInterceptor from "./OrganzationAxiosInterceptor";
import { getActiveOrganization } from "./organizationManager";

export default function OrganizationProvider({
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
    if (organizationParam) {
      const activeOrganization = userOrganizationsQuery.data.organizations.find(
        (item) => item.slug === organizationParam,
      );
      if (activeOrganization) return activeOrganization;
    }
    const localActiveOrganization = getActiveOrganization();
    if (localActiveOrganization) {
      const foundedActiveOrganization =
        userOrganizationsQuery.data.organizations.find(
          (item) => item.slug === localActiveOrganization,
        );
      if (foundedActiveOrganization) return foundedActiveOrganization;
    }
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
    <OrganizationContext.Provider value={ctx}>
      {userOrganizationsQuery.isLoading && (
        <div className="w-full">
          <LinearLoading />
        </div>
      )}
      {!!activeOrganization && (
        <>
          <OrganzationAxiosInterceptor />
          {children}
        </>
      )}
    </OrganizationContext.Provider>
  );
}
