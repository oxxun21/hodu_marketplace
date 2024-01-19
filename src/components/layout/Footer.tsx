import React from "react";
import styled from "@emotion/styled";
import icon_insta from "../../assets/icon-insta.svg";
import icon_facebook from "../../assets/icon-fb.svg";
import icon_youtube from "../../assets/icon-yt.svg";

export const Footer = () => {
  return (
    <FooterStyle>
      <FooterUpBox>
        <FooterUpUl>
          <li>
            <a href="#">호두샵 소개</a>
          </li>
          <li>
            <a href="#">이용약관</a>
          </li>
          <li>
            <a href="#">개인정보처리방침</a>
          </li>
          <li>
            <a href="#">전자금융거래약관</a>
          </li>
          <li>
            <a href="#">청소년보호정책</a>
          </li>
          <li>
            <a href="#">제휴문의</a>
          </li>
        </FooterUpUl>
        <FooterUpUl>
          <li>
            <a href="#">
              <img src={icon_insta} alt="인스타그램" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={icon_facebook} alt="페이스북" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={icon_youtube} alt="유튜브" />
            </a>
          </li>
        </FooterUpUl>
      </FooterUpBox>
      <FooterDownBox>
        <strong>&#40;주&#41; HODU SHOP</strong>
        <address>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</address>
        <span>사업자 번호 &#58; 000&#45;0000&#45;0000</span>
        <p>대표 &#58; 김호두</p>
      </FooterDownBox>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  background-color: #f3f3f3;
  padding: 60px 10%;
`;

const FooterUpBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;
  padding-bottom: 15px;
`;

const FooterUpUl = styled.ul`
  display: flex;
  gap: 14px;
  font-size: 0.875rem;

  & a {
    text-decoration: none;
    color: #000;
  }
`;

const FooterDownBox = styled.div`
  padding-top: 30px;
  color: #767676;
  font-size: 0.875rem;
  & > strong {
    font-weight: 600;
  }

  & > strong,
  & > address,
  & > span {
    display: block;
    margin-bottom: 8px;
  }
`;
