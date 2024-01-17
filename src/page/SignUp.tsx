import styled from "@emotion/styled";
import React, { useState } from "react";
import logo from "../assets/Logo-hodu.svg";

export const SignUp = () => {
  const [loginType, setLoginType] = useState("BUYER");
  const handleButtonClick = (buttonType: string) => {
    setLoginType(buttonType);
  };
  return (
    <SignInMain>
      <h1>
        <img src={logo} alt="HODU 로고" />
      </h1>
      <Contain>
        <SignUpButtonBox>
          <button onClick={() => handleButtonClick("BUYER")} className={loginType === "BUYER" ? "active" : ""}>
            구매회원가입
          </button>
          <button onClick={() => handleButtonClick("SELLER")} className={loginType === "SELLER" ? "active" : ""}>
            판매회원가입
          </button>
        </SignUpButtonBox>
        <SignUpInputForm>
          <InputBox>
            <label htmlFor="id">아이디</label>
            <input type="text" id="id" required />
            <button>중복확인</button>
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" required />
            <label htmlFor="password_check">비밀번호 재확인</label>
            <input type="password" id="password_check" required />
            <label htmlFor="name">이름</label>
            <input type="text" id="name" required />
            <label htmlFor="phoneNumber">휴대폰번호</label>
            <input type="phone" id="phoneNumber" required />
          </InputBox>
          <input type="checkbox" />
          <label>호두샵의 이용약관 및 개인정보처리방침에 대한 내용을 확인하였고 동의합니다.</label>
          <button>가입하기</button>
        </SignUpInputForm>
      </Contain>
    </SignInMain>
  );
};

const SignInMain = styled.main`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    margin: 100px 0;
    & > img {
      width: 13rem;
    }
  }
`;
const Contain = styled.div`
  position: relative;
`;

const SignUpButtonBox = styled.div`
  width: 34.375rem;
  position: absolute;
  left: 0;
  top: -50px;
  & > button {
    width: 50%;
    padding: 20px 0;
    font-family: "Wanted Sans";
    font-size: 1.125rem;
    border-radius: 5px 5px 0 0;
    border: 1px solid #c4c4c4;
    cursor: pointer;
    &.active {
      background-color: #fff;
      font-weight: 600;
      border-bottom: 0;
    }
  }
`;

const SignUpInputForm = styled.form`
  & > button {
    width: 100%;
    margin: 30px 0 100px 0;
    border-radius: 5px;
    border: none;
    padding: 20px 0;
    font-size: 1.125rem;
    font-weight: 600;
    font-family: "Wanted Sans";
    cursor: pointer;
  }
`;

const InputBox = styled.div`
  border: 1px solid #c4c4c4;
  width: 34.375rem;
  padding: 35px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  & input {
    width: 100%;
    font-family: "Wanted Sans";
    padding: 18px 0;
    font-size: 1rem;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
  }
`;
