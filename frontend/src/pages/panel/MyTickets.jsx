import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { Toast } from "../../components/Toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  Hourglass,
  XCircle,
} from "lucide-react";
import Loader from "../../components/Loader";
import JalaliDate from "../../components/JalaliDate";



const categories = [
  {
    id: 1,
    title: "پرداخت و فاکتور",
    desc: "مشکلات در پرداخت بازگشت وجه و پیگیری فاکتورها",
    icon: "/icons/Rectangle1.svg",
    content:
      "اگر پرداخت شما ناموفق بوده یا نیاز به پیگیری فاکتور دارید، می‌توانید وضعیت پرداخت را از بخش حساب کاربری بررسی کنید. در صورت بروز مشکل با پشتیبانی تماس بگیرید.",
  },
  {
    id: 2,
    title: "دانلود و دسترسی",
    desc: "مشکلات مربوط به دانلود فایل‌ها و دسترسی به دوره‌ها",
    icon: "/icons/Rectangle2.svg",
    content:
      "گاهی اوقات لینک‌های دانلود ممکن است منقضی شوند یا فایل‌ها ناقص دانلود شوند. مطمئن شوید اینترنت پایدار دارید. اگر همچنان مشکل داشتید، تیکت ارسال کنید.",
  },
  {
    id: 3,
    title: "حساب کاربری",
    desc: "مشکلات ورود، ثبت‌نام یا تغییر اطلاعات حساب",
    icon: "/icons/Rectangle3.svg",
    content:
      "برای تغییر رمز عبور یا بازیابی حساب، به بخش تنظیمات حساب مراجعه کنید. در صورتی که به ایمیل خود دسترسی ندارید، با تیم پشتیبانی در ارتباط باشید.",
  },
  {
    id: 4,
    title: "کیفیت پروژه‌ها",
    desc: "سؤالات و مشکلات مربوط به کیفیت محتوای آموزشی",
    icon: "/icons/Rectangle4.svg",
    content:
      "ما همیشه تلاش می‌کنیم کیفیت آموزش‌ها بالا باشد. اگر کیفیت پروژه‌ای مناسب نبود، لطفاً بازخورد بدهید تا تیم بررسی کرده و اصلاحات لازم را اعمال کند.",
  },
  {
    id: 5,
    title: "ارتباط با پشتیبان",
    desc: "گفتگو و تماس با تیم پشتیبانی",
    icon: "/icons/Rectangle5.svg",
    content:
      "پشتیبان‌ها آماده پاسخگویی به مشکلات شما هستند. می‌توانید از بخش ارسال تیکت یا چت آنلاین با ما در تماس باشید.",
  },
  {
    id: 6,
    title: "گزارش پیشرفت",
    desc: "دنبال کردن میزان پیشرفت در دوره‌ها",
    icon: "/icons/Rectangle6.svg",
    content:
      "در پروفایل شما بخش گزارش پیشرفت وجود دارد که درصد یادگیری دروس و پروژه‌ها را نشان می‌دهد. اگر اختلافی دیدید، از طریق پشتیبانی اطلاع دهید.",
  },
  {
    id: 7,
    title: "درخواست سفارشی",
    desc: "سفارش پروژه یا خدمات اختصاصی",
    icon: "/icons/Rectangle7.svg",
    content:
      "می‌توانید پروژه یا آموزش اختصاصی مدنظر خود را ثبت کنید. تیم ما آن را بررسی کرده و در سریع‌ترین زمان ممکن با شما در تماس خواهد بود.",
  },
  {
    id: 8,
    title: "قوانین و امنیت",
    desc: "اطلاعات مربوط به قوانین سایت و امنیت حساب",
    icon: "/icons/Rectangle8.svg",
    content:
      "برای حفظ امنیت حساب خود از رمز عبور قوی استفاده کنید و اطلاعات ورود را در اختیار کسی قرار ندهید. همچنین قوانین استفاده از سایت در بخش قوانین موجود است.",
  },
];

const ticketSubjects = [
  { value: "0", label: "انتخاب کنید" },
  { value: "پرداخت و فاکتور", label: "پرداخت و فاکتور" },
  { value: "دانلود و دسترسی", label: "دانلود و دسترسی" },
  { value: "حساب کاربری", label: "حساب کاربری" },
  { value: "کیفیت پروژه‌ها", label: "کیفیت پروژه‌ها" },
  { value: "ارتباط با پشتیبان", label: "ارتباط با پشتیبان" },
  { value: "گزارش پیشرفت", label: "گزارش پیشرفت" },
  { value: "درخواست سفارشی", label: "درخواست سفارشی" },
  { value: "قوانین و امنیت", label: "قوانین و امنیت" },
];


