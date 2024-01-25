import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { productDetailGET } from "../api/product";
import { ProductInfo_I } from "../interface/product_I";
import styled from "@emotion/styled";

export const Products = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState<ProductInfo_I | any>();

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const response = await productDetailGET(id);
          setProductData(response.data);
        }
      } catch (error) {
        throw new Error();
      }
    })();
  }, []);
  console.log(productData);

  return (
    <Layout>
      {productData ? (
        <>
          <ProductSection>
            <img src={productData.image} alt={productData.product_name} />
            <ProductInfo>
              <ProductInfoTitle>
                <span>{productData.store_name}</span>
                <h2>{productData.product_name}</h2>
                <p>
                  {productData.price.toLocaleString()}
                  <span> 원</span>
                </p>
                {productData.product_info && <span>{productData.product_info}</span>}
              </ProductInfoTitle>
              <ProductInfoCount>
                <p>택배배송 &#47; 무료배송</p>
                <div>카운트 구역</div>
              </ProductInfoCount>
              <ProductInfoTotal>
                <span>총 상품 금액</span>
                <div>
                  <p>
                    총 수량 <span>1</span>개
                  </p>
                  <strong>
                    17,500<span>원</span>
                  </strong>
                </div>
              </ProductInfoTotal>
              <ProductInfoButton>
                <button>바로 구매</button>
                <button>장바구니</button>
              </ProductInfoButton>
            </ProductInfo>
          </ProductSection>
        </>
      ) : (
        <p>상품 정보 없음</p>
      )}
    </Layout>
  );
};

// async가 있는 곳은 try catch 가 들어가야되지 않나
// api 부분의 catch는 throw로 던지고 페이지 catch 부분에서 ui 변경

const ProductSection = styled.section`
  width: 80%;
  margin: 5rem auto 8.75rem;
  display: flex;
  gap: 3.125rem;

  & > img {
    display: block;
    width: 40%;
    aspect-ratio: 1/1; //
  }
`;

const ProductInfo = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProductInfoTitle = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
  margin-bottom: 6rem;
  & span {
    font-size: 1.125rem;
    color: #767676;
  }
  & > h2 {
    font-size: 2.25rem;
  }
  & > p {
    font-size: 2.25rem;
    font-weight: 600;
    & > span {
      color: #000;
      font-weight: 400;
    }
  }
`;

const ProductInfoCount = styled.div`
  margin-bottom: 2rem;
  & > p {
    font-size: 1rem;
    color: #767676;
    margin-bottom: 1.25rem;
  }

  & > div {
    width: 100%;
    padding: 30px 0;
    border-top: 2px solid #c4c4c4;
    border-bottom: 2px solid #c4c4c4;
  }
`;

const ProductInfoTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.125rem;

  & > div {
    color: #767676;
    display: flex;
    align-items: center;
    gap: 28px;

    & > p {
      position: relative;
      &::after {
        content: "";
        width: 2px;
        height: 100%;
        background-color: #c4c4c4;
        position: absolute;
        top: 0;
        right: -14px;
      }
      & > span {
        color: #21bf48;
        font-weight: 600;
      }
    }

    & strong {
      font-size: 2.25rem;
      font-weight: 600;
      color: #21bf48;

      & > span {
        color: #767676;
        font-size: 1.125rem;
        font-weight: 400;
      }
    }
  }
`;

const ProductInfoButton = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 1.375rem;
  & > button {
    color: #fff;
    padding: 1.125rem 0;
    cursor: pointer;
    border: 0;
    border-radius: 5px;
    font-weight: 600;
    font-size: 1.125rem;
    font-family: "Wanted Sans";
    &:first-of-type {
      width: 65%;
      background-color: #21bf48;
    }

    &:last-of-type {
      width: 35%;
      background-color: #767676;
    }
  }
`;
