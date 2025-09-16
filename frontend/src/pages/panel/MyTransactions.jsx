import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

export default function MyTransactions() {
  const [isOpen, setIsOpen] = useState(1);
  const transactions = [
    {
      id: 0,
      description: "خرید",
      time: "۵ تیر ۱۴۰۳ ساعت 00:38",
      amount: "0",
      status: "درحال انتظار",
    },
  ];
  return (
    <>
      <div className="flex *:h-[100vh] dark:text-white text-black bg-white dark:bg-dark">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={`${
            isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%] " : "w-[100%]"
          } `}
        >
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="p-5">
            {/*کداتو اینجا بزن*/}
            <div className=" mx-auto p-6 font-yekan text-right rounded-xl">
              {/* کیف پول */}
              <div>
                <h3 className="text-[16px] md:text-[22px] leading-7 dark:text-[#ffff]  font-bold mb-[18px]">
                  کیف پول
                </h3>
                <div className="border-[1px] border-[#CDCACA] mb-8 mt-8 w-full "></div>

                <div className="flex gap-2 items-baseline">
                  <p className="text-[16px] lg:text-[22px] leading-7 font-medium dark:text-[#ffff]">
                    موجودی:
                  </p>
                  <p className=" w-[70px] h-[35px] rounded-[8px] text-center  bg-[#E8E8E8] dark:bg-[#242424] text-[12px] md:text-[16px] dark:text-[#AAAAAA] leading-[30px] text-[#5D5D5D] font-extrabold">
                    ۰ تومان
                  </p>
                </div>
              </div>

              {/* تراکنش‌ها */}
              <div className="mt-[90px]">
                <h3 className="text-[14px] md:text-[22px] leading-7 font-medium dark:text-[#ffff]  mb-[20px]">
                  تراکنش‌ها
                </h3>
                {/* عنوان ستون‌ها */}
                <div className="border-[1px] border-[#CDCACA] mb-4  w-full "></div>
                <div className="bg-[#EEEBEB] dark:bg-[#333a4b] rounded-t-lg p-3 py-6 grid grid-cols-6 justify-items-center gap-4 dark:text-[#ffff]  text-[14px] md:text-[20px] leading-7 font-bold text-black">
                  <span>شناسه</span>
                  <span>مبلغ</span>
                  <span className="col-span-2">زمان</span>
                  <span>توضیحات</span>
                  <span>وضعیت</span>
                </div>

                {/* لیست تراکنش‌ها */}
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="w-full bg-[#fff] dark:bg-[#1B202C] shadow-xl shadow-zinc-200/50 dark:shadow-none rounded-b-lg px-6 py-8  grid grid-cols-6 justify-items-center gap-4 dark:text-[#ffff] text-black text-[12px] md:text-[18px]"
                  >
                    <div>{tx.id}</div>
                    <div>{tx.amount} تومان</div>
                    <div className="col-span-2">{tx.time}</div>
                    <div>{tx.description}</div>
                    <div>
                      <p className="bg-[#FBBD08] text-center text-black  px-1.5  md:px-4 py-1 rounded-[8px] md:text-[.9rem]">
                        {tx.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
