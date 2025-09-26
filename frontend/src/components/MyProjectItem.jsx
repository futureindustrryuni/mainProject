import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { TbEditCircle } from "react-icons/tb";
import JalaliDate from "./JalaliDate";

export default function MyProjectItem({ ...item }) {
  const API_PATH = "http://127.0.0.1:8000";
  return (
    <li className="relative flex items-start flex-col sm:items-start xmd:flex-row gap-4 py-4 border-b-1 border-zinc-200 sm:border-zinc-200/10 ">
      <img
        src={`${API_PATH}/storage/${item.images[0]?.path}`}
        alt="طراحی وبسایت رستوران"
        className="h-[100px] w-[150px] xsm:w-[230px] xsm:h-[165px] rounded-xl object-cover"
      />
      <div className="flex items-start flex-col mr-1 gap-2 h-full">
        <h2 className="font-bold text-[1rem] xsm:text-[1.2rem] md:text-[1.4rem]  dark:text-[#FFFFFF]  text-black">
          {item.title}
        </h2>
        <p className="text-[#999999] font-medium text-[.8rem] lg:text-[1rem] md:text-[.9rem] line-clamp-2 w-[12rem] sm:w-[10rem] md:w-[15rem]  lg:w-[30rem] ">
          {item.description}
        </p>
        <p className="text-[#777] font-medium text-[.7rem] lg:text-[.9rem] md:text-[.8rem]">
          تاریخ انتشار : {<JalaliDate gregorianDate={item.created_at} />}
        </p>
        <div className="flex gap-1 md:gap-1 mt-2">
          {item.technologies.split("-").map((tech) => (
            <span
              key={tech}
              className="bg-zinc-200/70 dark:bg-[#323232] text-black dark:text-[#FFFFFF] font-medium  text-[.7rem] md:text-[.8rem] px-3 py-1 rounded-[8px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute top-[1rem] left-[.5rem] mt-1 flex items-end gap-5 flex-col">
        <div className="flex gap-2">
          <button className="text-[#ff9911] cursor-pointer" title="ویرایش">
            <TbEditCircle className="sm:text-[18px] lg:text-[1.4rem] md:text-[25px]" />
          </button>
          <button className="text-red-500 cursor-pointer" title="حذف">
            <HiOutlineTrash className="sm:text-[18px] lg:text-[1.4rem] md:text-[25px] text" />
          </button>
        </div>
        <p
          className={`${
            item.is_approved === "2"
              ? "bg-green-500"
              : item.is_approved === "1"
              ? "bg-yellow-500"
              : "bg-red-500"
          } px-3 py-1 text-white rounded-full text-[.8rem]`}
        >
          {item.is_approved === "2"
            ? "تایید شده"
            : item.is_approved === "1"
            ? "در انتظار تایید"
            : "رد شده"}
        </p>
      </div>
    </li>
  );
}
