import React, { useState, useEffect, useContext } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { FaCode } from "react-icons/fa";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { CgAddR } from "react-icons/cg";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { IsLoginContext } from "../../context/IsLoginContext";
import MyProjectItem from "../../components/MyProjectItem";
import ResumeStatusBox from "../../components/ResumeStatusBox ";
import { Toast } from "../../components/Toast";

export default function MyProjects() {
  const [isOpen, setIsOpen] = useState(true);
  const [addProject, setAddProject] = useState(false);
  const [resumeStatus, setResumeStatus] = useState(null);
  const [myProjects, setMyProjects] = useState(null);
  const [categories, setCategories] = useState(null);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    price: "",
    technologies: "",
    description: "",
  });

  const token = localStorage.getItem("token");
  const [isLogin, profile] = useContext(IsLoginContext);

  // هندل تغییرات اینپوت‌ها
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // انتخاب فایل
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

  // دریافت دسته‌بندی‌ها
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/categories/show", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCategories(data);
      console.log("cat : ", data);
    } catch (error) {
      console.log(error);
    }
  };

  // وضعیت رزومه
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/developer/status`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setResumeStatus(data))
      .catch((err) => console.error("خطا در دریافت وضعیت رزومه:", err));
  }, [token]);

  // دریافت پروژه‌ها
  const fetchProjects = async () => {
    if (!profile?.id) return;
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/developer/${profile.id}`
      );
      const data = await res.json();
      const projects = data.products || [];

      // برای هر پروژه عکس‌ها رو بگیر
      const projectsWithImages = await Promise.all(
        projects.map(async (project) => {
          try {
            const imgRes = await fetch(
              `http://127.0.0.1:8000/api/products/${project.id}/images`
            );
            const imgs = await imgRes.json();
            return {
              ...project,
              images: imgs,
            };
          } catch {
            return project;
          }
        })
      );

      setMyProjects(projectsWithImages);
    } catch (error) {
      console.error("خطا در گرفتن اطلاعات پروژه‌ها:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCategories()
  }, [profile]);

  // ارسال فرم پروژه جدید
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile?.id) return;

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("category_id", formData.category_id);
    fd.append("price", formData.price);
    fd.append("technologies", formData.technologies);
    fd.append("description", formData.description);

    files.forEach((file, i) => {
      fd.append(`images[${i}]`, file); // اسم فیلد رو با بک‌اند هماهنگ کن
    });

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd,
      });

      const data = await res.json();
      console.log("پروژه ذخیره شد:", data);

      if (res.ok) {
        Toast.fire({
          icon: "success",
          title: "پروژه با موفقیت ثبت شد",
        });
        setAddProject(false);
        setFiles([]);
        setFormData({
          title: "",
          category_id: "",
          price: "",
          technologies: "",
          description: "",
        });
        fetchProjects();
      }
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "لطفا همه فیلد ها را به درستی وارد کنید",
      });
    }
  };

  if (!myProjects) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen dark:text-white text-black bg-white dark:bg-dark">
      <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`${
          isOpen ? "w-full lg:w-[80%] xl:w-[83%]" : "w-full"
        } h-screen overflow-y-scroll scrollbar-hide`}
      >
        <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="p-4 space-y-6 rounded-xl w-auto">
          {resumeStatus.status === "approved" &&
          profile?.role === "developer" ? (
            <div className="border-2 border-[#EEEBEB] dark:border-[#1B202C] dark:bg-[#1B202C] border-solid shadow-xl shadow-zinc-200/50 rounded-xl dark:shadow-none mt-6">
              {/* هدر */}
              <div className="sticky top-1 bg-[#EEEBEB] z-10 dark:bg-[#333a4b] p-4 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  {addProject ? (
                    <CgAddR className="text-[1.1rem] lg:text-[1.5rem] dark:text-white" />
                  ) : (
                    <HiOutlineCodeBracketSquare className="text-[1.4rem] lg:text-[1.7rem] dark:text-white" />
                  )}
                  <span className="text-[.8rem] lg:text-[1.1rem] text-black dark:text-white">
                    {addProject ? "پروژه جدید" : "پروژه‌های من"}
                  </span>
                </div>

                <button
                  onClick={() => setAddProject(!addProject)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  {addProject ? <IoMdClose /> : <IoMdAdd />}
                  {addProject ? "بستن" : "افزودن"}
                </button>
              </div>

              {/* لیست یا فرم */}
              <div>
                {!addProject ? (
                  myProjects?.length > 0 ? (
                    <ul className="px-3">
                      {myProjects
                        .filter((item) => item.is_approved)
                        .map((item) => (
                          <MyProjectItem key={item.id} {...item} />
                        ))}
                    </ul>
                  ) : (
                    <p className="p-5">در حال حاضر پروژه‌ای ندارید.</p>
                  )
                ) : (
                  <div className="w-full p-5">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5 **:focus:outline-primary">
                        <div className="flex items-stert flex-col gap-3">
                          <label className="text-zinc-700 dark:text-zinc-400 ">
                            عنوان
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                            placeholder="مثال : طراحی سایت فروشگاهی با وردپرس"
                          />
                        </div>
                        <div className="flex items-stert flex-col gap-3">
                          <label className="text-zinc-700 dark:text-zinc-400 ">
                            دسته بندی
                          </label>
                          <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="placeholder:text-[.9rem] p-2 outline-0 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20"
                          >
                            <option value="">انتخاب کنید</option>
                            {categories?.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </select>

                          {/* <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="placeholder:text-[.9rem] *:bg-zinc-700 *:text-white p-2 outline-0 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                          >
                            <option value="0" className="text-black">
                              انتخاب کنید
                            </option>
                            <option value="1" className="text-black">
                              طراحی وب
                            </option>
                            <option value="2" className="text-black">
                              اپلیکیشن موبایل
                            </option>
                            <option value="3" className="text-black">
                              اپلیکیشن دسکتاپ
                            </option>
                            <option value="4" className="text-black">
                              ربات
                            </option>
                            <option value="5" className="text-black">
                              هوش مصنوعی
                            </option>
                            <option value="6" className="text-black">
                              گرافیک
                            </option>
                          </select> */}
                        </div>
                        <div className="flex items-stert flex-col gap-3">
                          <label className="text-zinc-700 dark:text-zinc-400 ">
                            قیمت
                          </label>
                          <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                            placeholder="مثال : 520,000"
                          />
                        </div>
                        <div className="flex items-stert flex-col gap-3">
                          <label className="text-zinc-700 dark:text-zinc-400 ">
                            تکنولوژی ها
                          </label>
                          <input
                            type="text"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleChange}
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
                                    📄 {file.name.slice(0, 20)}{" "}
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
                      <label className="text-zinc-700 dark:text-zinc-400 mt-10">
                        توضیحات
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        placeholder="توضیحی درباره پروژه خودتان بنویسید..."
                        className="placeholder:text-[.9rem] p-3 outline-0 w-full rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 mt-2"
                      ></textarea>
                      <div className="flex items-center flex-wrap gap-1">
                        <button
                          type="submit"
                          className="flex items-center justify-center gap-2 bg-green-500 cursor-pointer duration-300 hover:bg-green-600 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 "
                        >
                          تایید
                        </button>
                        <button
                          type="button"
                          onClick={() => setAddProject(false)}
                          className="flex items-center justify-center gap-2 bg-gray-500 cursor-pointer duration-300 hover:bg-gray-600 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 "
                        >
                          کنسل
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ) : profile?.role !== "developer" ? (
            // وقتی توسعه‌دهنده نیست
            <div className="h-[70vh] flex items-center justify-center flex-col text-center">
              <img src="/images/icons8-software-developer-100.png" alt="" />
              <p className="text-[1.1rem] md:text-[1.4rem]">
                شما توسعه‌دهنده نیستید
              </p>
              <p className="text-sm md:text-base text-zinc-500">
                اگر تمایلی برای توسعه‌دهنده شدن داری، روی دکمه زیر کلیک کن!
              </p>
              <Link
                to="/developer"
                className="flex items-center justify-center gap-2 bg-primary/80 px-4 py-2 rounded-lg mt-3 hover:bg-primary text-white"
              >
                توسعه‌دهنده شو <FaCode />
              </Link>
            </div>
          ) : (
            resumeStatus.status && (
              <div className="mt-5">
                <ResumeStatusBox
                  status={resumeStatus.status}
                  fileName={resumeStatus.resume_url?.split("/")[5]}
                  created_at={resumeStatus.creation_date}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
