import { SignIn_I } from "../interface/sign_I";
import { instance } from "./instance";

export const signinAPI = async (userInfo: SignIn_I) => {
  try {
    const response = await instance.post("/accounts/login/", userInfo);
    return response;
  } catch (error) {
    return error;
  }
};
