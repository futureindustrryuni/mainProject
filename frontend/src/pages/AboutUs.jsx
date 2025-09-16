import React, { useState } from "react";
import { BsHeartPulse } from "react-icons/bs";
import { GiStumpRegrowth } from "react-icons/gi";
import { LuChartSpline } from "react-icons/lu";
import { Link, NavLink, useParams } from "react-router-dom";
import Header from "../components/Header";
import Aos from "aos";

export default function AboutUs() {
  const [hash, setHash] = useState("#perspective");

  function changeMenu(href) {
    setHash(href);
  }


  return (
    <>
      {/*header*/}
      <Header />
      <div className="flex justify-center w-[100%] bg-white dark:bg-dark mt-20">
        <div className="container bg-white dark:bg-dark flex items-center justify-center flex-col p-5 gap-5">

          <ul data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="0" className="aboutList sticky top-[1rem] flex items-center justify-between shadow-xl dark:shadow-white/5 dark:bg-white/10 bg-dark/10 dark:*:text-white  *:text-dark backdrop-blur-sm w-[25rem] lg:w-[30rem] p-3 px-2 rounded-full ">
            <li data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200">
              <a
                href="#perspective"
                className={`text-[.8rem] lg:text-[.9rem] px-5 py-1.5 ${hash == "#perspective" && "bg-white/30 dark:bg-white/10 rounded-full "
                  }`}
                onClick={(e) => {
                  changeMenu(e.target.hash);
                }}
              >
                چشم انداز
              </a>
            </li>
            <li data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="400">
              <a
                href="#values"
                className={`text-[.8rem] lg:text-[.9rem] px-5 py-1.5 ${hash == "#values" && "bg-white/30 dark:bg-white/10 rounded-full "
                  }`}
                onClick={(e) => {
                  changeMenu(e.target.hash);
                }}
              >
                ارزش ها
              </a>
            </li>
            <li data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="600">
              <a
                href="#gallery"
                className={`text-[.8rem] lg:text-[.9rem] px-5 py-1.5 ${hash == "#gallery" && "bg-white/30 dark:bg-white/10 rounded-full "
                  }`}
                onClick={(e) => {
                  changeMenu(e.target.hash);
                }}
              >
                گالری عکس
              </a>
            </li>
            <li data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="800">
              <a
                href="#ourTeam"
                className={`text-[.8rem] lg:text-[.9rem] px-5 py-1.5 ${hash == "#ourTeam" && "bg-white/30 dark:bg-white/10 rounded-full "
                  }`}
                onClick={(e) => {
                  changeMenu(e.target.hash);
                }}
              >
                تیم ما
              </a>
            </li>
          </ul>

          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="1000"
            id="perspective"
            className="w-full pt-[4rem] text-dark dark:text-white text-4xl "
          >
            <p className="relative text-[36px] font-[600] border-b-2 inline-block pb-3 border-b-primary before:content-[''] before:absolute before:bottom-[-.3rem] before:left-[-.4rem] before:w-[.5rem] before:h-[.5rem] before:bg-primary before:rounded-full ">
              چشم انداز ما
            </p>
            <p className="text-[18px] mt-5 text-dark/70 dark:text-white leading-7 ">
              چشم‌انداز کوئرا تبدیل‌شدن به جامعه‌ای برای برنامه‌نویسان ایرانه؛
              جایی برای همه‌ی برنامه‌نویس‌ها که به اون‌ها کمک می‌کنه تا زندگی
              حرفه‌ای خودشون رو به‌عنوان یک برنامه‌نویس به‌شکل اثربخش‌تری ادامه
              بدن. در این راستا ما سه مأموریت مهم رو برای خودمون تعریف کردیم:
            </p>
          </div>

          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="1200" id="values" className="w-full pt-[4rem] text-dark dark:text-white text-4xl ">
            <p className="relative text-[36px] font-[600] border-b-2 inline-block pb-3 border-primary before:content-[''] before:absolute before:bottom-[-.3rem] before:left-[-.4rem] before:w-[.5rem] before:h-[.5rem] before:bg-primary before:rounded-full ">
              ارزش های ما
            </p>
            <ul className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-5 place-content-center place-items-center gap-3 ">
              <li className=" bg-zinc-400/10 p-5 rounded-4xl flex flex-col items-center justify-center text-justify gap-3">
                <div className="rounded-full flex items-center justify-center *:text-white bg-primary p-5 size-[6rem]">
                  {/* <img src="/public/icons/values0.png" className=" " alt="" /> */}
                  <BsHeartPulse />
                </div>{" "}
                <p className="text-[30px]">همدلی</p>
                <p className="text-[16px] leading-7 text-dark/70 dark:text-white text-center">
                  داشتن حس همدلی در کارهامون و درک کردن همکارامون به عنوان یه
                  انسان دیگه برامون اهمیت بالایی داره تا همیشه حس خوبی از کار
                  کردن با هم‌تیمی‌ها داشته باشیم.
                </p>
              </li>
              <li className=" bg-zinc-400/10 p-5 rounded-4xl flex flex-col items-center justify-center text-justify gap-3">
                <div className="rounded-full flex items-center justify-center *:text-white bg-primary p-5 size-[6rem]">
                  {/* <img src="/public/icons/values1.png" className=" " alt="" /> */}
                  <LuChartSpline />
                </div>{" "}
                <p className="text-[30px]">تاثیر گذاری</p>
                <p className="text-[16px] leading-7 text-dark/70 dark:text-white text-center">
                  داشتن حس همدلی در کارهامون و درک کردن همکارامون به عنوان یه
                  انسان دیگه برامون اهمیت بالایی داره تا همیشه حس خوبی از کار
                  کردن با هم‌تیمی‌ها داشته باشیم.
                </p>
              </li>
              <li className=" bg-zinc-400/10 p-5 rounded-4xl flex flex-col items-center justify-center text-justify gap-3">
                <div className="rounded-full flex items-center justify-center *:text-white bg-primary p-5 size-[6rem]">
                  {/* <img src="/public/icons/values2.png" className=" " alt="" /> */}
                  <GiStumpRegrowth />
                </div>{" "}
                <p className="text-[30px]">رشد و یادگیری</p>
                <p className="text-[16px] leading-7 text-dark/70 dark:text-white text-center">
                  داشتن حس همدلی در کارهامون و درک کردن همکارامون به عنوان یه
                  انسان دیگه برامون اهمیت بالایی داره تا همیشه حس خوبی از کار
                  کردن با هم‌تیمی‌ها داشته باشیم.
                </p>
              </li>
            </ul>
          </div>

          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="500" id="gallery" className="w-full pt-[4rem] text-dark dark:text-white text-4xl">
            <p className="relative text-[36px] font-[600] border-b-2 inline-block pb-3 border-primary before:content-[''] before:absolute before:bottom-[-.3rem] before:left-[-.4rem] before:w-[.5rem] before:h-[.5rem] before:bg-primary before:rounded-full ">
              گالری عکس
            </p>
            <div className="galleryImages mt-5 ">
              <img src="public/images/about1.jpg" alt="" />
              <img src="public/images/about2.jpg" alt="" />
              <img src="public/images/about3.png" alt="" />
              <img src="public/images/about4.jpg" alt="" />
              <img src="public/images/about5.png" alt="" />
              <img src="public/images/about6.jpg" alt="" />
            </div>
          </div>

          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="500"
            id="ourTeam"
            className="w-full pt-[4rem] text-dark dark:text-white text-4xl"
          >
            <p className="relative text-[36px] font-[600] border-b-2 inline-block pb-3 border-b-primary before:content-[''] before:absolute before:bottom-[-.3rem] before:left-[-.4rem] before:w-[.5rem] before:h-[.5rem] before:bg-primary before:rounded-full ">
              تیم ما
            </p>
            <p className="text-[18px] mt-5 text-dark/70 dark:text-white leading-7 ">
              چشم‌انداز کوئرا تبدیل‌شدن به جامعه‌ای برای برنامه‌نویسان ایرانه؛
              جایی برای همه‌ی برنامه‌نویس‌ها که به اون‌ها کمک می‌کنه تا زندگی
              حرفه‌ای خودشون رو به‌عنوان یک برنامه‌نویس به‌شکل اثربخش‌تری ادامه
              بدن. در این راستا ما سه مأموریت مهم رو برای خودمون تعریف کردیم:
            </p>
            <ul className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 mt-5 gap-3 *:bg-zinc-500/10 *:p-2 *:rounded-[1rem] **:text-center *:text-[16px] ">
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
              <li>
                <Link to="" className="flex items-center justify-center flex-col h-[9rem] ">
                  <img src="public/images/team1.jpg" alt="" className="rounded-full w-[6rem] h-[6rem] object-cover " />
                  <p className="mt-3">نام عضو تیم</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/*footer*/}
    </>
  );
}
