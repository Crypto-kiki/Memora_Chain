import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const MainSlider = () => {
  return (
    <Swiper
      pagination={false}
      navigation={false}
      modules={[Navigation, Pagination, Autoplay]}
      // spaceBetween={40}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop={true}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="mx-auto w-[1400px]"
    >
      <SwiperSlide>
        <img
          className="object-fill xl:w-[550px] lg:w-[400px] md:w-[300px] sm:w-[200px]"
          src={`${process.env.PUBLIC_URL}/image/1.png`}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="object-fill xl:w-[550px] lg:w-[400px] md:w-[300px] sm:w-[200px]"
          src={`${process.env.PUBLIC_URL}/image/2.png`}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="object-fill xl:w-[550px] lg:w-[400px] md:w-[300px] sm:w-[200px]"
          src={`${process.env.PUBLIC_URL}/image/3.png`}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="object-fill xl:w-[550px] lg:w-[400px] md:w-[300px] sm:w-[200px]"
          src={`${process.env.PUBLIC_URL}/image/4.png`}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="object-fill xl:w-[550px] lg:w-[400px] md:w-[300px] sm:w-[200px]"
          src={`${process.env.PUBLIC_URL}/image/5.png`}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="object-fill xl:w-[550px] lg:w-[400px] md:w-[300px] sm:w-[200px]"
          src={`${process.env.PUBLIC_URL}/image/6.png`}
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="object-fill xl:w-[550px] lg:w-[400px] md:w-[300px] sm:w-[200px]"
          src={`${process.env.PUBLIC_URL}/image/7.png`}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSlider;
