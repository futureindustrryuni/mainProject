import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { FaCode } from "react-icons/fa";

import { IoMdAdd, IoMdClose } from "react-icons/io";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";
import { TbEditCircle } from "react-icons/tb";
import { CgAddR } from "react-icons/cg";
import ResumeStatusBox from "../../components/ResumeStatusBox ";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import ProjectItem from "../../components/ProjectItem";
import SaveCard from "../../components/SaveCard";
import EmptySaves from "../../components/EmptySaves";

export default function MySaves() {
  const [isOpen, setIsOpen] = useState(1);
  const [saves, setSaves] = useState(null); // ذخیره‌ها (id پروژه‌ها)
  const [projects, setProjects] = useState(null); // همه پروژه‌ها
  const [mySaves, setMySaves] = useState(null); // پروژه‌های ذخیره‌شده
  const token = localStorage.getItem("token");

  // گرفتن لیست همه پروژه‌ها
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/products");
        const data = await res.json();
        setProjects(data.data);
      } catch (err) {
        console.error("خطا در گرفتن پروژه‌ها:", err);
      }
    };

    fetchProjects();
  }, []);

  // گرفتن ذخیره‌های کاربر وقتی پروژه‌ها آماده شد
  useEffect(() => {
    if (!projects) return;

    const fetchSaves = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/indexes/saves", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setSaves(data.data);

        // پیدا کردن پروژه‌های ذخیره‌شده و اضافه کردن اولین عکس
        const mapped = await Promise.all(
          data.data.map(async (item) => {
            const project = projects.find((p) => p.id === item.product_id);
            if (!project) return null;

            try {
              const resImg = await fetch(
                `http://127.0.0.1:8000/api/products/${project.id}/images`
              );
              const imgs = await resImg.json();
              return {
                ...project,
                firstImage: imgs[0]?.path || null,
              };
            } catch {
              return { ...project, firstImage: null };
            }
          })
        );

        setMySaves(mapped.filter(Boolean));
      } catch (err) {
        console.error("خطا در گرفتن ذخیره‌ها:", err);
      }
    };

    fetchSaves();
  }, [projects, token]);

  if (!mySaves) return <Loader />;

  return (
    <>
      <div className="flex h-screen dark:text-white text-black bg-white dark:bg-dark">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={`${
            isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%] " : "w-[100%]"
          } h-screen overflow-y-scroll scrollbar-hide`}
        >
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="p-5">
            <div>
              <p className="text-[1rem] md:text-[1.3rem]">سیو شده ها</p>
              <p className="text-[.8rem] md:text-[1rem] text-zinc-500">
                پروژه هایی که نظر شما را جلب کرده !
              </p>
            </div>
            {mySaves.length ? (
              <ul className=" mt-5 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
                {mySaves.map((item) => (
                  <SaveCard key={item.id} {...item} />
                ))}
              </ul>
            ) : (
              <EmptySaves />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
