import axios from "axios";

const defaultAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  withCredentials: true,
});

export { defaultAxios as axios };
