import Aos from "aos";
import React from "react";
import { FaEye } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { BiBookmark } from "react-icons/bi";
import { LuHeart } from "react-icons/lu";

export default function ProjectItem({ id, img, username, title }) {
  Aos.init({
    once: true,
  });
  //  data-aos="fade-up" data-aos-duration="1000" data-aos-delay={`${id}00`}
  return (
    <li
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={`${id}00`}
      className="projectItem"
    >
      <Link
        to=""
        className="relative flex items-center justify-center flex-col overflow-hidden"
      >
        <img
          src={img}
          alt=""
          loading="lazy"
          className="rounded-lg h-[16rem] sm:h-[13rem] w-full object-cover "
        />
        <div className="projectInfo duration-300 opacity-0 absolute flex items-center justify-between p-3 bottom-0 w-full h-[4rem] bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2 *:text-[2.2rem] *:bg-white *:rounded-full *:p-2.5">
            <LuHeart className="hover:bg-zinc-200 duration-200" />
            <BiBookmark className="hover:bg-zinc-200 duration-200" />
          </div>
          <p className="text-[1.3rem] text-white ">{title}</p>
        </div>
      </Link>
      <div className="flex items-center justify-between w-full mt-3 ">
        <div className="flex items-center gap-3 *:flex *:items-center *:gap-2 **:text-[.9rem] **:text-zinc-500 ">
          <div>
            <p>325</p>
            <TiHeartFullOutline />
          </div>
          <div>
            <p>5.12k</p>
            <FaEye />
          </div>
        </div>
        <Link to="" className="flex items-center gap-2">
          <p className="dark:text-white">{username}</p>
          <img
            src="/images/User.jpg"
            alt=""
            className="rounded-full size-[1.5rem] "
          />
        </Link>
      </div>
    </li>
  );
}
