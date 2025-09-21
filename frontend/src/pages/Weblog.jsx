import React, { useEffect, useState } from "react";

// import{ useRef, useState } from "react";
// import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoTimeOutline } from "react-icons/io5";
import { FiEye } from "react-icons/fi";
import { data, Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import ArticleItem from "../components/ArticleItem";
import Header from "../components/Header";
import Aos from "aos";
import Footer from "../components/Footer";

export default function Weblog() {
  Aos.init({
    once: true,
  });
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch("http://127.0.0.1:8000/api/categories");
        const catJson = await catRes.json();
        setCategories(catJson.data || []);
       
        const artRes = await fetch("http://127.0.0.1:8000/api/articles");
        const artJson = await artRes.json();
        setArticles(artJson.data || []);
      } catch (err) {
        console.error("خطا در دریافت دیتا:", err);
        setCategories([]);
        setArticles([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-dark ">
      {/* header */}
      <Header />
      <div className="container mx-auto bg-white dark:bg-dark mt-30">
        {/*news*/}
        {/* <div className="flex items-center justify-between mx-3 ">
          <p className="text-[1.3rem] mb-3  text-dark dark:text-white">تکنولوژی</p>
          <Link className="flex items-center gap-1 hover:*:text-primary *:duration-500">
            <p className="text-[.8rem] text-dark dark:text-white "> مشاهده بیشتر</p> 
            <GoArrowLeft className="text-dark dark:text-white " />
          </Link>
        </div> */}
        {/*slider*/}
        {/* <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-7 w-full p-3 ">
          <div className="grid grid-cols-1 w-full gap-3 h-[31rem] md:h-[51rem] lg:h-[41rem]">
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper w-full overflow-hidden h-[13rem] lg:h-[20rem] md:h-[25rem] rounded-2xl **:rounded-2xl"
            >
              <SwiperSlide className="h-full w-full *:h-full ">
                <img src="/images/article8.png" alt="" className="w-full" />
              </SwiperSlide>
              <SwiperSlide className="h-full w-full *:h-full ">
                <img src="/images/article8.png" alt="" className="w-full" />
              </SwiperSlide>
              <SwiperSlide className="h-full w-full *:h-full ">
                <img src="/images/article8.png" alt="" className="w-full" />
              </SwiperSlide>
              <SwiperSlide className="h-full w-full *:h-full ">
                <img src="/images/article8.png" alt="" className="w-full" />
              </SwiperSlide>
              <SwiperSlide className="h-full w-full *:h-full ">
                <img src="/images/article8.png" alt="" className="w-full" />
              </SwiperSlide>
            </Swiper>
            <Swiper
              slidesPerView={1}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper w-full overflow-hidden h-[13rem] lg:h-[20rem] md:h-[25rem] rounded-2xl **:rounded-2xl"
            >
              <SwiperSlide className="h-full w-full *:h-full ">
                <img src="/images/article7.png" alt="" className="w-full" />
              </SwiperSlide>
              <SwiperSlide className="h-full w-full *:h-full ">
                <img src="/images/article7.png" alt="" className="w-full" />
              </SwiperSlide>
              <SwiperSlide className="h-full w-full *:h-full ">
                <img src="/images/article7.png" alt="" className="w-full" />
              </SwiperSlide>
              <SwiperSlide className="h-full w-full *:h-full ">
                <img src="/images/article7.png" alt="" className="w-full" />
              </SwiperSlide>
              <SwiperSlide className="h-full w-full *:h-full ">
                <img src="/images/article7.png" alt="" className="w-full" />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="*:flex-col-reverse *:lg:flex-row *:px-2 order-[-1] lg:order-[0]">
           <ArticleItem/>
           <ArticleItem/>
           <ArticleItem/>
          </div>
        </div> */}


{categories.map((cat) => (
          <div key={cat.id} className="mb-12">
            <div
              className="flex items-center justify-between mt-7 mb-4 px-4"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="0"
            >
              <p className="text-[1rem] md:text-[1.3rem] text-dark dark:text-white border-r-4 border-primary pr-2">
                {cat.name}
              </p>
              <Link
                to={`/MoreArticles/${cat.id}`}
                className="flex items-center gap-1 hover:text-primary duration-500"
              >
                <p className="text-[.8rem] text-dark dark:text-white">
                  مشاهده بیشتر
                </p>
                <GoArrowLeft className="text-dark dark:text-white" />
              </Link>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-3 gap-7">
              {articles
                .filter((a) => a.category_id === cat.id)
                .map((a) => (
                  <ArticleItem
                  key={a.id} id={a.id} image={a.image} description={a.description}  category={cat.name} title={a.title}  readingTime={a.reading_time}
                   
                  />
                ))}
            </div>
          </div>
        ))}
      
      

      </div>
      {/* finish */}

      <Footer/>
    </div>
  );
}
