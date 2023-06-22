import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

export default function SliderComponent({imgurl1, imgurl2, imgurl3, imgurl4}) {
    return (
        <>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        className="object-fill w-[550px] h-[900px]"
                        src={`${imgurl1}`}
                        alt="1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-fill w-[550px] h-[900px]"
                        src={`${imgurl2}`}
                        alt="2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-fill w-[550px] h-[900px]"
                        src={`${imgurl3}`}
                        alt="3"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-fill w-[550px] h-[900px]"
                        src={`${imgurl4}`}
                        alt="4"
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}