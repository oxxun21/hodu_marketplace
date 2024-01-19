import React, { useState } from "react";
import styled from "@emotion/styled";
import logo from "../../assets/Logo-hodu.svg";
import { Link, useNavigate } from "react-router-dom";
import cart_icon from "../../assets/icon-shopping-cart.svg";
import user_icon from "../../assets/icon-user.svg";
import { getLoginCookie, removeLoginCookie } from "../../utils/loginCookie";
import { Modal } from "../modal/Modal";

export const Header = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const handleLogout = () => {
    removeLoginCookie({ path: "/" });
    setModalOpen(false);
    navigate("/");
  };

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
        {getLoginCookie() ? (
          <button onClick={handleModalOpen}>
            <img src={user_icon} alt="유저 아이콘" />
            로그아웃
          </button>
        ) : (
          <Link to="/signin">
            <img src={user_icon} alt="로그인 아이콘" />
            로그인
          </Link>
        )}
      </NavStyle>
      {modalOpen && (
        <Modal setModalOpen={setModalOpen}>
          <ModalStrong>로그아웃을 하시겠습니까?</ModalStrong>
          <ButtonContain>
            <button onClick={() => setModalOpen(false)}>아니요</button>
            <button onClick={() => handleLogout()}>네</button>
          </ButtonContain>
        </Modal>
      )}
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
  & > a,
  & > button {
    border: 0;
    padding: 0;
    cursor: pointer;
    background: none;
    font-family: inherit;
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: space-between;
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

const ModalStrong = styled.strong`
  display: block;
  padding: 0 3rem;
  margin: 0 auto;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const ButtonContain = styled.div`
  display: flex;
  gap: 5px;
  & > button {
    width: 50%;
    border: 0;
    padding: 1rem;
    cursor: pointer;
    border-radius: 5px;
    font-family: inherit;
    font-size: 0.875rem;
    &:last-of-type {
      color: #ff0000;
    }
  }
`;
