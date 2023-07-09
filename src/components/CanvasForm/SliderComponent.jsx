import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper";

export default function SliderComponent({
  imgurl1,
  imgurl2,
  imgurl3,
  imgurl4,
  imgurl5,
  imgurl6,
  setIndex,
  size,
}) {
  const handleSlideChange = (swiper) => {
    setIndex(swiper.activeIndex);
  };

  return (
    <div className="">
      <Swiper
        pagination={true}
        navigation={true}
        modules={Navigation}
        className="mySwiper"
        onSlideChange={handleSlideChange}
        slidesPerGroup={1}
      >
        {size[0] != 1 ? (
          <>
            <SwiperSlide>
              <div className="flex items-center justify-center">
                <img
                  className="object-fill w-[230px] md:w-[550px] "
                  src={`${imgurl1}`}
                  alt="1"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center">
                <img
                  className="object-fill w-[230px] md:w-[550px]"
                  src={`${imgurl2}`}
                  alt="2"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center">
                <img
                  className="object-fill w-[230px] md:w-[550px]"
                  src={`${imgurl3}`}
                  alt="3"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="my-[30px] md:my-[175px] flex justify-center items-center  ">
                <img
                  className="mt-[25%] md:mt-0 w-[250px] md:w-[900px] "
                  src={`${imgurl4}`}
                  alt="4"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="my-[30px] md:my-[175px] flex justify-center items-center ">
                <img
                  className="mt-[25%] md:mt-0  w-[250px] md:w-[900px]"
                  src={`${imgurl5}`}
                  alt="5"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex items-center justify-center">
                <img
                  className="object-fill w-[230px] md:w-[550px]"
                  src={`${imgurl6}`}
                  alt="6"
                />
              </div>
            </SwiperSlide>
          </>
        ) : (
          <>
            <SwiperSlide>
              <div className="my-[30px] md:my-[175px] flex justify-center items-center ">
                <img
                  className=" w-[250px] md:w-[900px] "
                  src={`${imgurl1}`}
                  alt="1"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="my-[30px] md:my-[175px] flex justify-center items-center ">
                <img
                  className="w-[250px] md:w-[900px]"
                  src={`${imgurl2}`}
                  alt="2"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="my-[30px] md:my-[175px] flex justify-center items-center ">
                <img
                  className="w-[250px] md:w-[900px]"
                  src={`${imgurl3}`}
                  alt="3"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="my-[30px] md:my-[175px] flex justify-center items-center ">
                <img
                  className="w-[250px] md:w-[900px]"
                  src={`${imgurl4}`}
                  alt="4"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="my-[30px] md:my-[175px] flex justify-center items-center ">
                <img
                  className="w-[250px] md:w-[900px]"
                  src={`${imgurl5}`}
                  alt="5"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="my-[30px] md:my-[175px] flex justify-center items-center ">
                <img
                  className="w-[250px] md:w-[900px]"
                  src={`${imgurl6}`}
                  alt="6"
                />
              </div>
            </SwiperSlide>
          </>
        )}{" "}
      </Swiper>
    </div>
  );
}
