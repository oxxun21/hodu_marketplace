import React, { useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { productDetailGET } from "../api/product";

export const Products = () => {
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const response = await productDetailGET(id);
        console.log(response);
      }
    })();
  }, []);

  return <Layout>dkjdls</Layout>;
};
