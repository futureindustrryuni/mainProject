import React from "react";
import banner from "/images/project1.png";
import banner1 from "/images/banner-06.png";
import banner2 from "/images/projeimg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MySlider() {
  return (
    <div>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPreView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
      >
        <SwiperSlide>
          <img src={banner} alt="" className="h-70 xl:h-100 lg:h-80 md:h-70 sm:h-90 object-cover w-full rounded-3xl " />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner1} alt="" className="h-70 xl:h-100 lg:h-80 md:h-70 sm:h-90 object-cover w-full rounded-3xl" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} alt="" className="h-70 xl:h-100 lg:h-80 md:h-70 sm:h-90 object-cover w-full rounded-3xl" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
