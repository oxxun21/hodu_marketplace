import React from "react";
import { useEffect, useState } from "react";
import { ProductAllList_I } from "../interface/product_I";
import { productAllGET } from "../api/product";
import styled from "@emotion/styled";
import Card from "../components/main/Card";
import { Layout } from "../components/layout/Layout";
import { Banner } from "../components/main/Banner";
import Masonry from "react-masonry-css";

const breakpointMasonryObj = {
  default: 4,
  720: 3,
  450: 1,
};

export const Main = () => {
  const [productList, setProductList] = useState<ProductAllList_I[] | null>(null);

  useEffect(() => {
    const productData = async () => {
      try {
        const res = await productAllGET();
        setProductList(res.results);
      } catch (error) {
        console.log(error);
      }
    };
    productData();
  }, []);
  return (
    <Layout>
      <Banner />
      {productList === null || productList.length === 0 ? null : (
        <ProductsListSection>
          <ul>
            <Masonry
              breakpointCols={breakpointMasonryObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {productList.map(product => {
                return (
                  <Card
                    key={product.product_id}
                    image={product.image}
                    store_name={product.store_name}
                    product_name={product.product_name}
                    price={product.price}
                  />
                );
              })}
            </Masonry>
          </ul>
        </ProductsListSection>
      )}
    </Layout>
  );
};

const ProductsListSection = styled.section`
  width: 100%;
  margin: 5rem 0;
  .my-masonry-grid {
    display: flex;
    margin: 0 auto;
    width: 80%;
    gap: 30px;
  }
  .my-masonry-grid_column > li {
    margin-bottom: 30px;
  }
`;
