import { motion } from "framer-motion";
import { CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import JalaliDate from "./JalaliDate";
// import JalaliDate from "../../components/JalaliDate";


export default function ResumeStatusBox({ status, fileName, created_at }){
  // کانفیگ استایل وضعیت‌ها
  const statusConfig = {
    approved: {
      text: "تایید شده",
      gradient: "from-green-400 to-green-600",
      icon: <CheckCircle className="size-10 text-green-600" />,
      adminNote:
        "تبریک میگم، رزومه شما تایید شد از حالا میتونین پروژه هاتون رو ایجاد کنید.",
    },
    rejected: {
      text: "رد شده",
      gradient: "from-red-400 to-red-600",
      icon: <XCircle className="size-10 text-red-600" />,
      adminNote:
        "متاسفانه رزومه شما رد شد، تسلیم نشو و همچنان روی مهارت هات کار کن.",
    },
    pending: {
      text: "در انتظار بررسی",
      gradient: "from-yellow-400 to-yellow-600",
      icon: <Clock className="size-10 text-yellow-600" />,
      adminNote: "رزومه شما در حال بررسی است، نتیجه به زودی اعلام میشود.",
    },
  };

  const current = statusConfig[status] || statusConfig.pending;

  return (
    <motion.div
      className="w-full relative overflow-hidden rounded-3xl shadow-2xl border border-gray-200 bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* هدر رنگی */}
      <div
        className={`h-24 bg-gradient-to-r ${current.gradient} flex items-center justify-center`}
      >
        <div className="flex flex-col items-center text-white">
          {current.icon}
          <h2 className="mt-2 font-bold text-xl">{current.text}</h2>
        </div>
      </div>

      {/* محتوای کارت */}
      <div className="p-6 space-y-2">
        <div className="flex items-center gap-3">
          <FileText className="size-6 text-purple-600" />
          <p className="text-gray-700 font-medium">
            <span className="font-bold">نام فایل : </span> {fileName}
          </p>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-lg">📅</span>
          <p className="text-gray-700 font-medium">
            <span className="font-bold">تاریخ ارسال : </span>
            {<JalaliDate gregorianDate={created_at} />}
          </p>
        </div>

        <motion.div
          className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-purple-700 text-sm leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <strong>📝 یادداشت مدیر:</strong> {current.adminNote}
        </motion.div>
      </div>
    </motion.div>
  );
};
