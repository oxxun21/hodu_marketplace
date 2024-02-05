import axios from "axios";
import { BASE_URL } from "../utils";
import { getLoginCookie } from "../utils/loginCookie";

export const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getLoginCookie()}`,
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getLoginCookie()}`;
  return config;
});

export const unauthInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
