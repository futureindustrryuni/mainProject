import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

export default function Setting() {
  const [isOpen, setIsOpen] = useState(1);
  return (
    <>
      <div className="flex *:h-[100vh] dark:text-white text-black bg-white dark:bg-dark ">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={`${isOpen?"w-[100%] lg:w-[80%] xl:w-[83%] ":"w-[100%]"} `}>

          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />

          {/*-------------- فرم تنظیمات --------------*/}
          <div className="p-5 flex justify-start">
            <div className="w-full max-w-md text-right space-y-8">
              {/* نام کاربری */}
              <div>
                <h2 className="text-lg font-medium leading-relaxed mb-2">
                  نام کاربری
                </h2>
                <hr />
                <section className="mt-4 space-y-4">
                  <div>
                    <h3 className="inline-block ml-1 text-lg text-red-700">
                      توجه :
                    </h3>
                    <p className="inline-block text-sm text-gray-500/80 ">
                      تنها یک بار میتوانید نام کاربری خود را تغییر دهید.
                    </p>
                  </div>
                  <input
                    type="text"
                    placeholder="نام کاربری"
                    className=" bg-zinc-200/50 dark:bg-[#1B202C] text-dark dark:text-white dark:placeholder-white/50 placeholder:text-black  w-full rounded-md px-3 py-2  text-sm outline-none focus:ring-0 focus:border-gray-400"
                  />
                  <button
                    type="button"
                    className="bg-primary text-[.8rem] px-4 py-2 rounded-md text-white text-sm hover:bg-primary/80 cursor-pointer transition block"
                  >
                    تغییر نام کاربری
                  </button>
                </section>
              </div>

              {/* گذرواژه */}
              <div>
                <h2 className="text-lg font-medium leading-relaxed mb-2">
                  انتخاب گذرواژه
                </h2>
                <hr />
                <section className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm mb-2">گذرواژه</label>
                    <input
                      type="password"
                      placeholder="رمز عبور"
                      className="inputsSetting  bg-zinc-200/50 dark:bg-[#1B202C] text-dark dark:text-white dark:placeholder-white/50 placeholder:text-black  w-full border border-gray-400 rounded-md px-3 py-2  text-sm outline-none focus:ring-0 focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">تکرار گذرواژه</label>
                    <input
                      type="password"
                      placeholder="تکرار رمز عبور"
                      className="inputsSetting  bg-zinc-200/50 dark:bg-[#1B202C] text-dark dark:text-white dark:placeholder-white/50 placeholder:text-black  w-full border border-gray-400 rounded-md px-3 py-2  text-sm outline-none focus:ring-0 focus:border-gray-400"
                    />
                  </div>
                  <button
                    type="button"
                    className="bg-primary text-[.8rem] px-4 py-2 rounded-md text-white text-sm hover:bg-primary/80 cursor-pointer transition"
                  >
                    به‌روزرسانی گذرواژه
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
