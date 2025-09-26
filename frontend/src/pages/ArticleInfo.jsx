import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt, FaRegEye } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { MdChevronLeft } from "react-icons/md";

import { useParams,Link } from "react-router-dom";

export default function ArticleInfo() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [mainArticle, setMainArticle] = useState(null);

  useEffect(() => {
  const fetchArticles = async () => {
    try {
      const artRes = await fetch("http://127.0.0.1:8000/api/articles/show");
      const artJson = await artRes.json();
      setArticles(artJson || []);

      const foundArticle = (artJson || []).find(
        (article) => String(article.id) === String(id)
      );

      setMainArticle(foundArticle || null);
    } catch (error) {
      console.error("خطا در گرفتن مقالات:", error);
    }
  };

  if (id) fetchArticles();
}, [id]);

  return (
    <div className="bg-white dark:bg-dark pt-10">
      <div className="container mx-auto grid gap-3 grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 bg-white dark:bg-dark ">
        {mainArticle &&(
 <div className="xl:col-span-3 lg:col-span-3 col-span-4 p-5 dark:shadow-none shadow-[0_3px_15px_5px_rgba(0,0,0,0.1)] rounded-xl bg-white/2 ">
 <div className="flex items-center gap-2 mb-5 text-[.8rem] w-[50rem] text-dark dark:text-white ">
   <Link>خانه</Link> <MdChevronLeft />
   <Link>توسعه دهنده ها </Link>
   <MdChevronLeft />
   <Link>مقالات</Link> <MdChevronLeft />
   <Link>مدیریت و محافظت از شبکه های کامپیوتری</Link>
 </div>
 <hr />
 <h1 className="mt-5 mb-10 text text-[1.2rem] text-dark dark:text-white ">
 {mainArticle.title}
 </h1>
 <div className="flex items-center justify-between text-[.8rem] text-dark dark:text-white/50 " >
   <div className="flex items-center gap-2">
     <FaRegCalendarAlt />
     <p>3 اردیبهشت 1404</p>
   </div>
   <div className="flex items-center gap-3 *:flex *:items-center *:gap-2">
     <div>
       <IoTimeOutline />
       <p>{mainArticle.reading_time}</p>
     </div>
     <span> | </span>
     <div>
       <FaRegEye />
       <p>135</p>
     </div>
   </div>
 </div>
 <img
   src={mainArticle.image}
   alt={mainArticle.title}
   className="w-full mt-3 rounded-lg"
 />
 <p className="mt-2 leading-[2rem] text-dark dark:text-white/60 text-justify ">
 {mainArticle.description}
 </p>
</div>

        )}

        <div className="sticky top-0 *:mb-3 xl:col-span-1 lg:col-span-1 col-span-4">
          <div className="shadow-[0_3px_15px_5px_rgba(0,0,0,0.1)] p-3 rounded-xl bg-white/2">
            <p className="text-dark dark:text-white ">پر بازدید ترین</p>
            <div className="mt-4 *:mb-5 text-dark dark:text-white/60 ">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="flex items-center rounded-lg gap-2"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-[7rem] rounded-md"
                  />
                  <div className="text-[.8rem]">
                    <p className="line-clamp-2">{art.title}</p>
                    <p className="text-[.6rem] mt-1">31 فروردین 1404</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="shadow-[0_3px_15px_5px_rgba(0,0,0,0.1)] p-3 rounded-xl bg-white/2">
            <p className="text-dark dark:text-white ">جدید ترین ها</p>
            <div className="mt-4 *:mb-5 text-dark dark:text-white/60 ">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="flex items-center rounded-lg gap-2"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-[7rem] rounded-md"
                  />
                  <div className="text-[.8rem]">
                    <p className="line-clamp-2">{art.title}</p>
                    <p className="text-[.6rem] mt-1">31 فروردین 1404</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
