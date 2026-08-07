"use client";
import { useEffect } from "react";
import { axios } from "../axios/axiosConfig";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";

export default function AxiosBaseInterceptor() {
  const { locale } = useBaseConfig();
  useEffect(() => {
    const reqID = axios.interceptors.request.use((config) => {
      config.headers.set("languageID", locale);
      return config;
    });
    return () => {
      axios.interceptors.request.eject(reqID);
    };
  }, [locale]);
  return <></>;
}
