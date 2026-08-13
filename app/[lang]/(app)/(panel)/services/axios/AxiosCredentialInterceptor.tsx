"use client";
import { useEffect } from "react";
import { axios } from "../../../services/axios/axiosConfig";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { useWorkspaceContext } from "../workspace/workspaceContext";

export default function AxiosCredentialInterceptor() {
  const { locale } = useBaseConfig();
  const { activeWorkspace } = useWorkspaceContext();
  useEffect(() => {
    const reqID = axios.interceptors.request.use((config) => {
      if (activeWorkspace) {
        config.headers.set("organization-id", activeWorkspace.organizationId);
        config.headers.set("workspace-id", activeWorkspace.id);
      }
      return config;
    });
    return () => {
      axios.interceptors.request.eject(reqID);
    };
  }, [locale, activeWorkspace]);
  return <></>;
}
