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
  imgurl5,
  imgurl6,
  setIndex,
  size
}) {
  const handleSlideChange = (swiper) => {
    setIndex(swiper.activeIndex);
  }

    return (<div>{size[0] !=1 ? ( <>
      <Swiper
        pagination={true}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >        
        <SwiperSlide>                      
          <div className="flex items-center justify-center">
            <img
              className="object-fill xl:w-[550px] lg:w-[400px] md:w-[300px] sm:w-[200px] "              
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
          <div className="my-[175px] flex justify-center">
            <img
              className="xl:w-[900px]  lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl4}`}
              alt="4"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="my-[175px] flex justify-center">
            <img
              className="xl:w-[900px]  lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl5}`}
              alt="5"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="my-[175px] flex justify-center">
            <img
              className="xl:w-[900px]  lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl6}`}
              alt="6"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>) :(<>
      <Swiper
        pagination={true}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper "
        onSlideChange={handleSlideChange}
      >        
        <SwiperSlide>
          
          <div className="my-[175px] flex justify-center ">
            <img
              className=" xl:w-[900px]  lg:w-[400px] md:w-[250px] sm:w-[200px] "
              src={`${imgurl1}`}
              alt="1"
            />            
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="my-[175px] flex justify-center">
            <img
              className="xl:w-[900px]  lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl2}`}
              alt="2"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="my-[175px] flex justify-center ">
            <img
              className="xl:w-[900px]  lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl3}`}
              alt="3"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="my-[175px] flex justify-center ">
            <img
              className="xl:w-[900px]  lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl4}`}
              alt="4"
            />
          </div>
        </SwiperSlide>        
        <SwiperSlide>
          <div className="my-[175px] flex justify-center "> 
            <img
              className="xl:w-[900px]  lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl5}`}
              alt="5"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="my-[175px] flex justify-center ">
            <img
              className="xl:w-[900px]  lg:w-[400px] md:w-[250px] sm:w-[200px]"
              src={`${imgurl6}`}
              alt="6"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>)}</div> );
     


 
}
