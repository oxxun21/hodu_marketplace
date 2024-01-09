import { unauthInstance } from "./instance";

export const productAllGET = async () => {
  try {
    const res = await unauthInstance.get("/products/");
    return res.data;
  } catch (error) {
    return error;
  }
};
