import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { Grid } from "gridjs-react";
import { h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import ReactDOMServer from "react-dom/server";
import {
  Trash2,
  Crown,
  ShieldMinus,
  ShieldUser,
  CodeXml,
  Check,
  Eye,
} from "lucide-react";
import { TbEditCircle } from "react-icons/tb";

const articles = [
  {
    field: 0,
    id: 34556,
    title: "هوش مصنوعی و معایب آن",
    author: "علی",
    image: "project1.png",
  },
  {
    field: 1,
    id: 97834,
    title: "هوش مصنوعی و معایب آن",
    author: "mmd",
    image: "project2.png",
  },
  {
    field: 2,
    id: 32314,
    title: "هوش مصنوعی و معایب آن",
    author: "sara",
    image: "project3.png",
  },
  {
    field: 3,
    id: 47809,
    title: "هوش مصنوعی و معایب آن",
    author: "mahdi",
    image: "project4.png",
  },
  {
    field: 4,
    id: 35345,
    title: "هوش مصنوعی و معایب آن",
    author: "zahra",
    image: "project5.png",
  },
  {
    field: 5,
    id: 60881,
    title: "هوش مصنوعی و معایب آن",
    author: "omid",
    image: "project6.png",
  },
  {
    field: 6,
    id: 78762,
    title: "هوش مصنوعی و معایب آن",
    author: "mahtab",
    image: "project7.png",
  },
];

export default function Articles() {
  const [isOpen, setIsOpen] = useState(1);
  const [addArticle, setAddArticle] = useState(false);

  const [files, setFiles] = useState("");

  const preventDefault = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    preventDefault(e);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(() => droppedFiles);
    console.log(droppedFiles[0].name);
  };

  const handleSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(() => selectedFiles);
    console.log(selectedFiles[0].name);
  };

  const renderIcon = (Icon) =>
    ReactDOMServer.renderToString(<Icon size={18} />);

  return (
    <>
      <div className="flex h-screen bg-white dark:bg-dark  text-black dark:text-white">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={`${
            isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%] " : "w-[100%]"
          } `}
        >
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="px-5">
            {addArticle ? (
              <div className="w-full my-5">
                <form className="border-[#EEEBEB]  dark:border-[#1B202C] dark:bg-[#1B202C] p-5 rounded-xl">
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
                        placeholder="مثال : ساخت ربات تلگرام چگونه است؟"
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
                          هک و امنیت
                        </option>
                        <option value="" className="text-black">
                          بازی و سرگرمی
                        </option>
                        <option value="" className="text-black">
                          برنامه نویسی
                        </option>
                        <option value="" className="text-black">
                          تکنولوژی
                        </option>
                        <option value="" className="text-black">
                          هوش مصنوعی
                        </option>
                        <option value="" className="text-black">
                          هنر و گرافیک
                        </option>
                      </select>
                    </div>
                    <div className="flex items-stert flex-col gap-3">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                        نویسنده
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                        placeholder="مثال : محمد امین پور"
                      />
                    </div>
                    <div className="flex items-stert flex-col gap-3">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                        زمان مطالعه
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                        placeholder="مثال : 40 (بر اساس دقیقه)"
                      />
                    </div>
                     <div className="flex items-stert flex-col gap-3">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                         برچسب ها
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                        placeholder="مثال : پایتون-ربات-تلگرام"
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
                        اندازه پیشنهادی عکس با طول 1600px و با حداکثر 10MB
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
                      ایجاد
                      {/* <IoMdCheckmark className="text-[1.1rem]" /> */}
                    </button>
                    <button
                      onClick={() => setAddArticle(false)}
                      className="flex items-center justify-center gap-2 bg-gray-500 cursor-pointer duration-300 hover:bg-gray-600 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 "
                    >
                      کنسل
                      {/* <IoClose  className="text-[1.1rem]" /> */}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-right">
                <div className="flex items-center gap-2 bg-red-500 mt-10">
                  {/* باکس سرچ که Grid.js تولید می‌کنه */}
                  <div
                    id="gridjs-search"
                    className="flex-1 relative bg-green-500"
                  >
                    <button
                      onClick={() => setAddArticle(true)}
                      className="absolute left-0 top-6 px-3 py-2 z-50 bg-green-600 duration-300 cursor-pointer text-white text-[.9rem] rounded-lg hover:bg-green-500"
                    >
                      مقاله جدید
                    </button>
                  </div>

                  {/* دکمه کنار سرچ */}
                </div>
                <Grid
                  data={articles.map((a) => [
                    a.field + 1,
                    a.title,
                    a.author,
                    a.id,
                  ])}
                  columns={[
                    "ردیف",
                    "موضوع مقاله",
                    "نویسنده",
                    {
                      name: "عملیات",
                      formatter: (_, row) => {
                        const id = row.cells[3].data; // ستون id

                        return h("div", { className: "flex gap-2" }, [
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-yellow-500 text-white hover:bg-yellow-600",
                              onClick: () => alert("ویرایش مقاله با ID: " + id),
                              title: "ئیرایش",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(TbEditCircle),
                              },
                            })
                          ),
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-red-500 text-white hover:bg-red-600",
                              onClick: () => alert("بن کاربر با ID: " + id),
                              title: "رد کردن پروژه",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(Trash2),
                              },
                            })
                          ),
                          h(
                            "button",
                            {
                              className:
                                "p-2 rounded cursor-pointer text-[.8rem] bg-gray-500 text-white hover:bg-gray-600",
                              onClick: () => alert("بن کاربر با ID: " + id),
                              title: "مشاهده کردن",
                            },
                            h("span", {
                              dangerouslySetInnerHTML: {
                                __html: renderIcon(Eye),
                              },
                            })
                          ),
                        ]);
                      },
                    },
                  ]}
                  search={true}
                  pagination={{ enabled: true, limit: 5 }}
                  sort={true}
                  language={{
                    search: {
                      placeholder: "جستجو...",
                    },
                    pagination: {
                      previous: "قبلی",
                      to: "تا",
                      of: "از",
                      next: "بعدی",
                      showing: "نمایش",
                      results: () => "رکورد",
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
