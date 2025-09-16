import Aos from "aos";
import React from "react";
import { FaEye } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function ProjectItem({ id, img, username }) {
  Aos.init({
    once: true,
  });

  return (
    <li
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={`${id}00`}
    >
      <Link to="" className="flex items-center justify-center flex-col">
        <img
          src={img}
          alt=""
          loading="lazy"
          className="rounded-lg h-[16rem] sm:h-[13rem] w-full object-cover "
        />
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
