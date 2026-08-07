"use client";
import { useEffect } from "react";
import { axios } from "../axios/axiosConfig";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function AxiosLoggerInterceptor() {
  useEffect(() => {
    const cleanUp = () => {
      axios.interceptors.request.eject(requestWatcher);
      axios.interceptors.response.eject(responseWatcher);
    };
    const requestWatcher = axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        toast.error(error.message);
        return Promise.reject(error);
      },
    );
    const responseWatcher = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        // if (error.name != "CanceledError") {
        //   const message =
        //     typeof error?.response?.data === "string"
        //       ? error?.response?.data
        //       : error.message;
        //   toast.error(message);
        // }
        return Promise.reject(error);
      },
    );
    return cleanUp;
  }, []);

  return <></>;
}
