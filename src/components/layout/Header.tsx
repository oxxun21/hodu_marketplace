import React from "react";
import styled from "@emotion/styled";
import logo from "../../assets/Logo-hodu.svg";
import { Link } from "react-router-dom";
import cart_icon from "../../assets/icon-shopping-cart.svg";
import user_icon from "../../assets/icon-user.svg";

export const Header = () => {
  return (
    <HeaderStyle>
      <h1>
        <Link to="/">
          <img src={logo} alt="호두마켓" />
        </Link>
      </h1>

      <div>검색창 구역</div>

      <NavStyle>
        <Link to="/">
          <img src={cart_icon} alt="장바구니 아이콘" />
          장바구니
        </Link>
        <Link to="/signin">
          <img src={user_icon} alt="로그인 아이콘" />
          로그인
        </Link>
      </NavStyle>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  width: 100%;
  padding: 1rem 10%;
  box-shadow: 0px 1px 14px 0px rgba(118, 118, 118, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;

  & > h1 > a {
    display: block;
    & > img {
      width: 7.75rem;
    }
  }
`;

const NavStyle = styled.nav`
  display: flex;
  gap: 1.625rem;
  & > a {
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-decoration: none;
    color: #767676;
    font-size: 0.75rem;
    & > img {
      width: 32px;
      height: 32px;
      margin: 0 auto;
    }
  }
`;
