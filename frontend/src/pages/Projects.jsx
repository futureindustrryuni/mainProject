import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import ProjectItem from "../components/ProjectItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

// ساختن 40 پروژه تستی

export default function Projects() {
    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(16);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
      const token = localStorage.getItem("token");
    const filteredProjects = projects.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleShowMore = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleCount((prev) =>
                prev + 16 <= filteredProjects.length ? prev + 16 : filteredProjects.length
            );
            setLoading(false);
        }, 1000); // ⏳ شبیه‌سازی تاخیر سرور (1 ثانیه)
    };
    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const res = await fetch("http://127.0.0.1:8000/api/products");
            const json = await res.json();
            console.log("دیتا از API:", json);
      
            setProjects(json.data || []);
          } catch (error) {
            console.error("خطا تو گرفتن دیتا:", error);
          }
        };
      
        fetchProjects();
      }, []);
      

if(!projects.length || !token){
    return <Loader/>
  }


    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
            {/* 🔥 هیرو سکشن */}
            {/*Header*/}
            <Header />
            <section className="relative h-[80vh] bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white py-24 px-6 text-center overflow-hidden">
                {/* موج پس‌زمینه */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
                    <svg
                        className="relative block w-full h-20"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        viewBox="0 0 1200 120"
                    >
                        <path
                            d="M321.39,56.44C161.55,79.27,0,120,0,120V0H1200V27.35c-71.5,21.26-210.94,38.46-373.62,43.09C665.31,75.14,482.23,33.61,321.39,56.44Z"
                            className="fill-white"
                        ></path>
                    </svg>
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-extrabold mb-4 mt-15 drop-shadow-lg"
                >
                    آینده‌ی تحصیل خودت رو بساز 🚀
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-lg md:text-xl max-w-2xl mx-auto text-white/90"
                >
                    پروژه‌های آماده، تست‌شده و حرفه‌ای برای دانشجویان.
                    همین حالا شروع کن و بهترین پروژه‌ها رو انتخاب کن!
                </motion.p>

                {/* سرچ */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-10 flex justify-center"
                >
                    <div className="flex items-center gap-2 bg-white text-black rounded-2xl px-4 py-3 w-full max-w-lg shadow-2xl">
                        <Search className="text-gray-400" size={22} />
                        <input
                            type="text"
                            placeholder="جستجوی پروژه..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full outline-none text-lg"
                        />
                    </div>
                </motion.div>

                {/* فیلتر موضوعی */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex justify-center gap-3 mt-8 flex-wrap"
                >
                    {["وب", "موبایل", "هوش مصنوعی", "سخت‌افزار", "پایگاه داده"].map(
                        (tag) => (
                            <button
                                key={tag}
                                className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-full text-sm md:text-base font-medium shadow-sm backdrop-blur-md transition"
                            >
                                {tag}
                            </button>
                        )
                    )}
                </motion.div>
            </section>

            {/* 🔥 لیست پروژه‌ها */}
            <section className="p-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    {filteredProjects.slice(0, visibleCount).map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <ProjectItem id={project.id} title={project.title} user_id={project.user_id} img={project.img} />
                        </motion.div>
                    ))}
                </div>

                {/* دکمه نمایش بیشتر با لودینگ */}
                {visibleCount < filteredProjects.length && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleShowMore}
                            disabled={loading}
                            className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    در حال بارگذاری...
                                </>
                            ) : (
                                "نمایش پروژه‌های بیشتر"
                            )}
                        </button>
                    </div>
                )}
            </section>
             <Footer/>
        </div>
    );
}
