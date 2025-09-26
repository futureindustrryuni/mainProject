import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaRegEye } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdChevronLeft } from "react-icons/md";

import { useParams, Link } from "react-router-dom";
import JalaliDate from "../components/JalaliDate";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ArticleInfo() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [mainArticle, setMainArticle] = useState(null);
  const [popularArticles, setPopularArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const API_PATH = "http://127.0.0.1:8000";

useEffect(() => {
  const fetchArticleInfo = async () => {
    try {
      // گرفتن مقاله فعلی
      const res = await fetch(`http://127.0.0.1:8000/api/articles/show/${id}`);
      const data = await res.json();
      setMainArticle(data);

      // گرفتن کل مقالات برای سایدبار
      const allRes = await fetch("http://127.0.0.1:8000/api/articles/show");
      const allData = await allRes.json();

      // پر بازدیدترین
      const sortedByViews = [...allData].sort((a, b) => b.views - a.views);
      setPopularArticles(sortedByViews.slice(0, 5));

      // جدیدترین
      const sortedByDate = [...allData].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setLatestArticles(sortedByDate.slice(0, 5));
    } catch (error) {
      console.error("خطا در گرفتن مقاله:", error);
    }
  };

  if (id) fetchArticleInfo();
}, [id]);


  if (!mainArticle) {
    return <Loader />;
  }

  return (
    <div className="bg-white dark:bg-dark pt-10">
      <Header />
      <div className="container mx-auto grid gap-3 grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 bg-white dark:bg-dark my-20">
        {/* مقاله اصلی */}
        <div className="xl:col-span-3 lg:col-span-3 col-span-4 p-5 shadow-[0_3px_15px_5px_rgba(0,0,0,0.1)] rounded-xl bg-white/2 dark:shadow-none">
          <div className="flex items-center gap-2 mb-5 text-[.8rem] w-[50rem] text-dark dark:text-white ">
            <Link to="/">خانه</Link> <MdChevronLeft />
            <Link to="/weblog">مقالات</Link> <MdChevronLeft />
            <Link to={`/articleInfo/${id}`}>{mainArticle.title}</Link>
          </div>
          <hr />
          <h1 className="mt-5 mb-10 text text-[1.2rem] text-dark dark:text-white ">
            {mainArticle.title}
          </h1>
          <div className="flex items-center justify-between text-[.8rem] text-dark dark:text-white/50 ">
            <div className="flex items-center gap-2">
              <FaRegCalendarAlt />
              <p>
                <JalaliDate gregorianDate={mainArticle.created_at} />
              </p>
            </div>
            <div className="flex items-center gap-3 *:flex *:items-center *:gap-2">
              <div>
                <IoTimeOutline />
                <p>{mainArticle.reading_time}</p>
              </div>
              <span> | </span>
              <div>
                <FaRegEye />
                <p>{mainArticle.views}</p>
              </div>
            </div>
          </div>
          <img
            src={`${API_PATH}/storage/${mainArticle.image}`}
            alt={mainArticle.title}
            className="w-full mt-3 rounded-lg"
          />
          <p className="mt-2 leading-[2rem] text-dark dark:text-white/60 text-justify ">
            {mainArticle.description}
          </p>
        </div>

        {/* سایدبار */}
        <div className="sticky top-0 *:mb-3 xl:col-span-1 lg:col-span-1 col-span-4">
          {/* پر بازدیدترین */}
          <div className="shadow-[0_3px_15px_5px_rgba(0,0,0,0.1)] p-3 rounded-xl bg-white/2">
            <p className="text-dark dark:text-white ">پر بازدیدترین</p>
            <div className="mt-4 *:mb-5 text-dark dark:text-white/60 ">
              {popularArticles.map((art) => (
                <Link
                  to={`/articleInfo/${art.id}`}
                  key={art.id}
                  className="flex items-center rounded-lg gap-2"
                >
                  <img
                    src={`${API_PATH}/storage/${art.image}`}
                    alt={art.title}
                    className="w-[7rem] rounded-md"
                  />
                  <div className="text-[.8rem]">
                    <p className="line-clamp-2">{art.title}</p>
                    <p className="text-[.6rem] mt-1">
                      <JalaliDate gregorianDate={art.created_at} />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* جدیدترین‌ها */}
          <div className="shadow-[0_3px_15px_5px_rgba(0,0,0,0.1)] p-3 rounded-xl bg-white/2">
            <p className="text-dark dark:text-white ">جدیدترین‌ها</p>
            <div className="mt-4 *:mb-5 text-dark dark:text-white/60 ">
              {latestArticles.map((art) => (
                <Link
                  to={`/articleInfo/${art.id}`}
                  key={art.id}
                  className="flex items-center rounded-lg gap-2"
                >
                  <img
                    src={`${API_PATH}/storage/${art.image}`}
                    alt={art.title}
                    className="w-[7rem] rounded-md"
                  />
                  <div className="text-[.8rem]">
                    <p className="line-clamp-2">{art.title}</p>
                    <p className="text-[.6rem] mt-1">
                      <JalaliDate gregorianDate={art.created_at} />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
