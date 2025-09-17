import Aos from "aos";
import React from "react";
import { FiEye } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function ArticleItem({id}) {
  Aos.init({
    once: true,
  });
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={`${id}00`}
      className="flex items-center flex-col-reverse gap-5 dark:bg-white/2.5 bg-dark/3 rounded-2xl p-3 mb-3 border-1 border-zinc-200 dark:border-zinc-800 ">
      <div className="flex-1/3 px-1">
        <div className="flex items-center gap-3">
          <p className="bg-primary text-white px-2.5 py-1.5 text-[.6rem] rounded-md ">
            توسعه دهنده
          </p>
          <p className="text-zinc-500 text-[.8rem] ">8 اردیبهشت 1404</p>
        </div>
        <Link className="text-[18px] mt-2 inline-block text-dark dark:text-white ">
          یادگیری ماشین چیست؟ همه آن چه باید درباره آن بدانید{" "}
        </Link>
        <p className="text-[13px] text-zinc-500 mt-2 line-clamp-3">
          تا به حال به این فکر کرده‌اید که اینستاگرام چطور همیشه افرادی را که در
          دنیای واقعی می‌شناسید، برای دنبال
        </p>
        <div className="flex items-center gap-3 text-[.9rem] text-zinc-500 mt-10">
          <div className="flex items-center gap-1.5 ">
            <IoTimeOutline />
            <p>زمان مطالعه: 21 دقیقه</p>
          </div>
          <span> | </span>
          <div className="flex items-center gap-1.5 ">
            <FiEye />
            <p>666</p>
          </div>
        </div>
      </div>
      <div className="flex-1/12">
        <img src="/images/article6.png" alt="" className="rounded-xl" />
      </div>
    </div>
  );
}
