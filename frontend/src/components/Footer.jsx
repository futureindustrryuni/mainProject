import React from "react";
import { BsTelegram } from "react-icons/bs";
import {
  FaTwitter,
  FaFacebookF,
  FaFacebook,
  FaLinkedinIn,
} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

import { Link } from "react-router-dom";

const links = [
  { name: "پروژه‌ها", path: "/projects" },
  { name: "توسعه دهنده شو", path: "/developer" },
  { name: "درباره ما", path: "/aboutus" },
  { name: "مقالات", path: "/weblog" },
  { name: "عضویت", path: "/auth" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* لوگو */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl flex items-center justify-center gap-2 font-extrabold text-[#ffa500] drop-shadow-lg">
            <p className="text-gray-400 text-sm md:text-base mt-2">با</p>
            پروجه
          </h2>
          <p className="text-gray-400 text-sm md:text-base mt-2">
            پروژت تو جیبته !
          </p>
        </div>

        {/* لینک‌ها */}
        <ul className="flex flex-wrap items-center justify-center gap-5 text-gray-300 text-base font-medium">
          {links.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.path}
                className="text-black px-3 py-1 hover:text-[#ffa500] duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* شبکه‌های اجتماعی */}
        <div className="flex items-center text-xl">
          {[BsTelegram, FaFacebook, RiInstagramFill].map((Icon, idx) => (
            <Link
              to=""
              key={idx}
              href="#"
              className="hover:text-[#ffa500] text-zinc-400 duration-300 p-3 flex items-center justify-center"
            >
              <Icon />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