export default function MyTickets() {
  const [isOpen, setIsOpen] = useState(1);
  const [sendTicket, setSendTicket] = useState(0);
  const [ticket, setTicket] = useState({ subject: "", text: "" });
  const [activeBox, setActiveBox] = useState(null);
  const [myTicketsList, setMyTicketsList] = useState(null);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value,
    });
    console.log(ticket);
  };

  async function sendTicketHandler(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/tickets/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ticket),
      });

      const data = await res.json();
      showTickets();
      setTicket({ subject: "", text: "" });
      Toast.fire({
        icon: "success",
        title: "تیکت شما با موفقیت ارسال شد",
      });
      console.log(data);
    } catch (error) {
      console.log("err : ", error);
    }
  }

  //show my tickets
  function showTickets() {
    fetch("http://127.0.0.1:8000/api/tickets/show", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMyTicketsList(data.data);
      });
  }

  useEffect(() => {
    showTickets();
  }, []);

  if (!myTicketsList) return <Loader />;

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

                <AnimatePresence mode="wait">
                  {activeBox === null ? (
                    // 🔹 حالت نمایش ۸ باکس
                    <motion.ul
                      key="grid"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="grid gap-3 mt-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 
                       *:h-[12rem] md:*:h-[15rem] *:rounded-xl 
                       *:flex *:items-center *:justify-center 
                       *:flex-col *:text-center *:px-3 
                       *:cursor-pointer *:duration-200"
                    >
                      {categories.map((cat) => (
                        <li
                          key={cat.id}
                          onClick={() => setActiveBox(cat)}
                          className="dark:bg-white/5 bg-zinc-100/70 border border-zinc-200 dark:border-0 hover:bg-zinc-200/50"
                        >
                          <img src={cat.icon} alt={cat.title} />
                          <p className="text-[1rem] md:text-[1.2rem] mt-4">
                            {cat.title}
                          </p>
                          <p className="text-[.8rem] md:text-[.9rem] lg:text-[1rem] text-zinc-500">
                            {cat.desc}
                          </p>
                        </li>
                      ))}
                    </motion.ul>
                  ) : (
                    // 🔹 حالت نمایش جزئیات یک باکس
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.3 }}
                      className="mt-5 p-6 rounded-xl shadow-lg 
                       dark:bg-white/5 bg-zinc-100/70 border border-zinc-200 dark:border-0"
                    >
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={activeBox.icon}
                          alt={activeBox.title}
                          className="size-[5rem]"
                        />
                        <h2 className="text-xl md:text-2xl font-bold mt-4">
                          {activeBox.title}
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-xl">
                          {activeBox.content}
                        </p>
                        <button
                          onClick={() => setActiveBox(null)}
                          className="mt-6 px-6 py-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-lg duration-300"
                        >
                          بازگشت
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                    onClick={() => {
                      setSendTicket(!sendTicket);
                      setTicket({ subject: "", text: "" });
                    }}
                    className={`${
                      sendTicket
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-green-600 hover:bg-green-500"
                    }  duration-300 cursor-pointer px-5 py-2 rounded-lg text-[.8rem] md:text-[.9rem] text-white `}
                  >
                    {sendTicket ? "برگشت" : " ارسال تیکت جدید"}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {sendTicket ? (
                    <motion.div
                      key="ticketForm"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <form onSubmit={sendTicketHandler}>
                        <div className="flex items-stert flex-col gap-3 mt-5">
                          <select
                            name="subject"
                            value={ticket.subject}
                            onChange={handleChange}
                            className="placeholder:text-[.9rem] w-full md:w-[20rem] dark:*:bg-zinc-700 dark:*:text-white p-2 outline-0 rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 dark:bg-white/5"
                          >
                            {ticketSubjects.map((item, idx) => (
                              <option
                                key={idx}
                                value={item.value}
                                className="text-black"
                              >
                                {item.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <textarea
                          name="text"
                          value={ticket.text}
                          onChange={handleChange}
                          rows={5}
                          required
                          placeholder="توضیحی درباره تیکت خودتان بنویسید..."
                          className="placeholder:text-[.9rem] shadow-xl shadow-zinc-200/30 dark:bg-white/5 p-3 outline-0 w-full rounded-lg !border-2 !border-zinc-200/70 dark:!border-zinc-200/20 mt-2"
                        ></textarea>
                        <button
                          type="submit"
                          className="bg-green-600 hover:bg-green-700 mt-2 duration-300 cursor-pointer px-5 py-2 rounded-lg text-[.8rem] md:text-[.9rem] text-white"
                        >
                          ارسال
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.ul
                      key="ticketList"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="grid gap-3 mt-5 grid-cols-2 *:h-[12rem] sm:grid-cols-2 lg:grid-cols-4 md:*:h-[15rem] *:rounded-xl *:flex *:items-center *:justify-center *:flex-col *:text-center *:px-3"
                    >
                      {/* همون li ها سر جاش */}
                      <li className=" dark:bg-gray-500/30 bg-zinc-100/70 dark:shadow-none shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 dark:border-gray-600">
                        <FileText className="bg-gray-500/50 border-2 border-gray-500 p-3 size-[4rem] rounded-lg text-[3rem] mb-3" />
                        <p className="text-[.9rem] md:text-[1rem]">
                          همه تیکت ها
                        </p>
                        <p className="text-zinc-400 text-[.8rem] md:text-[.9rem] ">
                          {myTicketsList.length} مورد
                        </p>
                      </li>
                      <li className=" dark:bg-gray-500/30 bg-zinc-100/70 dark:shadow-none shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 dark:border-gray-600">
                        <XCircle className="bg-red-500/50 border-2 border-red-600 p-3 size-[4rem] rounded-lg text-[3rem] mb-3" />
                        <p className="text-[.9rem] md:text-[1rem]">رد شده</p>
                        <p className="text-zinc-400 text-[.8rem] md:text-[.9rem] ">
                          {
                            myTicketsList.filter(
                              (item) => item.status == "closed"
                            ).length
                          }{" "}
                          مورد
                        </p>
                      </li>
                      <li className=" dark:bg-gray-500/30 bg-zinc-100/70 dark:shadow-none shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 dark:border-gray-600">
                        <CheckCircle2 className="bg-green-500/50 border-2 border-green-600 p-3 size-[4rem] rounded-lg text-[3rem] mb-3" />
                        <p className="text-[.9rem] md:text-[1rem]">
                          پاسخ داده شده
                        </p>
                        <p className="text-zinc-400 text-[.8rem] md:text-[.9rem] ">
                          {
                            myTicketsList.filter(
                              (item) => item.status == "open"
                            ).length
                          }{" "}
                          مورد
                        </p>
                      </li>
                      <li className=" dark:bg-gray-500/30 bg-zinc-100/70 dark:shadow-none shadow-xl shadow-zinc-200/30 border-1 border-zinc-200 dark:border-gray-600">
                        <Hourglass className="bg-yellow-500/50 border-2 border-yellow-600 p-3 size-[4rem] rounded-lg text-[3rem] mb-3" />
                        <p className="text-[.9rem] md:text-[1rem]">
                          در انتظار پاسخ
                        </p>
                        <p className="text-zinc-400 text-[.8rem] md:text-[.9rem] ">
                          {
                            myTicketsList.filter(
                              (item) => item.status == "in_progress"
                            ).length
                          }{" "}
                          مورد
                        </p>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <ul className="mt-5 *:mb-3">
                {myTicketsList.map((item) => (
                  <li
                    className={`relative border-r-7 dark:bg-white/5 ${
                      item.status == "in_progress"
                        ? "!border-r-yellow-500"
                        : item.status == "in_progress"
                        ? "!border-r-green-500"
                        : "!border-r-red-500"
                    } rounded-xl border-2 dark:border-zinc-700 border-zinc-200 p-4 pb-10 `}
                  >
                    <p className="text-[1rem] md:text-[1.2rem]">
                      {item.subject}
                    </p>
                    <p className="text-[.9rem] md:text-[1rem] text-zinc-500 leading-7 text-justify mb-4">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-2 absolute bottom-5 left-5">
                      <p className=" text-[.9rem] text-zinc-400 mt-1">
                        {<JalaliDate gregorianDate={item.created_at} />}
                      </p>
                      <span> | </span>
                      <p className="text-[.9rem]">
                        {item.status == "in_progress"
                          ? "در انتظار پاسخ"
                          : item.status == "open"
                          ? "خوانده شد"
                          : "رد شده"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
