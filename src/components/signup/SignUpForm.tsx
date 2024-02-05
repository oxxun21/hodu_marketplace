import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import icon_password from "../../assets/icon-check-off.svg";
import icon_password_ok from "../../assets/icon-check-on.svg";
import { companyRegistrationNumberValid, signupBuyerAPI, signupSellerAPI, usernameValid } from "../../api/sign";
import { useNavigate } from "react-router-dom";

export const SignUpForm = ({ loginType }: { loginType: string }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState("");
  const [storeName, setStoreName] = useState("");

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string[]>([]);
  const [errorUserMsg, setErrorUserMsg] = useState("");
  const [errorCompanyMsg, setErrorCompanyMsg] = useState("");

  const [isCheckedUser, setIsCheckedUser] = useState(false);
  const [isCheckedCompany, setIsCheckedCompany] = useState(false);

  const validatePassword = (password: string): boolean => {
    const passwordRegexp = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/i;
    const regResult = !password.search(passwordRegexp);
    return !regResult || password === "";
  };

  const validatePasswordCheck = (passwordCheck: string): boolean => {
    return password !== passwordCheck || passwordCheck === "";
  };

  useEffect(() => {
    if (
      username &&
      !validatePassword(password) &&
      !validatePasswordCheck(passwordCheck) &&
      name &&
      isCheckedUser &&
      phoneNumber &&
      isCheckboxChecked &&
      (loginType === "BUYER" || (companyRegistrationNumber && storeName && isCheckedCompany))
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    username,
    password,
    passwordCheck,
    name,
    phoneNumber,
    isCheckboxChecked,
    companyRegistrationNumber,
    storeName,
    loginType,
  ]);

  const handleValidationResponse = (
    response: any,
    setErrorMsg: (msg: string) => void,
    setIsChecked: (check: boolean) => void
  ) => {
    console.log(response);
    try {
      setIsChecked(true);
    } catch (error: any) {
      setErrorMsg(error.response.data.FAIL_Message);
      setIsChecked(false);
    }
    const responseData = (response as any)?.response?.data || (response as any)?.data;

    if (responseData) {
      if (responseData.FAIL_Message) {
        setErrorMsg(responseData.FAIL_Message);
        setIsChecked(false);
      } else if (responseData.Success) {
      }
    }
  };

  const handleUsernameValid = async (username: string) => {
    // try {
    //   const response = await usernameValid(username);
    //   setIsChecked(true);
    // } catch (error) {
    //   setErrorMsg(error.response.data.FAIL_Message);
    //   setIsChecked(false);
    // }
    const response = await usernameValid(username);
    handleValidationResponse(response, setErrorUserMsg, setIsCheckedUser);
  };

  const handleCompanyNumberValid = async (companyRegistrationNumber: string) => {
    if (companyRegistrationNumber.length === 10 && !isNaN(Number(companyRegistrationNumber))) {
      try {
        const response = await companyRegistrationNumberValid(companyRegistrationNumber);
        if ((response as any).status === 202) {
          setErrorCompanyMsg("");
          setIsCheckedCompany(true);
        }
      } catch (error: any) {
        // TODO: 수정 필요
        console.log(error);

        setErrorMsg(error.response.data.FAIL_Message);
        setErrorCompanyMsg("사업자등록번호를 다시 확인해주세요.");
        setIsCheckedCompany(false);
      }
    }
    //   handleValidationResponse(response, setErrorCompanyMsg, setIsCheckedCompany);
    //   console.log(response);
    //   if ((response as any).status === 202) {
    //     setErrorCompanyMsg("");
    //   }
    // } else {
    //   setErrorCompanyMsg("사업자등록번호를 다시 확인해주세요.");
    // }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    let response;
    let errorMessages = [];
    const userInfo = {
      username,
      password,
      password2: passwordCheck,
      phone_number: phoneNumber,
      name,
    };
    if (loginType === "BUYER") {
      try {
        response = await signupBuyerAPI(userInfo);
        navigate("/signin");
      } catch (error: any) {
        if (error.response.data) {
          for (const key in error.response.data) {
            errorMessages.push(`※ ${key}: ${error.response.data[key]}\n`);
          }
          setErrorMsg(errorMessages);
        }
        setIsFormValid(prev => !prev);
      }
    } else if (loginType === "SELLER") {
      try {
        response = await signupSellerAPI({
          ...userInfo,
          company_registration_number: companyRegistrationNumber,
          store_name: storeName,
        });
        navigate("/signin");
      } catch (error: any) {
        if (error.response.data) {
          for (const key in error.response.data) {
            errorMessages.push(`※ ${key}: ${error.response.data[key]}\n`);
          }
          setErrorMsg(errorMessages);
        }
        setIsFormValid(prev => !prev);
      }
    }
  };

  return (
    <SignUpInputForm onSubmit={handleSignUp}>
      <SignUpInputBox>
        <NeedToChackBox>
          <label htmlFor="id">
            아이디
            <input
              type="text"
              id="id"
              required
              placeholder="20자 이내의 영어 소문자, 대문자, 숫자만 가능"
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <button disabled={isCheckedUser} onClick={() => handleUsernameValid(username)}>
            중복확인
          </button>
        </NeedToChackBox>
        {errorUserMsg && <SignupError>{errorUserMsg}</SignupError>}
        <label htmlFor="password">
          비밀번호
          <input
            type="password"
            id="password"
            className={validatePassword(password) ? "passwordNotOk" : "passwordOk"}
            required
            onChange={e => setPassword(e.target.value)}
            placeholder="8자 이상의 영소문자 및 숫자 필수"
          />
        </label>
        <label htmlFor="password_check">
          비밀번호 재확인
          <input
            type="password"
            id="password_check"
            className={validatePasswordCheck(passwordCheck) ? "passwordNotOk" : "passwordOk"}
            required
            onChange={e => setPasswordCheck(e.target.value)}
            placeholder="비밀번호를 다시 입력해주세요."
          />
        </label>
      </SignUpInputBox>
      <SignUpInputBox>
        <label htmlFor="name">
          이름
          <input
            type="text"
            id="name"
            required
            placeholder="이름을 입력해주세요."
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label htmlFor="phoneNumber">
          휴대폰번호
          <input
            type="phone"
            id="phoneNumber"
            required
            placeholder="하이픈(-) 제외, 숫자만 입력"
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </label>
      </SignUpInputBox>
      {loginType === "SELLER" && (
        <SignUpInputBox>
          <NeedToChackBox>
            <label htmlFor="storeNum">
              사업자 등록번호
              <input
                type="text"
                id="storeNum"
                required
                placeholder="사업자 등록번호를 입력해주세요."
                onChange={e => setCompanyRegistrationNumber(e.target.value)}
              />
            </label>
            <button disabled={isCheckedCompany} onClick={() => handleCompanyNumberValid(companyRegistrationNumber)}>
              인증
            </button>
          </NeedToChackBox>
          {errorCompanyMsg && <SignupError>{errorCompanyMsg}</SignupError>}
          <label htmlFor="storeName">
            스토어 이름
            <input
              type="text"
              id="storeName"
              required
              placeholder="상호명을 입력해주세요."
              onChange={e => setStoreName(e.target.value)}
            />
          </label>
        </SignUpInputBox>
      )}
      <AgreeBox>
        {errorMsg && <SignupError>{errorMsg}</SignupError>}
        <input type="checkbox" id="check" onChange={e => setIsCheckboxChecked(e.target.checked)} />
        <label htmlFor="check" />
        <span>
          호두샵의 <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 대한 내용을 확인하였고 동의합니다.
        </span>
        <button disabled={!isFormValid}>가입하기</button>
      </AgreeBox>
    </SignUpInputForm>
  );
};

const SignUpInputForm = styled.form`
  border: 1px solid #c4c4c4;
  width: 100%;
  padding: 35px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 6.875rem;
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
    &.passwordOk {
      background: url(${icon_password_ok}) no-repeat;
      background-position: bottom 50% right 16px;
    }
    &.passwordNotOk {
      background: url(${icon_password}) no-repeat;
      background-position: bottom 50% right 16px;
    }
  }
`;

const AgreeBox = styled.div`
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
      cursor: default;
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

const SignupError = styled.p`
  color: #ff0000;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  white-space: pre-line;
  line-height: 1.5;
`;
