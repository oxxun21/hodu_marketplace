import React, { useState } from "react";
import logo from "../assets/Logo-hodu.svg";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { signinAPI } from "../api/sign";
import { getLoginCookie, setLoginCookie } from "../utils/loginCookie";
import { instance } from "../api/instance";

const interceptorHeader = () => {
  instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${getLoginCookie()}`;
    return config;
  });
};

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("BUYER");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = (buttonType: string) => {
    setLoginType(buttonType);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signinAPI({
      username,
      password,
      login_type: loginType,
    });

    if ((response as any).status !== 200) {
      setErrorMsg((response as any).response.data.FAIL_Message);
    } else {
      const { token } = (response as any).data;
      setLoginCookie(token, { path: "/" });
      interceptorHeader();
      navigate("/");
    }
  };

  return (
    <SignInMain>
      <h1>
        <img src={logo} alt="HODU 로고" />
      </h1>
      <SignFormContain>
        <SigninButtonBox>
          <button onClick={() => handleButtonClick("BUYER")} className={loginType === "BUYER" ? "active" : ""}>
            구매회원 로그인
          </button>
          <button onClick={() => handleButtonClick("SELLER")} className={loginType === "SELLER" ? "active" : ""}>
            판매회원 로그인
          </button>
        </SigninButtonBox>
        <SignInInputBox onSubmit={handleLogin}>
          <label htmlFor="id">
            <input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <SigninError>{errorMsg}</SigninError>
          <button>로그인</button>
        </SignInInputBox>
      </SignFormContain>
      <SignInOther>
        <li>
          <Link to="/signup">회원가입</Link>
        </li>
        <li>비밀번호 찾기</li>
      </SignInOther>
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
`;

const SigninButtonBox = styled.div`
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

const SignInInputBox = styled.form`
  width: 34.375rem;
  padding: 35px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  & input {
    width: 100%;
    font-family: inherit;
    padding: 18px 16px;
    box-sizing: border-box;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #c4c4c4;
    &::placeholder {
      color: #767676;
    }
  }

  & > button {
    border-radius: 5px;
    border: none;
    padding: 20px 0;
    font-size: 1.125rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
  }
`;

const SignInOther = styled.ul`
  display: flex;
  gap: 33px;
  position: relative;
  margin-top: 30px;

  & > li {
    font-size: 1rem;
    color: #333333;
    & > a {
      text-decoration: none;
      color: #333333;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 70px;
    background-color: #333333;
    width: 1px;
    height: 100%;
  }
`;

const SigninError = styled.p`
  margin: 1.625rem 0 0.25rem;
  color: #ff0000;
  font-size: 0.875rem;
`;
