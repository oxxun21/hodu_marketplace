import { Global } from "@emotion/react";
import reset from "./style/reset";
import { useEffect, useState } from "react";
import { productAllGET } from "./api/product";
import Card from "./components/common/Card";
import { ProductAllList_I } from "./interface/product_I";
import styled from "@emotion/styled";

function App() {
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

  console.log(productList);

  return (
    <Contain>
      <Global styles={reset} />
      {productList === null || productList.length === 0 ? null : (
        <UI>
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
        </UI>
      )}
    </Contain>
  );
}

export default App;

const Contain = styled.main`
  width: 100%;
`;

const UI = styled.ul`
  width: 80%;
  gap: 3rem 2rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: start;
  height: 125rem;
`;
