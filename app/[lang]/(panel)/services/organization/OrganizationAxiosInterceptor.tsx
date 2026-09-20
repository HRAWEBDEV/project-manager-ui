"use client";
import { useEffect } from "react";
import { axios } from "@/app/utils/defaultAxios";
import { useOrganizationContext } from "./organizationContext";

export default function OrganizationAxiosInterceptor() {
  const { activeOrganization } = useOrganizationContext();
  useEffect(() => {
    const reqID = axios.interceptors.request.use((config) => {
      config.headers.set("organization-id", activeOrganization.id);
      return config;
    });
    return () => {
      axios.interceptors.request.eject(reqID);
    };
  }, [activeOrganization]);
  return <></>;
}
