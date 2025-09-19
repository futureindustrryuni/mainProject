import {
  BsBackpack2,
  BsBank,
  BsCashCoin,
  BsClipboardData,
  BsDiagram3,
  BsFileEarmarkCode,
  BsHeartPulse,
  BsRocketTakeoff,
  BsShieldCheck,
  BsStars,
} from "react-icons/bs";
import { IoArrowDownCircle, IoCodeSlashOutline } from "react-icons/io5";
import { data, Link, NavLink } from "react-router-dom";

import "aos/dist/aos.css";
import Aos from "aos";
import { LiaUserSolid } from "react-icons/lia";
import { FiArrowUpLeft } from "react-icons/fi";
import { TiHeartFullOutline } from "react-icons/ti";
import { FaEye } from "react-icons/fa";
import ProjectItem from "../components/ProjectItem";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Home() {
  Aos.init({
    once: true,
  });
  const [projects, setProjects] = useState([]);

  const fetchproject = () => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(" دیتا از API:", data);
        console.log("Projects:", data);
        setProjects(data.data);
      });
  };

  useEffect(() => {
    fetchproject();
  }, []);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data.data);
  //     });
  // }, []);

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  return (
    <>
      <div className="bg-white dark:bg-dark pb-10">
        {/*Header*/}
        <Header />

        {/* hiro */}
        <div className="relative h-[100vh]">
          <div className="absolute top-0 right-0 h-full w-full flex items-center justify-center overflow-hidden  ">
            <span className="bg-[#ff9900]/50 dark:bg-[#ff9900]/70 size-[20rem] rounded-full absolute right-[-2rem] bottom-[-5rem]  "></span>
            <span className="bg-[#ff6347]/50 dark:bg-[#ff6347]/70 size-[30rem] rounded-full absolute left-[15rem]  bottom-[-10rem] "></span>
            <span className="bg-[#ffd700]/50 dark:bg-[#ffd700]/70 size-[11rem] rounded-full absolute right-[1rem]  top-[-5rem] "></span>
            <span className="bg-[#32cd32]/50 dark:bg-[#32cd32]/70 size-[11rem] rounded-full absolute left-[-1rem]  top-[5rem] "></span>
          </div>
          <div className="backdrop-blur-3xl h-full flex items-center justify-center flex-col  ">
            {/* Grid background */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-20">
              {Array.from({ length: 96 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-400/45 dark:border-gray-500/20"
                ></div>
              ))}
            </div>

            <div className="absolute h-full w-full *:text[3rem] opacity-0 md:opacity-100 ">
              <BsBackpack2
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="1600"
                className="bg-white  shadow-xl p-3 size-[5rem] rounded-2xl shadow-zinc-400/40 text-[3rem] absolute top-[10rem] right-[15rem] rotate-12  "
              />
              <BsClipboardData
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="1800"
                className=" bg-white  shadow-xl p-3 size-[4rem] rounded-2xl shadow-zinc-400/40 text-[3rem] absolute top-[30rem] right-[5rem] rotate-12"
              />
              <BsHeartPulse
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="2000"
                className=" bg-white  shadow-xl p-3 size-[4rem] rounded-2xl shadow-zinc-400/40 text-[3rem] absolute top-[35rem] right-[25rem] rotate-12"
              />

              <BsRocketTakeoff
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="1000"
                className=" bg-white  shadow-xl p-3 size-[4rem] rounded-2xl shadow-zinc-400/40 text-[3rem] absolute top-[10rem] left-[15rem] rotate-12"
              />
              <BsShieldCheck
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="1200"
                className=" bg-white  shadow-xl p-3 size-[4.5rem] rounded-2xl shadow-zinc-400/40 text-[3rem] absolute top-[30rem] left-[5rem] rotate-12"
              />
              <IoCodeSlashOutline
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="1400"
                className=" bg-white shadow-xl p-3 size-[3.5rem] rounded-2xl shadow-zinc-400/40 text-[3rem] absolute top-[35rem] left-[25rem] rotate-12"
              />
            </div>

            <p
              data-aos="fade-up"
              data-aos-duration="1000"
              className="Morabba bg-linear-to-r from-[#ffa500] to-[#ff6347] bg-clip-text text-transparent outline-[.1rem] dark:outline-[0] px-[1.5rem] py-[.2rem] text-[3rem] rounded-full "
            >
              پروجه
            </p>
            <p
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
              className="Morabba text-[1.5rem] text-zinc-600 dark:text-white/50"
            >
              {" "}
              با پروجه، پروژت تو جیبته !
            </p>
            <p
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="500"
              className="text-[1.5rem] md:text-[2rem] lg:text-[3rem] Morabba w-[90%] md:w-[45rem] text-center text-black dark:text-white"
            >
              منبع بزرگی از انواع پروژه های مختلف دانشجو های خبره دانشگاه سجاد{" "}
            </p>
            <a
              href="#intro"
              className="z-30 flex items-center gap-2 text-[.8rem] md:text-[1rem] bg-gradient-to-r hover:scale-95 duration-300 opacity-0 fadeInAnimation2 from-[#ffd700] to-[#ff8c00] text-white px-[3rem] py-2 rounded-full mt-3 cursor-pointer "
            >
              پروجه رو بشناس
              <BsStars />
            </a>
            <a
              href="#projects"
              className="absolute bottom-5 text-[2.5rem] text-black dark:text-white cursor-pointer hover:translate-y-[.5rem] duration-300 opacity-0 fadeInAnimation"
            >
              <IoArrowDownCircle />
            </a>
          </div>
        </div>

        {/* news projects */}
        <div
          className="container mx-auto mt-10 pt-10 text-black dark:text-white"
          id="projects"
        >
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
            className="flex items-end justify-between border-r-4 pr-3 border-primary rounded-lg "
          >
            <div>
              <p className="text-xl lg:text-2xl ">جدید ترین پروژه ها</p>
              <p className="text-[.8rem] lg:text-[.9rem] w-full text-zinc-400 mt-1">
                پروژه هایی که اخیرا دانشجو ها طراحی کرده اند
              </p>
            </div>
            <Link
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
              to="/projects"
              className="flex items-center gap-2 mb-[1.8rem] text-[.8rem] sm:text-[.9rem] text-zinc-400 duration-300 hover:text-primary "
            >
              نمایش همه
              <FiArrowUpLeft className="text-[1.1rem]" />
            </Link>
          </div>
          <ul className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5 mt-10  ">
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                id={project.id}
                user_id={project.user_id}
                img={project.img}
                title={project.title}
              />
            ))}
          </ul>
        </div>

        {/* know proje */}
        <div
          className="w-[80%] mx-auto mt-20 pt-10 text-black dark:text-white"
          id="intro"
        >
          {/*header*/}
          <div className="text-center">
            <p
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              className="text-[1.2rem] md:text-[1.4rem]"
            >
              ویژگی هایی که <span className="text-primary">پروجه</span> را
              برجسته کرده
            </p>
            <p
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
              className="text-zinc-500 text-[.8rem] md:text-[1rem] mt-2"
            >
              پروجه ویژگی های خاصی دارد که آن را از همه ی رقیبانش متمایز میکند
            </p>
          </div>
          {/*content*/}
          <div className="mt-10">
            <ul className="flex items-center justify-center flex-wrap *:basis-[100%] md:*:basis-[40%] lg:*:basis-[40%] xl:*:basis-[30%] *:h-[23rem] gap-5 *:border-1 dark:*:border-0 *:border-zinc-200 *:shadow-xl *:shadow-zinc-200/50 *:dark:shadow-none *:dark:bg-white/3  *:text-center *:rounded-2xl *:p-3 *:pb-7 ">
              <li
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="200"
              >
                <img
                  src="/images/team checklist-rafiki.svg"
                  alt=""
                  className="h-[15rem] w-full "
                />
                <p className="text-[1.2rem]">تایید پروژه</p>
                <p className="text-zinc-500 text-[.8rem] mt-2">
                  <span className="text-xl text-primary "> پ </span>
                  روژه هامون تایید شده توسط اساتید و متخصصین شناخته شده ان، ما
                  اینجا پروژه بدون تاییدیه رسمی و پشتیبانی نداریم
                </p>
              </li>
              <li
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
              >
                <img
                  src="/images/New team members-rafiki.svg"
                  alt=""
                  className="h-[15rem] w-full "
                />
                <p className="text-[1.2rem]">تیم شو</p>
                <p className="text-zinc-500 text-[.8rem] mt-2">
                  <span className="text-xl text-primary ">ر</span>احت ترین راه
                  پیدا کردن تیم های حرفه ای، فقط موضوع پروژه تو بگو تا ما بهت یه
                  تیم حرفه ای معرفی کنیم
                </p>
              </li>
              <li
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
              >
                <img
                  src="/images/Profile data-cuate.svg"
                  alt=""
                  className="h-[15rem] w-full "
                />
                <p className="text-[1.2rem]">رزومه های واقعی</p>
                <p className="text-zinc-500 text-[.8rem] mt-2">
                  <span className="text-xl text-primary "> و </span>او به واو
                  رزومه ها واقعین، اینجا تنها جاییه که رزومه توسعه دهنده هاش
                  توسط اساتید شناخته شده، صحت سنجی میشه
                </p>
              </li>
              <li
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                <img
                  src="/images/Projections-rafiki.svg"
                  alt=""
                  className="h-[15rem] w-full "
                />
                <p className="text-[1.2rem]">شفافیت پروژه ها</p>
                <p className="text-zinc-500 text-[.8rem] mt-2">
                  <span className="text-xl text-primary "> ج </span>ایی که همه
                  چی شفافه، حتی جزئیات پیاده سازی پروژه هایی که دانشجو هامون
                  انجام میدن
                </p>
              </li>
              <li
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="600"
              >
                <img
                  src="/images/Social ideas-pana.svg"
                  alt=""
                  className="h-[15rem] w-full "
                />
                <p className="text-[1.2rem]">از ایده تا نوآوری</p>
                <p className="text-zinc-500 text-[.8rem] mt-2">
                  <span className="text-xl text-primary "> ه </span> مه چی اینجا
                  محیاست تا ایده‌ت رو به واقعیت برسونی با پروجه پروژت تو جیبته{" "}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
