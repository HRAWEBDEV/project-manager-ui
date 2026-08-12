"use client";
import { useEffect } from "react";
import { axios } from "../../../services/axios/axiosConfig";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { usePanelInfo } from "../panel-info/panelInfoContext";

export default function AxiosOrganizationInterceptor() {
  const { locale } = useBaseConfig();
  const {
    organizations: { activeOrganization },
  } = usePanelInfo();
  useEffect(() => {
    const reqID = axios.interceptors.request.use((config) => {
      if (activeOrganization) {
        config.headers.set("organization-id", activeOrganization.id);
      }
      return config;
    });
    return () => {
      axios.interceptors.request.eject(reqID);
    };
  }, [locale, activeOrganization]);
  return <></>;
}
