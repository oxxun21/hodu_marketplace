import React from "react";
import styled from "@emotion/styled";

export const SignUpForm = ({ loginType }: { loginType: string }) => {
  return (
    <>
      <SignUpInputForm>
        <SignUpInputBox>
          <NeedToChackBox>
            <label htmlFor="id">
              아이디
              <input type="text" id="id" required />
            </label>
            <button>중복확인</button>
          </NeedToChackBox>
          <label htmlFor="password">
            비밀번호
            <input type="password" id="password" required />
          </label>
          <label htmlFor="password_check">
            비밀번호 재확인
            <input type="password" id="password_check" required />
          </label>
        </SignUpInputBox>
        <SignUpInputBox>
          <label htmlFor="name">
            이름
            <input type="text" id="name" required />
          </label>
          <label htmlFor="phoneNumber">
            휴대폰번호
            <input type="phone" id="phoneNumber" required placeholder="숫자만 입력해주세요." />
          </label>
        </SignUpInputBox>
        {loginType === "SELLER" && (
          <SignUpInputBox>
            <NeedToChackBox>
              <label htmlFor="storeNum">
                사업자 등록번호
                <input type="text" id="storeNum" required />
              </label>
              <button>인증</button>
            </NeedToChackBox>
            <label htmlFor="storeName">
              스토어 이름
              <input type="text" id="storeName" required />
            </label>
          </SignUpInputBox>
        )}
      </SignUpInputForm>
      <AgreeBox>
        <input type="checkbox" id="check" />
        <label htmlFor="check" />
        <span>
          호두샵의 <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 대한 내용을 확인하였고 동의합니다.
        </span>
        <button>가입하기</button>
      </AgreeBox>
    </>
  );
};

const SignUpInputForm = styled.form`
  border: 1px solid #c4c4c4;
  width: 100%;
  padding: 35px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const SignUpInputBox = styled.div`
  & label {
    width: 100%;
    font-size: 1rem;
    color: #767676;
    margin-bottom: 16px;
    display: block;
  }
  & input {
    width: 100%;
    margin-top: 10px;
    font-family: inherit;
    box-sizing: border-box;
    padding: 18px 16px;
    font-size: 1rem;
    border: 1px solid #c4c4c4;
    border-radius: 5px;
    &:focus {
      outline: 1px solid #d87739;
    }
    &::placeholder {
      font-size: 0.875rem;
      color: #c4c4c4;
    }
  }
`;

const AgreeBox = styled.div`
  margin: 2rem 0 6.875rem;
  padding: 0 2rem;

  & > span {
    color: #c4c4c4;
    font-size: 0.875rem;
    margin-left: 8px;
    vertical-align: text-top;
    & > a {
      font-weight: 600;
      color: #999999;
    }
  }
  & > input[type="checkbox"] {
    display: none;
  }
  & > input[type="checkbox"] + label {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #c4c4c4;
    position: relative;
    cursor: pointer;
  }
  & > input[id="check"]:checked + label::after {
    content: "✔";
    font-size: 14px;
    width: 13px;
    height: 13px;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
  }
  & > button {
    cursor: pointer;
    margin-top: 2.125rem;
    color: #341000;
    background-color: #ffdbc9;
    border: none;
    font-family: inherit;
    font-size: 1.125rem;
    width: 100%;
    border-radius: 5px;
    padding: 1.5rem 0;
    font-weight: 600;
    &:disabled {
      color: #fff;
      background-color: #c4c4c4;
    }
  }
`;

const NeedToChackBox = styled.div`
  display: flex;
  gap: 12px;
  & > button {
    cursor: pointer;
    background-color: #ffdbc9;
    border: none;
    width: 30%;
    border-radius: 5px;
    padding: 1rem;
    font-size: 0.875rem;
    margin: 26px 0 16px 0;
  }
`;
