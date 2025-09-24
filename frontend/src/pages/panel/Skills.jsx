import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../components/Loader";
import { BsTrash } from "react-icons/bs";
import {
  FaBootstrap,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaJsSquare,
  FaPython,
  FaReact,
  FaVuejs,
} from "react-icons/fa";

import { BiLogoDjango, BiLogoCPlusPlus, BiLogoGoLang } from "react-icons/bi";
import { IoLogoCss3, IoLogoLaravel } from "react-icons/io5";
import { RiAngularjsFill, RiTailwindCssFill } from "react-icons/ri";
import {
  SiDart,
  SiExpress,
  SiNestjs,
  SiNextdotjs,
  SiNuxtdotjs,
  SiPhp,
} from "react-icons/si";
import { CgFigma } from "react-icons/cg";
import { TbBrandCSharp, TbBrandReact } from "react-icons/tb";
import { FaFlutter } from "react-icons/fa6";
import { GrNode } from "react-icons/gr";

const skillsIcon = [
  { id: 1, name: "html", icon: <FaHtml5 className="text-orange-500" /> },
  { id: 2, name: "css", icon: <IoLogoCss3 className="text-blue-500" /> },
  { id: 3, name: "bootstrap", icon: <FaBootstrap  className="text-purple-500" /> },
  { id: 4, name: "tailwind", icon: <RiTailwindCssFill  className="text-blue-300" /> },
  { id: 5, name: "js", icon: <FaJsSquare className="text-yellow-400" /> },
  { id: 6, name: "react", icon: <TbBrandReact className="text-blue-400" /> },
  { id: 7, name: "nextJs", icon: <SiNextdotjs className="text-black" /> },
  { id: 8, name: "vue", icon: <FaVuejs className="text-green-500" /> },
  { id: 9, name: "nuxtJs", icon: <SiNuxtdotjs className="text-green-400" /> },
  { id: 10, name: "nodeJs", icon: <GrNode className="text-green-700" /> },
  { id: 11, name: "nestJs", icon: <SiNestjs  className="text-red-500" /> },
  { id: 12, name: "angular", icon: <RiAngularjsFill className="text-red-500" /> },
  { id: 13, name: "php", icon: <SiPhp className="text-purple-700"  /> },
  { id: 14, name: "laravel", icon: <IoLogoLaravel className="text-red-500" /> },
  { id: 15, name: "python", icon: <FaPython className="text-yellow-600" /> },
  { id: 16, name: "django", icon: <BiLogoDjango className="text-green-700" /> },
  { id: 17, name: "git", icon: <FaGitAlt className="text-orange-500" /> },
  { id: 18, name: "github", icon: <FaGithub className="text-black" /> },
  { id: 19, name: "figma", icon: <CgFigma  className="text-pink-500" /> },
  { id: 20, name: "go", icon: <BiLogoGoLang className="text-blue-300 text-[1.5rem]"/> },
  { id: 21, name: "c++", icon: <BiLogoCPlusPlus className="text-purple-500"/> },
  { id: 22, name: "c#", icon: <TbBrandCSharp className="text-purple-500"/> },
  { id: 23, name: "dart", icon: <SiDart className="text-blue-300"/> },
  { id: 24, name: "flutter", icon: <FaFlutter className="text-blue-300"/> },
  { id: 25, name: "express", icon: <SiExpress className="text-green-500 text-[1.2rem]"/> },
];

