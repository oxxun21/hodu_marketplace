import { AxiosResponse } from "axios";
import { unauthInstance } from "./instance";
import { ProductInfo_I } from "../interface/product_I";

export const productAllGET = async () => {
  try {
    const response = await unauthInstance.get("/products/");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const productDetailGET = async (id: string): Promise<AxiosResponse<ProductInfo_I>> => {
  try {
    const response = await unauthInstance.get<ProductInfo_I>(`/products/${id}/`);
    return response;
  } catch (error) {
    throw new Error();
  }
};
