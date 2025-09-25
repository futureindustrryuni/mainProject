import React, { useContext } from "react";
import { HiMenu } from "react-icons/hi";
import { LuBadgeCheck } from "react-icons/lu";
import { IsLoginContext } from "../context/IsLoginContext";

export default function TopBar({ isOpen, setIsOpen }) {
  const [isLogin, profile] = useContext(IsLoginContext);
  if (!profile?.id) return;
  console.log(profile.name);

  return (
    <div className="h-[6rem] flex items-center gap-5 p-5 bg-white dark:bg-dark">
      <HiMenu
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-200 dark:bg-zinc-800 dark:text-white p-1 rounded-lg text-[2rem] cursor-pointer hover:scale-110 duration-150 "
      />
      <div className="flex items-center gap-3 ">
        <img
          src="/images/team3.jpg"
          alt=""
          className="size-[3.5rem] rounded-full object-cover "
        />
        <div>
          <div className="flex items-center gap-2 ">
            <p className="dark:text-white text-black">{profile.name+" "+profile.family || "بدون نام"}</p>
            <div className="flex items-center gap-1 bg-primary/20 rounded-lg px-3 p-1">
              <LuBadgeCheck className="text-[.9rem] text-primary" />
              <p className="text-[.7rem] text-primary">
                {profile.role === "supervisor"
                  ? "مالک"
                  : profile.role === "admin"
                  ? "ادمین"
                  : profile.role === "developer"
                  ? "توسعه دهنده"
                  : profile.role === "user"
                  ? "کاربر"
                  : ""}
              </p>
            </div>
          </div>
          <p className="text-[.9rem] text-zinc-500 ">{profile.email}</p>
        </div>
      </div>
    </div>
  );
}
