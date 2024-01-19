import styled from "@emotion/styled";

interface Card_I {
  image: string;
  store_name: string;
  product_name: string;
  price: number;
}

export default function Card({ image, store_name, product_name, price }: Card_I) {
  return (
    <CardLi>
      <img src={image} alt={`${product_name}의 상품 사진`} />
      <p>{store_name}</p>
      <strong>{product_name}</strong>
      <p>
        <span>{price.toLocaleString()}</span> 원
      </p>
    </CardLi>
  );
}

const CardLi = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > p {
    font-size: 1rem;
    &:first-of-type {
      color: #767676;
    }
    & > span {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
  & > strong {
    font-size: 1.125rem;
  }
  & > img {
    width: 100%;
    height: 100%;
  }
`;