export default function Skills() {
  const [isOpen, setIsOpen] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [skill, setSkill] = useState("");
  const [percentage, setPercentage] = useState("");
  const [skills, setSkills] = useState(null); // ✅ آرایه خالی
  const token = localStorage.getItem("token");

  // 📌 گرفتن لیست مهارت‌ها
  const fetchSkills = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/skills", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("API response:", data);

      if (res.ok) {
        if (Array.isArray(data)) setSkills(data);
        else if (Array.isArray(data.data)) setSkills(data.data);
        else if (Array.isArray(data.skills)) setSkills(data.skills);
        else setSkills([]);
      }
    } catch (err) {
      console.error("مشکل در اتصال به سرور:", err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // 📌 افزودن
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/skill/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skill, percentage }),
      });

      const data = await res.json();

      if (res.ok) {
        await fetchSkills(); // ✅ دوباره لیست بگیر
        setSkill("");
        setPercentage("");
        setModalIsOpen(false);
      } else {
        console.error("خطا در ثبت مهارت:", data);
      }
    } catch (err) {
      console.error("مشکل در اتصال به سرور:", err);
    }
  };

  // 📌 حذف
  const removeSkillHandler = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        console.log("حذف موفق:", data);
        fetchSkills(); // ✅ لیست تازه
      } else {
        console.error("خطا در حذف مهارت:", data);
      }
    } catch (err) {
      console.error("مشکل در اتصال به سرور:", err);
    }
  };

  if (!skills) return <Loader />;

  return (
    <>
      <div className="flex h-svh bg-white dark:bg-dark  text-black dark:text-white">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={`${
            isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%] " : "w-[100%]"
          } `}
        >
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="p-5">
            {/*کداتو اینجا بزن*/}

            <div className="p-6">
              {/* تیتر + توضیح */}
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  مهارت‌های من
                </h2>
                <div className="w-16 h-1 bg-green-600 mx-auto rounded-full mt-2"></div>
                <p className="mt-3 text-gray-500 text-sm md:text-base max-w-md mx-auto">
                  مهارت‌هایی که در آن‌ها تخصص دارید را می‌توانید به همراه درصد
                  دانش خود اضافه کنید.
                </p>

                {/* دکمه باز کردن مودال */}
                <button
                  onClick={() => setModalIsOpen(true)}
                  className="px-6 py-2 cursor-pointer mt-4 bg-green-600 text-white font-medium rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300"
                >
                  + افزودن مهارت
                </button>
              </div>

              {/* لیست مهارت‌ها */}
              <div className="mt-6 grid grid-cols-1 msm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {!skills ? (
                  <p className="text-gray-500 text-sm text-center">
                    هنوز مهارتی اضافه نکرده‌اید.
                  </p>
                ) : (
                  Array.isArray(skills) &&
                  skills.map((item) => (
                    <div
                      key={item.id}
                      className="skillItem duration-300 p-3 bg-gray-100 rounded-xl shadow flex flex-row-reverse justify-between items-center"
                    >
                      <div className="font-medium flex items-center justify-center gap-2">
                        {item.skill}
                        {skillsIcon.map((icon) => {
                          if (
                            icon.name.toLocaleLowerCase() ===
                            item.skill.toLocaleLowerCase()
                          ) {
                            return icon.icon;
                          }
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <BsTrash
                          onClick={() => {
                            removeSkillHandler(item.id);
                          }}
                          className="skillTrash w-0 duration-300 cursor-pointer hover:text-red-500"
                        />
                        <div className="w-40 bg-gray-300 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-green-600 h-3"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* مودال */}
              <AnimatePresence>
                {modalIsOpen && (
                  <motion.div
                    className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="bg-white rounded-2xl shadow-xl w-96 p-6"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
                        افزودن مهارت جدید
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                          type="text"
                          placeholder="نام مهارت (مثلا: React)"
                          value={skill}
                          onChange={(e) => setSkill(e.target.value)}
                          className="w-full !border-1 !border-zinc-200 rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <input
                          type="number"
                          placeholder="درصد تسلط (0-100)"
                          value={percentage}
                          onChange={(e) => setPercentage(e.target.value)}
                          className="w-full !border-1 !border-zinc-200 rounded-xl p-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <div className="flex justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setModalIsOpen(false)}
                            className="flex-1 cursor-pointer px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
                          >
                            انصراف
                          </button>
                          <button
                            type="submit"
                            className="flex-1 cursor-pointer px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                          >
                            ذخیره
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
