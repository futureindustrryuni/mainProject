import Aos from 'aos';
import React, { useEffect, useState } from 'react'
import { LiaUserSolid } from 'react-icons/lia'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [fixHeader, setFixHeader] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.1) {
        console.log("✅ کاربر به اندازه 100vh اسکرول کرد!");
        setFixHeader(true)
      }
      else {
        setFixHeader(false)
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  Aos.init({
    once: true,
  });
  return (
    <div className={`flex items-center justify-between fixed h-[5rem] z-50 w-full duration-500 ${fixHeader ? "bg-white" : "bg-transparent"} top-0 py-3 px-10`}>
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
        to="/auth"
        // data-aos="fade-right"
        // data-aos-duration="1000"
        // data-aos-delay="2500"
        className="flex items-center gap-1 bg-primary hover:bg-primaryLight hover:text-primary duration-300 px-4 py-1 text-[.9rem] rounded-lg text-white"
      >
        <LiaUserSolid className="size-[1.2rem]" />
        عضویت
      </Link>
    </div>
  )
}
