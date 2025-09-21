import Aos from "aos";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { BiBookmark } from "react-icons/bi";
import { LuHeart } from "react-icons/lu";
import { Toast } from "./Toast";

export default function ProjectItem({ id, img, title, user_id }) {
  Aos.init({
    once: true,
  });
  const [userInfo, setUserInfo] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:8000/api/user/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.email);
      });
  }, []);

  function saveHandler() {
    fetch(`http://127.0.0.1:8000/api/indexes/save`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: id }),
    }).then((res) => {
      if (res.status == 200) {
        Toast.fire({
          icon: "success",
          title: "پروژه سیو شد !",
        });
      }
    });
  }

  return (
    <li
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay={`${id}00`}
      className="projectItem"
    >
      <div className="relative flex items-center justify-center flex-col overflow-hidden">
        <img
          src={img}
          alt=""
          loading="lazy"
          className="rounded-lg h-[16rem] sm:h-[13rem] w-full object-cover "
        />
        <div className="projectInfo z-50 duration-300 opacity-0 absolute flex flex-row-reverse items-center justify-between p-3 bottom-0 w-full h-[4rem] bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2 *:text-[2.2rem] *:bg-white *:rounded-full *:p-2.5">
            <LuHeart className="cursor-pointer hover:bg-zinc-200 duration-200" />
            <BiBookmark
              onClick={saveHandler}
              className="cursor-pointer hover:bg-zinc-200 duration-200"
            />
          </div>
          <Link
            to={`/ProductDetails/${id}`}
            className="text-[1.3rem] text-white line-clamp-1"
          >
            {title}
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3 ">
        <div className="flex items-center gap-3 *:flex *:items-center *:gap-2 **:text-[.9rem] **:text-zinc-500 ">
          <button>
            <p>325</p>
            <TiHeartFullOutline />
          </button>
          <button>
            <p>5.12k</p>
            <FaEye />
          </button>
        </div>
        <Link to="" className="flex items-center gap-2">
          <p className="dark:text-white">{userInfo.split("@")[0]}</p>
          <img
            src="/images/User.jpg"
            alt={title}
            className="rounded-full size-[1.5rem] "
          />
        </Link>
      </div>
    </li>
  );
}
