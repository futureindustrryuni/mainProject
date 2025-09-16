import { useEffect, useState } from "react";
import { AiOutlineExperiment, AiOutlineTrophy } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineNewspaper, HiOutlineUserGroup } from "react-icons/hi";
import {
  HiComputerDesktop,
  HiOutlineArchiveBoxArrowDown,
} from "react-icons/hi2";
import { ImCreditCard } from "react-icons/im";
import {
  IoBookmarksOutline,
  IoCodeSlashOutline,
  IoCodeSlashSharp,
  IoNewspaperOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuClipboardList, LuTicket, LuUserRound } from "react-icons/lu";
import { MdOutlineArticle } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function SideBar({ isOpen, setIsOpen }) {
  function sidebarHandler() {
    if (window.innerWidth <= 766) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    sidebarHandler();
  }, []);

  return (
    <div
      className={`h-screen ${
        isOpen ? "w-[17rem] lg:w-[20%] xl:w-[17%] " : "w-0 hidden"
      } fixed md:sticky top-0 z-50 p-3 duration-500 bg-[#fff] dark:bg-[#1B202C] border-l-2 dark:border-zinc-900 border-zinc-200 dark:bg[#1B202C] dark:text-white text-black`}
    >
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="" className="size-[2.2rem] mt-2 " />
          <p className="text-[1.1rem] font-black ">
            پرو<span className="text-primary">ج</span>ه
          </p>
        </div>
        <p
          className="text-2xl cursor-pointer"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          ×
        </p>
      </div>

      <ul className="*:mb-2 *:rounded-sm *:hover:bg-primaryLight **:flex **:items-center **:gap-2 *:w-full  ">
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/userInfo" className="p-2 text-[.9rem] w-full">
            <LuUserRound className="text-xl" />
            <p>اطلاعات فردی</p>
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/skills" className="p-2 text-[.9rem] w-full">
            <AiOutlineExperiment className="text-xl" />
            <p>مهارت های فنی</p>
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/myTransactions" className="p-2 text-[.9rem] w-full">
            <ImCreditCard className="text-xl" />
            <p>خرید های من</p>
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/myProjects" className="p-2 text-[.9rem] w-full">
            <IoCodeSlashSharp className="text-xl" />
            پروژه های من
          </NavLink>
        </li>{" "}
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/*" className="p-2 text-[.9rem] w-full">
            <IoBookmarksOutline className="text-xl" />
            ذخیره شده ها
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/achievements" className="p-2 text-[.9rem] w-full">
            <AiOutlineTrophy className="text-xl" />
            <p>دستاورد های من</p>
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/myTickets" className="p-2 text-[.9rem] w-full">
            <LuTicket className="text-xl" />
            <p>تیکت های من</p>
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/transactions" className="p-2 text-[.9rem] w-full">
            <IoNewspaperOutline className="text-xl" />
            <p>تراکنش ها</p>
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/tickets" className="p-2 text-[.9rem] w-full">
            <HiOutlineArchiveBoxArrowDown className="text-xl" />
            <p>تیکت ها</p>
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/requests" className="p-2 text-[.9rem] w-full">
            <LuClipboardList className="text-xl" />
            <p>درخواست توسعه دهنده ها</p>
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/users" className="p-2 text-[.9rem] w-full">
            <HiOutlineUserGroup className="text-xl" />
            <p>کاربران</p>
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/projects" className="p-2 text-[.9rem] w-full">
            <BsBoxSeam className="text-xl" />
            <p>پروژه ها</p>
          </NavLink>
        </li>
        <li onClick={sidebarHandler}>
          <NavLink to="/panel/articles" className="p-2 text-[.9rem] w-full">
            <MdOutlineArticle className="text-xl" />
            <p>مقاله ها</p>
          </NavLink>
        </li>
        {/* <li onClick={sidebarHandler}>
          <NavLink to="/panel/setting" className="p-2 text-[.9rem] w-full">
            <IoSettingsOutline className="text-xl" />
            <p>تنظیمات</p>
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}
