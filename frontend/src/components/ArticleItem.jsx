import Aos from "aos";
import React, { useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function ArticleItem({
  id,
  image,
  description,
  category,
  title,
  views,
  readingTime,
}) {
  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  const API_PATH = "http://127.0.0.1:8000";
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={`${id}00`}
      className="flex items-center flex-col-reverse gap-5 dark:bg-white/2.5 bg-dark/3 rounded-2xl p-3 mb-3 border-1 border-zinc-200 dark:border-zinc-800 "
    >
      <div className="flex-1/3 px-1">
        <div className="flex items-center gap-3">
          <p className="bg-primary text-white px-2.5 py-1.5 text-[.6rem] rounded-md ">
            {category}
          </p>
          <p className="text-zinc-500 text-[.8rem] ">8 اردیبهشت 1404</p>
        </div>
        <Link
          to={`/articleInfo/${id}`}
          className="text-[18px] mt-2 inline-block text-dark dark:text-white "
        >
          {title}
        </Link>
        <p className="text-[13px] text-zinc-500 mt-2 line-clamp-3">
          {description}
        </p>
        <div className="flex items-center gap-3 text-[.9rem] text-zinc-500 mt-10">
          <div className="flex items-center gap-1.5 ">
            <IoTimeOutline />
            <p>{readingTime} </p>
          </div>
          <span> | </span>
          <div className="flex items-center gap-1.5 ">
            <FiEye />
            <p>{views}</p>
          </div>
        </div>
      </div>
      <Link to={`/articleInfo/${id}`} className="w-full h-[13rem]">
        <img
          src={`${API_PATH}/storage/${image}`}
          alt=""
          className="rounded-xl w-full h-full"
        />
      </Link>
    </div>
  );
}
