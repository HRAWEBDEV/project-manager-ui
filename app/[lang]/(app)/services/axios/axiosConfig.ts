import axios, { CreateAxiosDefaults } from "axios";

const axiosDefaultConfig: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  withCredentials: true,
} as const;

const configuredAxios = axios.create(axiosDefaultConfig);

export { configuredAxios as axios, axiosDefaultConfig };
