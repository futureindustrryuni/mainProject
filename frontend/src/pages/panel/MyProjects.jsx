import React, { useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { BsSun, BsMoon } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BsBookmarkFill } from "react-icons/bs";

import projeimg from "/images/projeimg.png";
import { AiOutlinePlus } from "react-icons/ai";
import { SiCodecrafters } from "react-icons/si";
import { CiCirclePlus } from "react-icons/ci";
import { FaCode, FaGithub, FaRegEdit } from "react-icons/fa";
import { BiEditAlt } from "react-icons/bi";
import {
  IoIosCloseCircleOutline,
  IoMdAdd,
  IoMdCheckmark,
  IoMdClose,
  IoMdFingerPrint,
} from "react-icons/io";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";
import { TbEditCircle } from "react-icons/tb";
import { CgAddR } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { LuLockKeyhole } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

export default function MyProjects() {
  const [isOpen, setIsOpen] = useState(1);
  const [addProject, setAddProject] = useState(false);
  const [isProgramer, setIsProgramer] = useState(false);

  const [files, setFiles] = useState([]);

  const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    preventDefault(e);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

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
          <div>
            <div className="p-4 space-y-6 rounded-xl w-auto">
              {isProgramer ? (
                <div className="border-2 border-[#EEEBEB]  dark:border-[#1B202C] dark:bg-[#1B202C] border-solid shadow-xl shadow-zinc-200/50 rounded-xl dark:shadow-none mt-6">
                  <div className="sticky top-1 bg-[#EEEBEB] z-10 dark:bg-[#333a4b] p-4 flex justify-between items-center ">
                    <div className="flex gap-2 items-center">
                      {" "}
                      {addProject ? (
                        <CgAddR className="text-[1.1rem] lg:text-[1.5rem] md:text-[1.3rem] dark:text-[#ffff]" />
                      ) : (
                        <HiOutlineCodeBracketSquare className="text-[1.4rem] lg:text-[1.7rem] md:text-[1.5rem] dark:text-[#ffff]" />
                      )}
                      <span className="text-[.8rem] lg:text-[1.1rem] md:text-[1rem] dark:text-[#ffff] text-black">
                        {addProject ? "پروژه جدید" : "پروژه های من"}
                      </span>
                    </div>

                    <button
                      onClick={() => setAddProject(!addProject)}
                      title="افزودن یک پروژه جدید"
                      className="flex items-center gap-1 md:gap-2 duration-300 hover:bg-green-700 bg-green-600 text-white cursor-pointer text-[.7rem] md:text-[.9rem] py-1.5 px-3 rounded-lg"
                    >
                      {addProject ? (
                        <IoMdClose className="text-[18px] lg:text-[1.3rem] md:text-[25px]" />
                      ) : (
                        <IoMdAdd className="text-[18px] lg:text-[1.3rem] md:text-[25px]" />
                      )}
                      {addProject ? "بستن" : "افزودن"}
                    </button>
                  </div>
                  <div>
                    {!addProject && (
                      <ul className="px-3">
                        <li className="relative flex items-start flex-col sm:items-start xmd:flex-row gap-4 py-4 border-b-1 border-zinc-200 sm:border-zinc-200/10 ">
                          <img
                            src="/images/project5.png"
                            alt="طراحی وبسایت رستوران"
                            className="h-[100px] w-[150px] xsm:w-[230px] xsm:h-[165px] rounded-xl object-cover"
                          />
                          <div className="flex items-start flex-col mr-1 gap-2 h-full">
                            <h2 className="font-bold text-[1rem] xsm:text-[1.2rem] md:text-[1.4rem]  dark:text-[#FFFFFF]  text-black">
                              طراحی وبسایت رستوران
                            </h2>
                            <p className="text-[#999999] font-medium text-[.8rem] lg:text-[1rem] md:text-[.9rem] line-clamp-2 w-[12rem] sm:w-[10rem] md:w-[15rem]  lg:w-[30rem] ">
                              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                              صنعت چاپ، و با استفاده از طراحان گرافیک است،
                              چاپگرها و متون بلکه روزنامه و مجله در ستون و
                              سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                              مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                              کاربردی می باشد، کتابهای زیادی
                            </p>
                            <p className="text-[#777] font-medium text-[.7rem] lg:text-[.9rem] md:text-[.8rem]">
                              تاریخ انتشار : 1404/01
                            </p>
                            <div className="flex gap-1 md:gap-1 mt-2">
                              <span className="bg-zinc-200/70 dark:bg-[#323232] text-black dark:text-[#FFFFFF] font-medium  text-[.7rem] md:text-[.8rem] px-3 py-1 rounded-[8px]">
                                Wordpress
                              </span>
                              <span className="bg-zinc-200/70 dark:bg-[#323232] text-black dark:text-[#FFFFFF] font-medium  text-[.7rem] md:text-[.8rem]  px-3 py-1 rounded-[8px]">
                                UI/UX
                              </span>
                              <span className="bg-zinc-200/70 dark:bg-[#323232] text-black dark:text-[#FFFFFF]  font-medium text-[.7rem] md:text-[.8rem] px-3 py-1 rounded-[8px]">
                                Figma
                              </span>
                            </div>
                          </div>
                          <div className="absolute top-[1rem] left-[.5rem] mt-1 flex gap-2">
                            <button
                              className="text-[#ff9911] cursor-pointer"
                              title="ویرایش"
                            >
                              <TbEditCircle className="sm:text-[18px] lg:text-[1.4rem] md:text-[25px]" />
                            </button>
                            <button
                              className="text-red-500 cursor-pointer"
                              title="حذف"
                            >
                              <HiOutlineTrash className="sm:text-[18px] lg:text-[1.4rem] md:text-[25px] text" />
                            </button>
                          </div>
                        </li>
                      </ul>
                    )}

                    {addProject && (
                      <div className="w-full p-5">
                        <form>
                          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5 **:focus:outline-primary">
                            <div className="flex items-stert flex-col gap-3">
                              <label
                                htmlFor=""
                                className="text-zinc-700 dark:text-zinc-400 "
                              >
                                عنوان
                              </label>
                              <input
                                type="text"
                                name=""
                                id=""
                                className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                                placeholder="مثال : طراحی سایت فروشگاهی با وردپرس"
                              />
                            </div>
                            <div className="flex items-stert flex-col gap-3">
                              <label
                                htmlFor=""
                                className="text-zinc-700 dark:text-zinc-400 "
                              >
                                دسته بندی
                              </label>
                              <select
                                name=""
                                id=""
                                className="placeholder:text-[.9rem] *:bg-zinc-700 *:text-white p-2 outline-0 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                              >
                                <option value="0" className="text-black">
                                  انتخاب کنید
                                </option>
                                <option value="" className="text-black">
                                  طراحی وب
                                </option>
                                <option value="" className="text-black">
                                  اپلیکیشن موبایل
                                </option>
                                <option value="" className="text-black">
                                  اپلیکیشن دسکتاپ
                                </option>
                                <option value="" className="text-black">
                                  ربات
                                </option>
                                <option value="" className="text-black">
                                  هوش مصنوعی
                                </option>
                                <option value="" className="text-black">
                                  گرافیک
                                </option>
                              </select>
                            </div>
                            <div className="flex items-stert flex-col gap-3">
                              <label
                                htmlFor=""
                                className="text-zinc-700 dark:text-zinc-400 "
                              >
                                قیمت
                              </label>
                              <input
                                type="text"
                                name=""
                                id=""
                                className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                                placeholder="مثال : 520,000"
                              />
                            </div>
                            <div className="flex items-stert flex-col gap-3">
                              <label
                                htmlFor=""
                                className="text-zinc-700 dark:text-zinc-400 "
                              >
                                تکنولوژی ها
                              </label>
                              <input
                                type="text"
                                name=""
                                id=""
                                className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                                placeholder="مثال : Js-React-NodeJs"
                              />
                            </div>
                          </div>

                          <div className="w-full py-6">
                            <div
                              className="rounded-2xl bg-white dark:bg-[#1B202C] flex items-center justify-center flex-col gap-3 h-[20rem] w-full border-2 border-dashed border-gray-300  p-6 text-center"
                              onDragEnter={preventDefault}
                              onDragOver={preventDefault}
                              onDrop={handleDrop}
                            >
                              <img
                                src="/images/iconsax-document-upload.png"
                                className="object-cover size-[4rem]"
                                alt=""
                              />
                              <p className="text-lg font-medium">
                                میتوانید عکس ها را درگ کنید در اینجا
                              </p>
                              <p className="text-[.8rem] md:text-[1.1rem] text-gray-400">
                                اندازه پیشنهادی عکس با طول 1600px و با حداکثر
                                10MB
                              </p>
                              <p className="text-sm">یا</p>

                              <label className="inline-block cursor-pointer rounded-full border border-zinc-300 text-zinc-600 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-sm">
                                اضافه کردن تصویر پروژه
                                <input
                                  type="file"
                                  multiple
                                  className="hidden"
                                  onChange={handleSelect}
                                />
                              </label>

                              <div className="text-left">
                                {files.length === 0 ? (
                                  <p className="text-[.7rem] text-center text-gray-400">
                                    هنوز فایلی انتخاب نشده
                                  </p>
                                ) : (
                                  <ul className="space-y-1 text-sm">
                                    {files.map((file, i) => (
                                      <li key={i} className="truncate">
                                        📄 {file.name.slice(1, 20)}... {""}
                                        <span className="text-gray-400">
                                          ({file.size} bytes)
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </div>
                          <label
                            htmlFor=""
                            className="text-zinc-700 dark:text-zinc-400 mt-10"
                          >
                            توضیحات
                          </label>
                          <textarea
                            name=""
                            id=""
                            rows={5}
                            placeholder="توضیحی درباره پروژه خودتان بنویسید..."
                            className="placeholder:text-[.9rem] p-3 outline-0 w-full rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 mt-2"
                          ></textarea>
                          <div className="flex items-center flex-wrap gap-1">
                            <button className="flex items-center justify-center gap-2 bg-green-500 cursor-pointer duration-300 hover:bg-green-600 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
                              تایید
                              {/* <IoMdCheckmark className="text-[1.1rem]" /> */}
                            </button>
                            <button
                              onClick={() => setAddProject(false)}
                              className="flex items-center justify-center gap-2 bg-gray-500 cursor-pointer duration-300 hover:bg-gray-600 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 "
                            >
                              کنسل
                              {/* <IoClose  className="text-[1.1rem]" /> */}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-[70vh] flex items-center justify-center flex-col text-center">
                  <img src="/images/icons8-software-developer-100.png" alt="" />
                  <p className="text-[1.1rem] md:text-[1.4rem]  ">
                    شما توسعه دهنده نیستید
                  </p>
                  <p className="text-[.9rem] md:text-[1rem] text-zinc-500">
                    اگر تمایلی برای توسعه دهنده شدن داری بزن روی دکمه زیر !
                  </p>
                  <button className="flex items-center justify-center gap-2 bg-primary/80 px-4 py-2 rounded-lg mt-3 cursor-pointer duration-300 hover:bg-primary">
                    توسعه دهنده شو
                    <FaCode />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
