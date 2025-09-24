import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptySaves() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center mt-5 bg-white rounded-2xl p-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <Bookmark size={40} className="text-primary" />
      </div>
      <h2 className="text-lg font-bold text-gray-800 mb-2">
        شما فعلاً پروژه‌ای ذخیره نکرده‌اید
      </h2>
      <p className="text-gray-500 text-sm mb-5 max-w-sm">
        برای ذخیره کردن پروژه‌ها، کافیست روی دکمه ذخیره در صفحه هر پروژه کلیک کنید تا بعداً به راحتی بهشون دسترسی داشته باشید.
      </p>
      <motion.div
        href="/projects"
        className="px-6 py-2 bg-primary text-white rounded-xl shadow-md hover:bg-primary transition"
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/projects">مشاهده پروژه‌ها</Link>
      </motion.div>
    </motion.div>
  );
}
