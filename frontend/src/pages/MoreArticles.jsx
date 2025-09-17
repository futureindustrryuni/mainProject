import React from "react";
import ArticleItem from "../components/ArticleItem";
import Header from "../components/Header";

export default function MoreArticles() {
  return (
    <div className="bg-white dark:bg-dark">
       {/* header */}
       <Header />
      <div className="p-3 container mx-auto mt-30">
        <p className="mb-5 text-[1rem] md:text-[1.3rem] text-center text-dark dark:text-white ">
          بازی سازی
        </p>
        <hr className="text-dark dark:text-white/50" />
        <div className="bg-white dark:bg-dark grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 mt-5">
          <ArticleItem id={1} />
          <ArticleItem id={2} />
          <ArticleItem id={3} />
          <ArticleItem id={4} />
          <ArticleItem id={5} />
          <ArticleItem id={6} />
          <ArticleItem id={7} />
          <ArticleItem id={8} />
        </div>
      </div>
    </div>
  );
}
