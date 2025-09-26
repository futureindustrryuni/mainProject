import React, { useEffect, useState } from "react";
import ArticleItem from "../components/ArticleItem";
import Header from "../components/Header";

export default function MoreArticles() {
  const [article, setArticle] = useState([]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await fetch("http://127.0.0.1:8000/api/categories/show");
      const catJson = await catRes.json();
      setCategories(catJson || []);

      const artRes = await fetch("http://127.0.0.1:8000/api/articles/show");
      const artJson = await artRes.json();

      setArticle(artJson || []);
      console.log("Articles:", article);
    };

    fetchData();
  }, []);
 
  
  return (

    <div className="bg-white dark:bg-dark">
      {/* header */}
      <Header />
      <div className="p-3 container mx-auto mt-30">
        {categories.map((cat) => {
          const filtart=article.filter((a)=>Number(a.category_id) === Number(cat.id))
          if(filtart.length === 0) return null;
        return(<div key={cat.id}>
            <h2 className="text-[1.5rem]">{cat.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
              {filtart.map((art) => (
                  <ArticleItem
                    key={art.id}
                    title={art.title}
                    description={art.description}
                    category={cat.name}
                    image={art.image}
                    readingTime={art.reading_time}
                    to={`/ArticleInfo/${art.id}`}
                  />
                ))}
            </div>
          </div>)  
})}
      </div>
    </div>
  );
}
