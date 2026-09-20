"use client";
import { useEffect } from "react";
import { axios } from "@/app/utils/defaultAxios";
import { useWorkspacesContext } from "./workspacesContext";

export default function WorkspaceAxiosInterceptor() {
  const { activeWorkspace } = useWorkspacesContext();
  useEffect(() => {
    const reqID = axios.interceptors.request.use((config) => {
      config.headers.set("workspace-id", activeWorkspace.id);
      return config;
    });
    return () => {
      axios.interceptors.request.eject(reqID);
    };
  }, [activeWorkspace]);
  return <></>;
}
