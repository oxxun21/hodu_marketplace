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

export const unauthInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
