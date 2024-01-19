import React, { useState } from "react";
import styled from "@emotion/styled";
import logo from "../assets/Logo-hodu.svg";
import { SignUpForm } from "../components/signup/SignUpForm";

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
      <SignFormContain>
        <SignUpButtonBox>
          <button onClick={() => handleButtonClick("BUYER")} className={loginType === "BUYER" ? "active" : ""}>
            구매회원가입
          </button>
          <button onClick={() => handleButtonClick("SELLER")} className={loginType === "SELLER" ? "active" : ""}>
            판매회원가입
          </button>
        </SignUpButtonBox>
        <SignUpForm loginType={loginType} />
      </SignFormContain>
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
const SignFormContain = styled.div`
  position: relative;
  width: 35rem;
`;

const SignUpButtonBox = styled.div`
  width: 100%;
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
