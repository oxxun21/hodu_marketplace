import { unauthInstance } from "./instance";

export const productAllGET = async () => {
  try {
    const response = await unauthInstance.get("/products/");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const productDetailGET = async (id: string) => {
  try {
    const response = await unauthInstance.get(`/products/${id}/`);
    return response;
  } catch (error) {
    return error;
  }
};
