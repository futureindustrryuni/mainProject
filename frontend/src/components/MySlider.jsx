import React from "react";
import banner from "/images/project1.png";
import banner1 from "/images/banner-06.png";
import banner2 from "/images/projeimg.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function MySlider({ images }) {
  return (
    <div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {images?.length > 0 ? (
          images.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={`http://127.0.0.1:8000/storage/${img.path}`}
                alt="product"
                className="w-full object-cover rounded-lg"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-center text-gray-500">
              هیچ تصویری برای این محصول وجود ندارد.
            </p>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
