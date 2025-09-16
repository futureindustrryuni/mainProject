import { useState } from "react";
import projepimg from "/images/projep1.png";
import ProjectItem from "../components/ProjectItem";
import { IoBagCheck } from "react-icons/io5";

export default function Payment() {
  const [selected, setSelected] = useState("");

  return (
    <div className="dark:bg-dark w-full pb-7">
      <div className="relative max-w-5xl h-full container mx-auto p-5 grid grid-cols-1 md:grid-cols-3 dark:bg-dark">
        {/*proje*/}
        <div className="order-2 md:col-span-1 ">
          <div className=" w-full max-w-[600px] mx-auto  mt-6 md:mt-5 md:w-[90%]  h-[655px] md:h-[645px] sm:h-[750px] bg-[#F7F7F7]  dark:bg-[#1B202C] rounded-xl shadow-[0px_0px_11px_rgba(0,0,0,0.15)] ">
            <div className="w-full  h-[350px]  md:h-[170px] lg:h-[230px] rounded-xl p-2">
              <img
                src={projepimg}
                alt="profile"
                className="w-full h-full rounded-xl"
              />
            </div>

            <div className="mt-6 text-center text-[#373D37] dark:text-[#F5F5F5]  font-bold text-[18px] md:text-[21px] sm:text-2xl">
              نام پروژه
            </div>

            <div className="flex flex-col items-strat mt-8 gap-4 px-2  sm:px-6">
              <div className="text-[#373D37] dark:text-[#F5F5F5]  text-right md:text-[18px] font-medium  sm:text-xl">
                قیمت
              </div>
              <div className="text-[#373D37] dark:text-[#F5F5F5] md:text-[18px]  text-right font-medium  sm:text-xl">
                متن
              </div>
              <div className="text-[#373D37] dark:text-[#F5F5F5] md:text-[18px]  text-right font-medium sm:text-xl">
                کد تخفیف
              </div>
              <div className="text-[#373D37] dark:text-[#F5F5F5] md:text-[18px]  text-right font-medium  sm:text-xl">
                مالیات
              </div>
            </div>

            <div className="w-[90%] h-[1.5px] bg-[#373D37] dark:bg-[#F5F5F5] mx-auto my-6" />

            <div className="text-[#373D37] dark:text-[#F5F5F5] text-right font-bold md:text-[20px] sm:text-2xl pr-2 sm:pr-6">
              مبلغ کل
            </div>

            <div className="flex justify-center mt-10 p-5">
              <button className="w-full h-[40px] sm:h-[45px] cursor-pointer bg-[#324859]  hover:duration-300 hover:bg-amber-500 rounded-lg text-white font-bold">
                پرداخت
              </button>
            </div>
          </div>
        </div>

        {/* فرم پرداخت - دوم در موبایل */}
        <div className="order-3 md:col-span-2 space-y-2 justify-self-center w-full">
          <div className=" w-full max-w-[600px] mx-auto md:ml-auto bg-[#F5F5F5] mt-5 shadow-[0_0_5px_rgba(0,0,0,0.15)] rounded-lg px-6 py-4  dark:bg-[#1B202C]">
            <h2 className="text-[#373D37] font-bold md:text-[1.1rem] text-right mb-2 dark:text-[#F1FFED]">
              انتخاب درگاه پرداخت
            </h2>

            <div
              className="flex flex-row items-center justify-start gap-4 cursor-pointer align-baseline"
              onClick={() => setSelected("asan")}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border border-[#373D37] dark:border-[#F5F5F5]  ${
                  selected === "asan"
                    ? "bg-[#373D37] dark:bg-[#F5F5F5]"
                    : "bg-[#F5F5F5] dark:bg-[#373D37]"
                }`}
              />
              <span className="text-[#373D37]  font-normal  md:text-[1rem]  dark:text-[#F1FFED]">
                آسان پرداخت
              </span>
            </div>

            <div
              className="flex flex-row items-center justify-start gap-4 cursor-pointer"
              onClick={() => setSelected("snap")}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border border-[#373D37] dark:border-[#F5F5F5] ${
                  selected === "snap"
                    ? "bg-[#373D37] dark:bg-[#F5F5F5]"
                    : "bg-[#F5F5F5] dark:bg-[#373D37]"
                }`}
              />
              <span className="text-[#373D37]  text-right font-normal text-lg md:text-[1rem]  dark:text-[#F1FFED]">
                اسنپ پی
              </span>
            </div>
          </div>

          <div className="w-full max-w-[600px] mx-auto md:ml-auto mt-5 bg-[#F5F5F5] dark:bg-[#1B202C] rounded-lg p-4 px-6 ">
            <h2 className="text-[#373D37] dark:text-[#F1FFED]  text-[.9rem] md:text-[1rem] font-bold leading-[28px] text-right mb-2">
              کد تخفیف دارید؟
            </h2>

            <div className="flex  gap-4 md:gap-[15px] items-center">
              <input
                type="text"
                placeholder="کد تخفیف را وارد کنید"
                className="w-full md:w-[580px] pr-5 h-[50px] md:h-[47px] dark:text-black bg-[#E1E1E1] dark:bg-[#E6E4E4] rounded-lg placeholder:text-[.9rem] text-right text-sm md:text-base outline-none"
              />
              <IoBagCheck
                title="اعمال"
                className="bg-green-600 text-white w-[3rem] h-[2.5rem] p-[.5rem] cursor-pointer rounded-md "
              />
            </div>
          </div>

          <div className="order-4 col-span-1 md:col-span-2 md:col-start-2 mt-8 w-full max-w-[600px] mx-auto md:ml-auto space-y-6 ">
            <h2 className="text-xl text-gray-800 dark:text-[#F5F5F5] text-right">
              شاید این پروژه‌ها برای شما مفید باشد:
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 msm:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
              <ProjectItem
                id={1}
                img="/images/project1.png"
                username="Kamraan"
              />
              <ProjectItem id={2} img="/images/project2.png" username="Amin" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
