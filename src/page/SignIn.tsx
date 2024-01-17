import React, { useState } from "react";
import logo from "../assets/Logo-hodu.svg";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import useDebounce from "../components/hook/useDebounce";
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

  const handleButtonClick = (buttonType: string) => {
    setLoginType(buttonType);
  };

  const debouncedUsername = useDebounce(username, 20);
  const debouncedPassword = useDebounce(password, 20);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signinAPI({ username, password, login_type: loginType });
    console.log(response);

    // const { token } = response;
    // setLoginCookie(token, { path: "/" });

    // console.log(interceptorHeader());
    // navigate("/");

    // console.log("Logging in with:", debouncedUsername, debouncedPassword, loginType);
  };

  return (
    <SignInMain>
      <h1>
        <img src={logo} alt="HODU 로고" />
      </h1>
      <Contain>
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
          <button>로그인</button>
        </SignInInputBox>
      </Contain>
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
const Contain = styled.div`
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
    font-family: "Wanted Sans";
    padding: 18px 0;
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid #c4c4c4;
    &::placeholder {
      color: #767676;
    }
  }

  & > button {
    margin-top: 30px;
    border-radius: 5px;
    border: none;
    padding: 20px 0;
    font-size: 1.125rem;
    font-weight: 600;
    font-family: "Wanted Sans";
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