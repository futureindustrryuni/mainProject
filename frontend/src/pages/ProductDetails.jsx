import img from "/images/banner-03.png";
import User from "/images/User.jpg";

import MySlider from "../components/MySlider.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaRegBookmark, FaRegHeart, FaShoppingBasket } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import ProjectItem from "../components/ProjectItem.jsx";
import Header from "../components/Header.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import Footer from "../components/Footer.jsx";
// import { div } from "framer-motion/m";

export default function ProductDetails() {
  scrollTo(0, 0);
  const { id } = useParams(); // گرفتن id از URL
  const [product, setProduct] = useState(null);
  const [similarProduct, setSimilarProduct] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [images, setImages] = useState([]);

  // گرفتن اطلاعات محصول
  useEffect(() => {
    async function getDetails() {
      try {
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        const data = await res.json();
        setProduct(data.product);

        // گرفتن عکس‌های محصول
        const imgRes = await fetch(
          `http://127.0.0.1:8000/api/products/${id}/images`
        );
        const imgData = await imgRes.json();
        setImages(imgData); // [{id, path, ...}, ...]
      } catch (err) {
        console.log("err", err);
      }
    }
    getDetails();
  }, [id]);

  //کتگوری های محصول
  useEffect(() => {
    async function getSimilarProduct() {
      if (!product) return; // وقتی هنوز محصول نیومده اجرا نشه
      try {
        const res = await fetch(`http://localhost:8000/api/products`);
        const { data } = await res.json();

        const similarFiltered = data.filter(
          (item) =>
            item.category_id === product.category_id && item.id !== product.id
        );

        setSimilarProduct(similarFiltered);
      } catch (err) {
        console.log("err", err);
      }
    }
    getSimilarProduct();

    //گرفتن اطلاعات کاربر
    async function getUserInfo() {
      try {
        const res = await fetch(
          `http://localhost:8000/api/developer/${product.user_id}`
        );
        const data = await res.json();
        setUserInfo(data);
        console.log(data);
      } catch (err) {
        console.log("err", err);
      }
    }
    getUserInfo();
  }, [product]);

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="dark:bg-dark">
      <Header />
      <div className="bg-white pt-10 mx-auto container dark:bg-dark mt-20">
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
            <div className="w-full h-full">
              <MySlider images={images} />
            </div>
            <div className="space-y-5">
              <div className="mt-12 flex items-center justify-between md:mt-0">
                <div className="flex items-center gap-4">
                  <img
                    src={`http://127.0.0.1:8000/storage/${userInfo?.profile_photo_url}`}
                    alt=""
                    className="w-[4rem] h-[4rem] rounded-full  p-1 border-zinc-300"
                  />
                  <h1 className="font-IranYekanBold dark:text-white text-black">
                    {userInfo?.name} {userInfo?.family}
                  </h1>
                </div>
                {/* <div className="flex gap-3 items-center *:cursor-pointer *:text-white *:bg-primary *:hover:bg-primary/70 *:duration-300 *:rounded-full *:p-1.5 *:size-[2rem] *:flex *:items-center *:justify-center ">
                  <div>
                    <FaRegHeart />
                  </div>
                  <div>
                    <FaRegBookmark />
                  </div>
                </div> */}
              </div>
              <h1 className="dark:text-white text-[1.5rem] text-black">{product?.title}</h1>
              <p className="text-justify text-second-light -mt-3 line-clamp-4 font-IranYekanBold">
                {product?.description}
              </p>
              <ul className="flex gap-2 text-sm text-white">
                {product?.technologies.split("-").map((tech) => (
                  <li key={tech} className="bg-zinc-400 px-3 py-1 rounded-md">
                    {tech}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-10 items-center md:mt-5">
                <p className="text-primary font-IranYekanBold text-[1rem] md:text-[1.5rem]">
                  {product?.price.toLocaleString()} تومان
                </p>
                <div className="flex gap-2 items-center bg-primary hover:bg-primary/80 duration-300 p-1.5 px-4 cursor-pointer rounded-md text-white text-sm">
                  <div>
                    <FaShoppingBasket />
                  </div>
                  سبدخرید
                </div>
              </div>
            </div>
          </div>

          <h1 className="dark:text-white text-black text-2xl">
            توضیحات تکمیلی درباره پروژه
          </h1>
          <p className="text-justify text-second-light mb-24 -mt-5">
            {product?.description}
          </p>
          <h1 className="font-IranYekanBold dark:text-white text-black">
            نظرات
          </h1>
          <div className="w-full shadow-xl shadow-zinc-200/30 dark:shadow-none bg-zinc-100 border-1 border-zinc-200 rounded-md h-9 md:w-96">
            <input
              type="text"
              className="p-2 px-3 placeholder:text-[.8rem] w-full h-full"
              placeholder="نظر خود را وارد کنید..."
            />
          </div>
          <hr className="text-second-light mt-14" />
          <img
            src={User}
            alt=""
            className="w-16 h-16 rounded-full absolute  left-1/2 transform -translate-x-1/2  -mt-12 border-8 border-white md:w-20 md:h-20 md:-mt-16"
          />
          <h1 className="text-center mt-15 dark:text-white text-black">
          {userInfo?.name} {userInfo?.family}
          </h1>
          {/* <div className="flex justify-center">
            <p className="text-[12px] bg-primary hover:bg-primary/80 duration-300 p-1 px-3 rounded-md cursor-pointer">
              نمایش پروفایل
            </p>
          </div> */}

          <h1 className="mt-16 font-IranYekanBold dark:text-white text-black text-2xl">
            پروژه های مشابه
          </h1>

          {similarProduct.length >= 1 ? (
            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5 ">
              {similarProduct?.map((item) => (
                <ProjectItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  img="/images/project1.png"
                  user_id={item.user_id}
                />
              ))}
            </div>
          ) : (
            <p className="w-full text-red-700 -mt-[1rem] pb-[2rem]">
              برای این پروژه، پروژه مشابهی ایجاد نشده است !
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
