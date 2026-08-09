"use client";
import { ReactNode, useEffect } from "react";
import { type PanelInfo, PanelInfoContext } from "./panelInfoContext";
import { useQuery } from "@tanstack/react-query";
import { getUserInfoApi, getUserInfo } from "./services/panelInfoApiActions";
import { useExit } from "./hooks/useExit";

export const PanelInfoProvider = ({ children }: { children: ReactNode }) => {
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

  const ctx: PanelInfo = {
    userInfo: {
      data: userInfo,
      isLoading: isLoadingUserInfo,
      isSuccess: isSuccessUserInfo,
      isFetching: isFetchingUserInfo,
      isError: isErrorUserInfo,
    },
  };

  useEffect(() => {
    if (!isErrorUserInfo) return;
    exit();
  }, [isErrorUserInfo, exit]);
  return (
    <PanelInfoContext.Provider value={ctx}>
      {children}
    </PanelInfoContext.Provider>
  );
};
