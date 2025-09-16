import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { HiOutlineTicket, HiOutlineTrash } from "react-icons/hi";
import { TbEditCircle } from "react-icons/tb";

export default function MyTickets() {
  const [isOpen, setIsOpen] = useState(1);
  const [sendTicket, setSendTicket] = useState(0);

  return (
    <>
      <div className="flex dark:text-white text-black bg-white dark:bg-dark">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={`${
            isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%] " : "w-[100%]"
          } `}
        >
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div>
            <div className="p-4 space-y-6 rounded-xl w-auto">
              <div>
                <div>
                  <p className="text-[1rem] md:text-[1.1rem]">
                    کمک لازم داری ؟ ما هواتو داریم !
                  </p>
                  <p className="text-zinc-500 text-[.9rem] md:text-[1rem]">
                    شاید بتونی جوابتو بین این دسته ها پیدا کنی !
                  </p>
                </div>
                <ul className="grid gap-3 mt-5 grid-cols-2 *:h-[12rem] sm:grid-cols-3 lg:grid-cols-4 dark:*:bg-white/5 md:*:h-[15rem] dark:*:border-0 *:border-1 *:border-zinc-200 *:hover:bg-zinc-100 *:shadow-xl *:shadow-zinc-200/30 dark:*:shadow-none dark:*:hover:bg-white/7 *:cursor-pointer *:duration-200 *:rounded-xl *:flex *:items-center *:justify-center *:flex-col *:text-center *:px-3  ">
                  <li>
                    <img src="/icons/Rectangle1.svg" alt="" />
                    <p className="text-[1rem] md:text-[1.2rem] mt-4">
                      {" "}
                      پرداخت و فاکتور
                    </p>
                    <p className="text-[.8rem] md:text-[.9rem] lg:text-[1rem] text-zinc-500 ">
                      مشکلات در پرداخت بازگشت وجه و پیگیری فاکتورها
                    </p>
                  </li>
                  <li>
                    <img src="/icons/Rectangle2.svg" alt="" />
                    <p className="text-[1rem] md:text-[1.2rem] mt-4">
                      {" "}
                      پرداخت و فاکتور
                    </p>
                    <p className="text-[.8rem] md:text-[.9rem] lg:text-[1rem] text-zinc-500 ">
                      مشکلات در پرداخت بازگشت وجه و پیگیری فاکتورها
                    </p>
                  </li>
                  <li>
                    <img src="/icons/Rectangle3.svg" alt="" />
                    <p className="text-[1rem] md:text-[1.2rem] mt-4">
                      {" "}
                      پرداخت و فاکتور
                    </p>
                    <p className="text-[.8rem] md:text-[.9rem] lg:text-[1rem] text-zinc-500 ">
                      مشکلات در پرداخت بازگشت وجه و پیگیری فاکتورها
                    </p>
                  </li>
                  <li>
                    <img src="/icons/Rectangle4.svg" alt="" />
                    <p className="text-[1rem] md:text-[1.2rem] mt-4">
                      {" "}
                      پرداخت و فاکتور
                    </p>
                    <p className="text-[.8rem] md:text-[.9rem] lg:text-[1rem] text-zinc-500 ">
                      مشکلات در پرداخت بازگشت وجه و پیگیری فاکتورها
                    </p>
                  </li>
                  <li>
                    <img src="/icons/Rectangle5.svg" alt="" />
                    <p className="text-[1rem] md:text-[1.2rem] mt-4">
                      {" "}
                      پرداخت و فاکتور
                    </p>
                    <p className="text-[.8rem] md:text-[.9rem] lg:text-[1rem] text-zinc-500 ">
                      مشکلات در پرداخت بازگشت وجه و پیگیری فاکتورها
                    </p>
                  </li>
                  <li>
                    <img src="/icons/Rectangle6.svg" alt="" />
                    <p className="text-[1rem] md:text-[1.2rem] mt-4">
                      {" "}
                      پرداخت و فاکتور
                    </p>
                    <p className="text-[.8rem] md:text-[.9rem] lg:text-[1rem] text-zinc-500 ">
                      مشکلات در پرداخت بازگشت وجه و پیگیری فاکتورها
                    </p>
                  </li>
                  <li>
                    <img src="/icons/Rectangle7.svg" alt="" />
                    <p className="text-[1rem] md:text-[1.2rem] mt-4">
                      {" "}
                      پرداخت و فاکتور
                    </p>
                    <p className="text-[.8rem] md:text-[.9rem] lg:text-[1rem] text-zinc-500 ">
                      مشکلات در پرداخت بازگشت وجه و پیگیری فاکتورها
                    </p>
                  </li>
                  <li>
                    <img src="/icons/Rectangle8.svg" alt="" />
                    <p className="text-[1rem] md:text-[1.2rem] mt-4">
                      {" "}
                      پرداخت و فاکتور
                    </p>
                    <p className="text-[.8rem] md:text-[.9rem] lg:text-[1rem] text-zinc-500 ">
                      مشکلات در پرداخت بازگشت وجه و پیگیری فاکتورها
                    </p>
                  </li>
                </ul>
              </div>

              <div className="mt-15">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[1rem] md:text-[1.1rem]">همه تیکت ها</p>
                    <p className="text-zinc-500 text-[.9rem] md:text-[1rem]">
                      تیکت هایی که تو برامون فرستادی !
                    </p>
                  </div>
                  <button
                    onClick={() => setSendTicket(!sendTicket)}
                    className={`${
                      sendTicket
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-green-600 hover:bg-green-500"
                    }  duration-300 cursor-pointer px-5 py-2 rounded-lg text-[.8rem] md:text-[.9rem] text-white `}
                  >
                    {sendTicket ? "برگشت" : " ارسال تیکت جدید"}
                  </button>
                </div>
                {sendTicket ? (
                  <div>
                    <form>
                      <div className="flex items-stert flex-col gap-3 mt-5">
                        <select
                          name=""
                          id=""
                        required
                          className="placeholder:text-[.9rem] w-full md:w-[20rem] dark:*:bg-zinc-700 dark:*:text-white p-2 outline-0 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 dark:bg-white/5 "
                        >
                          <option value="0" className="text-black">
                            انتخاب کنید
                          </option>
                          <option value="" className="text-black">
                            پرداخت و فاکتور
                          </option>
                          <option value="" className="text-black">
                            دانلود و دسترسی{" "}
                          </option>
                          <option value="" className="text-black">
                            حساب کاربری
                          </option>
                          <option value="" className="text-black">
                            کیفیت پروژه‌ها
                          </option>
                          <option value="" className="text-black">
                            ارتباط با پشتیبان
                          </option>
                          <option value="" className="text-black">
                            گزارش پیشرفت
                          </option>
                          <option value="" className="text-black">
                            درخواست سفارشی
                          </option>
                          <option value="" className="text-black">
                            قوانین و امنیت
                          </option>
                        </select>
                      </div>
                      <textarea
                        name=""
                        id=""
                        rows={5}
                        required
                        placeholder="توضیحی درباره تیکت خودتان بنویسید..."
                        className="placeholder:text-[.9rem] dark:bg-white/5 p-3 outline-0 w-full rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 mt-2"
                      ></textarea>
                      <button
                        className="bg-green-600 hover:bg-green-700  duration-300 cursor-pointer px-5 py-2 rounded-lg text-[.8rem] md:text-[.9rem] "
                      >
                       ارسال
                      </button>
                    </form>
                  </div>
                ) : (
                  <ul className="grid gap-3 mt-5 grid-cols-2 *:h-[12rem] sm:grid-cols-2 lg:grid-cols-4 md:*:h-[15rem] *:rounded-xl *:flex *:items-center *:justify-center *:flex-col *:text-center *:px-3  ">
                    <li className=" dark:bg-gray-500/30 bg-zinc-100/70 dark:shadow-none shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 dark:border-gray-600">
                      <HiOutlineTicket className="bg-gray-500/50 border-2 border-gray-500 p-3 size-[4rem] rounded-lg text-[3rem] mb-3" />
                      <p className="text-[.9rem] md:text-[1rem]">همه تیکت ها</p>
                      <p className="text-zinc-400 text-[.8rem] md:text-[.9rem] ">
                        3 مورد
                      </p>
                    </li>
                    <li className=" dark:bg-gray-500/30 bg-zinc-100/70 dark:shadow-none shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 dark:border-gray-600">
                      <HiOutlineTicket className="bg-red-500/50 border-2 border-red-600 p-3 size-[4rem] rounded-lg text-[3rem] mb-3" />
                      <p className="text-[.9rem] md:text-[1rem]">
                        پاسخ داده نشده
                      </p>
                      <p className="text-zinc-400 text-[.8rem] md:text-[.9rem] ">
                        2 مورد
                      </p>
                    </li>
                    <li className=" dark:bg-gray-500/30 bg-zinc-100/70 dark:shadow-none shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 dark:border-gray-600">
                      <HiOutlineTicket className="bg-yellow-500/50 border-2 border-yellow-600 p-3 size-[4rem] rounded-lg text-[3rem] mb-3" />
                      <p className="text-[.9rem] md:text-[1rem]">
                        پاسخ داده شده
                      </p>
                      <p className="text-zinc-400 text-[.8rem] md:text-[.9rem] ">
                        1 مورد
                      </p>
                    </li>
                    <li className=" dark:bg-gray-500/30 bg-zinc-100/70 dark:shadow-none shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 dark:border-gray-600">
                      <HiOutlineTicket className="bg-green-500/50 border-2 border-green-600 p-3 size-[4rem] rounded-lg text-[3rem] mb-3" />
                      <p className="text-[.9rem] md:text-[1rem]">
                        در انتظار پاسخ
                      </p>
                      <p className="text-zinc-400 text-[.8rem] md:text-[.9rem] ">
                        0 مورد
                      </p>
                    </li>
                  </ul>
                )}
              </div>

              <ul className="mt-5">
                <li className="relative border-r-7 dark:bg-white/5 !border-r-red-500 rounded-xl border-2 dark:border-zinc-700 border-zinc-200 p-4 pb-10 ">
                  <p className="text-[1rem] md:text-[1.2rem]">مشکل پرداخت</p>
                  <p className="text-[.9rem] md:text-[1rem] text-zinc-500 leading-7 text-justify mb-4">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                    تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                    آینده، شناخت فراوان جامعه و متخصصان را می طلبد
                  </p>
                  <div className="flex items-center gap-3 absolute bottom-5 left-5">
                    <p className=" text-[.9rem] text-zinc-400 ">
                      دوشنبه 4 شهریور 1404
                    </p>
                    <span> | </span>
                    <button className="text-red-500 cursor-pointer" title="حذف">
                      <HiOutlineTrash className="sm:text-[18px] lg:text-[1.4rem] md:text-[25px]" />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
