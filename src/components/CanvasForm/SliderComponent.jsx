import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper";
import { Pagination } from "swiper";

export default function SliderComponent({
  imgurl1,
  imgurl2,
  imgurl3,
  imgurl4,
  setIndex,
}) {
  const handleSlideChange = (swiper) => {
    setIndex(swiper.activeIndex);
  };
  return (
    <>
      <Swiper
        pagination={true}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <div className="flex justify-center">
            <img
              className="object-fill xl:w-[550px] lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl1}`}
              alt="1"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center">
            <img
              className="object-fill xl:w-[550px] lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl2}`}
              alt="2"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center">
            <img
              className="object-fill xl:w-[550px] lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl3}`}
              alt="3"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex justify-center">
            <img
              className="object-fill xl:w-[550px] lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl4}`}
              alt="4"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
