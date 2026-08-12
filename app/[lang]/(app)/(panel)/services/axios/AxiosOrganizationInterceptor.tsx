"use client";
import { useEffect } from "react";
import { axios } from "../../../services/axios/axiosConfig";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { usePanelInfo } from "../panel-info/panelInfoContext";

export default function AxiosOrganizationInterceptor() {
  const { locale } = useBaseConfig();
  const { userInfo } = usePanelInfo();
  useEffect(() => {
    const reqID = axios.interceptors.request.use((config) => {
      if (userInfo.isSuccess) {
        config.headers.set("organization-id", userInfo.data!.organization.id);
      }
      return config;
    });
    return () => {
      axios.interceptors.request.eject(reqID);
    };
  }, [locale, userInfo]);
  return <></>;
}
