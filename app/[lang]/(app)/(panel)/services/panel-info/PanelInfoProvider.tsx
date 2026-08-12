"use client";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { type PanelInfo, PanelInfoContext } from "./panelInfoContext";
import { useQuery } from "@tanstack/react-query";
import { useExit } from "./hooks/useExit";
import {
  type Organization,
  getUserInfo,
  getUserInfoApi,
  getUserOrganizationsApi,
  getUserOrganizations,
} from "../../user/services/userApiActions";

export const PanelInfoProvider = ({ children }: { children: ReactNode }) => {
  const [activeOrganization, setActiveOrganization] =
    useState<Organization | null>(null);
  const exit = useExit();
  const {
    data: userInfo,
    isLoading: isLoadingUserInfo,
    isSuccess: isSuccessUserInfo,
    isFetching: isFetchingUserInfo,
    isError: isErrorUserInfo,
  } = useQuery({
    staleTime: "static",
    queryKey: [getUserInfoApi],
    async queryFn({ signal }) {
      const res = await getUserInfo({ signal });
      return res.data;
    },
  });

  const {
    data: organizations,
    isLoading: isLoadingOrganizations,
    isSuccess: isSuccessOrganizations,
    isFetching: isFetchingOrganizations,
    isError: isErrorOrganizations,
  } = useQuery({
    staleTime: "static",
    queryKey: [getUserOrganizationsApi],
    async queryFn({ signal }) {
      const res = await getUserOrganizations({ signal });
      return res.data;
    },
  });

  const handleChangeActiveOrganization = useCallback(
    (id: string) => {
      if (!isSuccessOrganizations) return;
      const activeOrganization = organizations.organizations.find(
        (item) => item.id === id,
      );
      if (!activeOrganization) return;
      setActiveOrganization(activeOrganization);
    },
    [isSuccessOrganizations, organizations],
  );

  const ctx: PanelInfo = {
    userInfo: {
      data: userInfo,
      isLoading: isLoadingUserInfo,
      isSuccess: isSuccessUserInfo,
      isFetching: isFetchingUserInfo,
      isError: isErrorUserInfo,
    },
    organizations: {
      data: organizations?.organizations,
      activeOrganization,
      onChangeActiveOrganization: handleChangeActiveOrganization,
      isLoading: isLoadingOrganizations,
      isSuccess: isSuccessOrganizations,
      isFetching: isFetchingOrganizations,
      isError: isErrorOrganizations,
    },
  };

  useEffect(() => {
    if (!isErrorUserInfo || !isErrorOrganizations) return;
    exit();
  }, [isErrorUserInfo, exit, isErrorOrganizations]);

  useEffect(() => {
    if (
      !isSuccessOrganizations ||
      !!activeOrganization ||
      !organizations.organizations.length
    )
      return;
    handleChangeActiveOrganization(organizations.organizations[0].id);
  }, [
    isSuccessOrganizations,
    activeOrganization,
    organizations,
    handleChangeActiveOrganization,
  ]);

  return (
    <PanelInfoContext.Provider value={ctx}>
      {children}
    </PanelInfoContext.Provider>
  );
};
