import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../components/Loader";

export default function Skills() {
  const [isOpen, setIsOpen] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [skill, setSkill] = useState("");
  const [percentage, setPercentage] = useState("");
  const [skills, setSkills] = useState(null);

  // 📌 گرفتن لیست مهارت‌ها از API
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchSkills = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/skills", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log("API response:", data);

        // همیشه آرایه بریزیم
        if (res.ok) {
          if (Array.isArray(data)) setSkills(data);
          else if (Array.isArray(data.data)) setSkills(data.data);
          else if (Array.isArray(data.skills)) setSkills(data.skills);
          else setSkills([]); // fallback
        }
      } catch (err) {
        console.error("مشکل در اتصال به سرور:", err);
      }
    };

    fetchSkills();
  }, []);

  // 📌 ارسال مهارت جدید به API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

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
        // اضافه کردن به لیست فعلی
        setSkills((prev) => [...prev, { skill, percentage }]);

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
              <div className="mt-6 grid grid-cols-3 gap-5">
                {!skills ? (
                  <p className="text-gray-500 text-sm text-center">
                    هنوز مهارتی اضافه نکرده‌اید.
                  </p>
                ) : (
                  Array.isArray(skills) &&
                  skills.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-gray-100 rounded-xl shadow flex justify-between items-center"
                    >
                      <span className="font-medium">{item.skill}</span>
                      <div className="flex items-center gap-2">
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
