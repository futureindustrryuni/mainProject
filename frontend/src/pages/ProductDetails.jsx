import img from "/images/banner-03.png";
import User from "/images/User.jpg";

import MySlider from "../components/MySlider.jsx";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaRegBookmark, FaRegHeart, FaShoppingBasket } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import ProjectItem from "../components/ProjectItem.jsx";
// import { div } from "framer-motion/m";

export default function ProductDetails() {
  return (
    <div className="dark:bg-dark">
      <div className="bg-white pt-10 mx-auto container dark:bg-dark">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
            <div className="w-full h-full">
              <MySlider />
            </div>
            <div className="space-y-5">
              <div className="mt-12 flex items-center justify-between md:mt-0">
                <div className="flex items-center gap-4">
                  <img src={User} alt="" className="w-14 h-14 rounded-full" />
                  <h1 className="font-IranYekanBold dark:text-white text-black">
                    سهیل شکریان
                  </h1>
                </div>
                <div className="flex gap-3 items-center *:cursor-pointer *:text-white *:bg-primary *:hover:bg-primary/70 *:duration-300 *:rounded-full *:p-1.5 *:size-[2rem] *:flex *:items-center *:justify-center ">
                  <div>
                    <HiOutlineDownload />
                  </div>
                  <div>
                    <FaRegHeart />
                  </div>
                  <div>
                    <FaRegBookmark />
                  </div>
                </div>
              </div>
              <h1 className="dark:text-white text-black">طراحی کارت بانکی</h1>
              <p className="text-justify text-second-light line-clamp-4 font-IranYekanBold">
                توضیحات بیشتر پروژه ی خود را در این قسمت تایپ کنید توضیحات بیشتر
                پروژه توضیحات کامل تر درباره پروژه توضیحات کامل تر درباره پروژه
                توضیحات بیشتر پروژه ی خود را در این قسمت تایپ کنید توضیحات بیشتر
                توضیحات بیشتر پروژه ی خود را در این قسمت تایپ کنید توضیحات بیشتر
                توضیحات کامل تر درباره پروژه توضیحات کامل تر درباره پروژه
                توضیحات کامل تر درباره پروژه
              </p>
              <div className="flex gap-2 text-sm text-white">
                <p className="bg-second-light py-1 px-3 rounded-md">کامپیوتر</p>
                <p className="bg-second-light py-1 px-3 rounded-md">
                  طراحی سایت
                </p>
                <p className="bg-second-light py-1 px-3 rounded-md">طراحی</p>
                <p className="bg-second-light py-1 px-3 rounded-md">فتوشاپ</p>
              </div>
              <div className="flex justify-between mt-10 items-center md:mt-5">
                <p className="text-primary font-IranYekanBold text-[1rem] md:text-[1.5rem]  ">
                  1/450/000تومان
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
          <p className="text-justify text-second-light mb-24">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی
            در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
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
            سهیل شکریان
          </h1>
          {/* <div className="flex justify-center">
            <p className="text-[12px] bg-primary hover:bg-primary/80 duration-300 p-1 px-3 rounded-md cursor-pointer">
              نمایش پروفایل
            </p>
          </div> */}

          <h1 className="mt-16 font-IranYekanBold dark:text-white text-black text-2xl">
            پروژه های مشابه
          </h1>

          <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5 ">
            <ProjectItem id={1} img="/images/project1.png" username="Kamraan" />
            <ProjectItem id={2} img="/images/project2.png" username="Amin" />
            <ProjectItem id={3} img="/images/project3.png" username="Sara" />
            <ProjectItem id={4} img="/images/project4.png" username="Sohrab" />
          </div>

          <h1 className="font-IranYekanBold mt-20 dark:text-white text-black text-2xl ">
            مقالات
          </h1>

          <ul className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-2 *:border-1 *:border-zinc-200 *:dark:border-zinc-800">
            <li className="space-y-3 shadow-xl shadow-zinc-200/50 dark:shadow-none dark:bg-white/3 p-3 rounded-lg">
              <img
                src="/images/article1.png"
                alt=""
                className="w-full h-50 object-cover  rounded-md"
              />
              <h1 className="font-IranYekanBold dark:text-white text-black">
                عنوان پروژه
              </h1>
              <p className="text-sm text-second-light line-clamp-3">
                توضیحات کامل تر درباره پروژه توضیحات کامل تر درباره پروژه
                توضیحات کامل تر{" "}
              </p>
            </li>
            <li className="space-y-3 shadow-xl shadow-zinc-200/50 dark:shadow-none dark:bg-white/3 p-3 rounded-lg">
              <img
                src="/images/article1.png"
                alt=""
                className="w-full h-50 object-cover  rounded-md"
              />
              <h1 className="font-IranYekanBold dark:text-white text-black">
                عنوان پروژه
              </h1>
              <p className="text-sm text-second-light line-clamp-3">
                توضیحات کامل تر درباره پروژه توضیحات کامل تر درباره پروژه
                توضیحات کامل تر{" "}
              </p>
            </li>
            <li className="space-y-3 shadow-xl shadow-zinc-200/50 dark:shadow-none dark:bg-white/3 p-3 rounded-lg">
              <img
                src="/images/article1.png"
                alt=""
                className="w-full h-50 object-cover  rounded-md"
              />
              <h1 className="font-IranYekanBold dark:text-white text-black">
                عنوان پروژه
              </h1>
              <p className="text-sm text-second-light line-clamp-3">
                توضیحات کامل تر درباره پروژه توضیحات کامل تر درباره پروژه
                توضیحات کامل تر{" "}
              </p>
            </li>
            <li className="space-y-3 shadow-xl shadow-zinc-200/50 dark:shadow-none dark:bg-white/3 p-3 rounded-lg">
              <img
                src="/images/article1.png"
                alt=""
                className="w-full h-50 object-cover  rounded-md"
              />
              <h1 className="font-IranYekanBold dark:text-white text-black">
                عنوان پروژه
              </h1>
              <p className="text-sm text-second-light line-clamp-3">
                توضیحات کامل تر درباره پروژه توضیحات کامل تر درباره پروژه
                توضیحات کامل تر{" "}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
