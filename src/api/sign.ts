import { SignIn_I, SignUpBuyer_I, SignUpSeller_I } from "../interface/sign_I";
import { instance, unauthInstance } from "./instance";

export const signinAPI = async (userInfo: SignIn_I) => {
  try {
    const response = await instance.post("/accounts/login/", userInfo);
    return response;
  } catch (error) {
    return error;
  }
};

export const signupBuyerAPI = async (userInfo: SignUpBuyer_I) => {
  try {
    const response = await unauthInstance.post("/accounts/signup/", userInfo);
    return response;
  } catch (error) {
    return error;
  }
};

export const signupSellerAPI = async (userInfo: SignUpSeller_I) => {
  try {
    const response = await unauthInstance.post("/accounts/signup_seller/", userInfo);
    return response;
  } catch (error) {
    return error;
  }
};

export const usernameValid = async (username: string) => {
  try {
    const response = await unauthInstance.post("/accounts/signup/valid/username/", { username: username });
    return response;
  } catch (error) {
    return error;
  }
};

export const companyRegistrationNumberValid = async (companyRegistrationNumber: string) => {
  try {
    const response = await unauthInstance.post("/accounts/signup/valid/company_registration_number/", {
      company_registration_number: companyRegistrationNumber,
    });
    return response;
  } catch (error) {
    return error;
  }
};
