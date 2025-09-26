import Aos from "aos";
import React, { useContext, useEffect, useState } from "react";
import { LiaUserSolid } from "react-icons/lia";
import { Link, NavLink } from "react-router-dom";
import { IsLoginContext } from "../context/IsLoginContext";

export default function Header() {
  const [fixHeader, setFixHeader] = useState(false);
  const profile = useContext(IsLoginContext)[1];
  // console.log("profile : ", profile);

  // document.querySelector("html").classList.add("dark")

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.1) {
        setFixHeader(true);
      } else {
        setFixHeader(false);
      }
    };
    scrollTo(0, 0);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  Aos.init({
    once: true,
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   fetch("http://localhost:8000/api/me/profile", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //        "Content-Type": "application/json",
  //     },
  //   })
  //     .then(async (res) => {
  //     const text = await res.text(); // متن خام
  //     console.log("RAW Response:", text);

  //     if (!res.ok) {
  //       throw new Error("خطا: " + res.status + " → " + text);
  //     }

  //     return JSON.parse(text); // دستی parse کن
  //   })
  //   .then((data) => {
  //     console.log("اطلاعات پروفایل:", data);
  //   })
  //   .catch((err) => {
  //     console.error("Error:", err.message);
  //   });
  // }, []);

  return (
    <div
      className={`flex items-center justify-between fixed h-[5rem] z-50 w-full duration-500 ${
        fixHeader ? "bg-white dark:bg-dark" : "bg-transparent dark:bg-dark"
      } top-0 py-3 px-10`}
    >
      <img
        // data-aos="fade-right"
        // data-aos-duration="1000"
        // data-aos-delay="1700"
        src="/images/logo.png"
        className="size-[4rem]"
        alt=""
      />
      <ul className="flex items-center justify-center gap-1 text-black dark:text-white">
        <li
        // data-aos="fade-right"
        // data-aos-duration="1000"
        // data-aos-delay="2000"
        >
          <NavLink className="px-5" to="/">
            خانه
          </NavLink>
        </li>
        <li
        // data-aos="fade-right"
        // data-aos-duration="1000"
        // data-aos-delay="2100"
        >
          <NavLink className="px-5" to="/Projects">
            پروژه ها
          </NavLink>
        </li>
        <li
        // data-aos="fade-right"
        // data-aos-duration="1000"
        // data-aos-delay="2200"
        >
          <NavLink className="px-5" to="/developer">
            توسعه دهنده شو
          </NavLink>
        </li>
        <li
        // data-aos="fade-right"
        // data-aos-duration="1000"
        // data-aos-delay="2300"
        >
          <NavLink className="px-5" to="/aboutus">
            درباره ما
          </NavLink>
        </li>
        <li
        // data-aos="fade-right"
        // data-aos-duration="1000"
        // data-aos-delay="2400"
        >
          <NavLink className="px-5" to="/weblog">
            مقالات
          </NavLink>
        </li>
      </ul>
      <Link
        to={profile ? "/panel/userInfo" : "/auth"}
        // data-aos="fade-right"
        // data-aos-duration="1000"
        // data-aos-delay="2500"
        className="flex items-center gap-1 bg-primary hover:bg-primaryLight hover:text-primary duration-300 px-4 py-1 text-[.9rem] rounded-lg text-white"
      >
        <LiaUserSolid className="size-[1.2rem]" />
        {profile ? `${profile.email.split("@")[0]}` : "عضویت"}
      </Link>
    </div>
  );
}
