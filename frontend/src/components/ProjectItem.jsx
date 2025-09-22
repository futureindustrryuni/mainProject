import Aos from "aos";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { BiBookmark } from "react-icons/bi";
import { LuHeart } from "react-icons/lu";
import { Toast } from "./Toast";

export default function ProjectItem({ id, img, title, user_id }) {
  Aos.init({ once: true });

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState("");
  const [animate, setAnimate] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 گرفتن ایمیل صاحب پروژه
  useEffect(() => {
    fetch(`http://localhost:8000/api/user/${user_id}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data.email));
  }, [user_id]);

  // 🔹 سیو پروژه
  function saveHandler() {
    if (!token) {
      Toast.fire({
        icon: "error",
        title: "برای ذخیره پروژه اول لاگین کنید",
      });
      return;
    }

    fetch(`http://127.0.0.1:8000/api/indexes/save`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: id }),
    }).then((res) => {
      if (res.status === 200) {
        Toast.fire({
          icon: "success",
          title: "پروژه سیو شد !",
        });
      }
    });
  }

  // گرفتن وضعیت اولیه از API
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`http://127.0.0.1:8000/api/products/${id}`, {
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("initial:", data);

        // مطمئن شو بک‌اند اینارو میفرسته
        setLiked(!!data.liked); // اگر true/false نیومد → false
        setLikesCount(Number(data.likes_count) || 0); // اگر undefined بود → 0
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id, token]);

  // هندل لایک
  async function likeHandler() {
    if (!token) {
      Toast.fire({
        icon: "error",
        title: "برای لایک کردن اول لاگین کنید",
      });
      return;
    }

    // 🟢 optimistic update
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/like`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("like response:", data);

      // 🟢 sync با API اگر چیزی فرستاد
      if (typeof data.liked !== "undefined") setLiked(!!data.liked);
      if (typeof data.likes_count !== "undefined")
        setLikesCount(Number(data.likes_count) || 0);
    } catch (err) {
      console.error("خطا در لایک:", err);

      // 🟥 برگردوندن state به حالت قبل در صورت خطا
      setLiked((prev) => !prev);
      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
    }
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
          alt={title}
          loading="lazy"
          className="rounded-lg h-[16rem] sm:h-[13rem] w-full object-cover "
        />
        <div className="projectInfo z-50 duration-300 opacity-0 absolute flex flex-row-reverse items-center justify-between p-3 bottom-0 w-full h-[4rem] bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2 *:text-[2.2rem] *:rounded-full *:p-2.5">
            <LuHeart
              onClick={likeHandler}
              className={`cursor-pointer text-[2rem] transition-all duration-300 ${
                liked ? "bg-red-500 text-white" : "bg-white hover:bg-zinc-200"
              } ${animate ? "scale-125" : "scale-100"}`}
            />
            <BiBookmark
              onClick={saveHandler}
              className="cursor-pointer bg-white hover:bg-zinc-200 duration-200"
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

      {/* 🔹 پایین کارت */}
      <div className="flex items-center justify-between w-full mt-3 ">
        <div className="flex items-center gap-3 *:flex *:items-center *:gap-2 **:text-[.9rem] **:text-zinc-500 ">
          <button>
            <p>{loading ? "..." : likesCount}</p>
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
