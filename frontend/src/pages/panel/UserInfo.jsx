import { useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { CiEdit } from "react-icons/ci";
import { LiaUserSolid } from "react-icons/lia";

export default function UserInfo() {
  const [isOpen, setIsOpen] = useState(1);
  return (
    <>
      <div className="flex bg-white dark:bg-dark  text-black dark:text-white">
        {/*sadebar*/}
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />

        {/*content*/}
        <div
          className={`${
            isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%] " : "w-[100%]"
          } `}
        >
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          {/*content of dashboard*/}
          <div className="p-5 dark:text-white text-black ">
            <div className="flex flex-col bg-white dark:bg-[#1B202C] py-6 px-10 gap-7 rounded-xl sm:gap-y-7 shadow-[0_3px_15px_5px_rgba(0,0,0,0.1)] sm:gap-x-0 sm:grid-cols-[25%_25%_25%_25%]">
              <div className="flex items-center gap-1 sm:col-span-2">
                <LiaUserSolid className="sm:size-[2.2rem] size-7" />
                <p className=" font-IranYekanBold text-[1rem]">اطلاعات فردی</p>
              </div>

              <div className="w-full  ">
                <form className="w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5 w-full **:focus:outline-primary">
                    <div className="flex items-stert flex-col gap-3">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                        نام
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                        placeholder="نام خود را بنویسید..."
                      />
                    </div>
                    
                    <div className="flex items-stert flex-col gap-3">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                        نام خانوادگی
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                        placeholder="نام خانوادگی خود را بنویسید..."
                      />
                    </div>

                      <div className="flex items-stert flex-col gap-3">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                        سطح کاربری
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        disabled
                        className="placeholder:text-[.9rem] cursor-no-drop p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                        value="کاربر عادی"
                      />
                    </div>

                    <div className="flex items-stert flex-col gap-3">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                        تاریخ تولد
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                        placeholder="تاریخ تولد خود را بنویسید..."
                      />
                    </div>

                    <div className="flex items-stert flex-col gap-3">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                        کدملی
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                        placeholder="کدملی خود را بنویسید..."
                      />
                    </div>

                    <div className="flex items-stert flex-col gap-3">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                        شماره تلفن
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                        placeholder="شماره تلفن خود را بنویسید..."
                      />
                    </div>

                    <div className="flex items-stert flex-col gap-3">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                        تحصیلات
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
                          دیپلم
                        </option>
                        <option value="" className="text-black">
                          فوق دیپلم
                        </option>
                        <option value="" className="text-black">
                          لیسانس
                        </option>
                        <option value="" className="text-black">
                          فوق لیسانس
                        </option>
                        <option value="" className="text-black">
                          دکتری
                        </option>
                      </select>
                    </div>

                    <div className="flex items-stert flex-col gap-3 mb-5">
                      <label
                        htmlFor=""
                        className="text-zinc-700 dark:text-zinc-400 "
                      >
                        محل سکونت
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="placeholder:text-[.9rem] p-2 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 "
                        placeholder="محل سکونت خود را بنویسید..."
                      />
                    </div>
                  </div>

                  <label
                    htmlFor=""
                    className="text-zinc-700 dark:text-zinc-400"
                  >
                    درباره من
                  </label>
                  <textarea
                    name=""
                    id=""
                    rows={5}
                    placeholder="توضیحی درباره خودتان بنویسید..."
                    className="placeholder:text-[.9rem] p-3 outline-0 w-full rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 mt-2"
                  ></textarea>
                  <div className="flex items-center flex-wrap gap-1">
                    <button className="flex items-center justify-center gap-2 bg-primary/80 cursor-pointer duration-300 hover:bg-primary p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
                      ویرایش
                      {/* <IoMdCheckmark className="text-[1.1rem]" /> */}
                    </button>
                      <button className="flex items-center justify-center gap-2 bg-green-600 cursor-pointer duration-300 hover:bg-green-500 p-2 px-5 rounded-lg text-white text-[.9rem] mt-5 ">
                      تکمیل پروفایل
                      {/* <IoMdCheckmark className="text-[1.1rem]" /> */}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
