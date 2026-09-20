"use client";
import { useEffect } from "react";
import { axios } from "@/app/utils/defaultAxios";
import { useBaseConfig } from "@/services/base-config/baseConfigContext";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useShareDictionary } from "@/services/share-dictionary/shareDictionaryContext";

export default function AxiosLoggerInterceptor() {
  const { locale } = useBaseConfig();
  const {
    shareDictionary: {
      components: { logger: dic },
    },
  } = useShareDictionary();
  useEffect(() => {
    const reqID = axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        console.log("axios request error", err);
      },
    );

    const respID = axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err: AxiosError) => {
        console.log("axios response error", err);
        if (err.code === "ERR_NETWORK") {
          toast.error(dic.unavailableApi);
        }
        return Promise.reject(err);
      },
    );
    return () => {
      axios.interceptors.request.eject(reqID);
      axios.interceptors.response.eject(respID);
    };
  }, [locale, dic]);
  return <></>;
}
