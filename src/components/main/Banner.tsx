import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import banner_1 from "../../assets/home_banner_1.webp";
import banner_2 from "../../assets/home_banner_2.webp";
import banner_3 from "../../assets/home_banner_3.webp";
import { Autoplay } from "swiper/modules";
import { css } from "@emotion/react";

// 배너 디자인 변경
export const Banner = () => {
  return (
    <Swiper modules={[Autoplay]} slidesPerView={1} loop={true} speed={500} autoplay={{ delay: 4000 }}>
      <SwiperSlide>
        <img css={[Image]} src={banner_1} alt="호두마켓 이벤트 최대 30% 세일" />
      </SwiperSlide>
      <SwiperSlide>
        <img css={[Image]} src={banner_2} alt="자켓 컬렉션 진행 배너" />
      </SwiperSlide>
      <SwiperSlide>
        <img css={[Image]} src={banner_3} alt="티셔츠 컬렉션 진행 배너" />
      </SwiperSlide>
    </Swiper>
  );
};

const Image = css`
  width: 100%;
`;
