import React, { useEffect, useState } from "react";
import ArticleItem from "../components/ArticleItem";
import Header from "../components/Header";


export default function MoreArticles() {
 const [article, setArticle] = useState([]);

 const [categories, setCategories] = useState([]);

 useEffect(() => {
   const fetchData = async () => {
     const catRes = await fetch("http://127.0.0.1:8000/api/categories");
     const catJson = await catRes.json();
     setCategories(catJson.data || []);
  
   
     const artRes = await fetch("http://127.0.0.1:8000/api/articles");
     const artJson = await artRes.json();
 
     setArticle(artJson.data || []);
     console.log("Articles:", article);
   };
 
   fetchData();
 }, []);
 

  return (
    <div className="bg-white dark:bg-dark">
       {/* header */}
       <Header />
      <div className="p-3 container mx-auto mt-30">
      {categories.map((cat) => (
  <div key={cat.id}>
    <h2>{cat.name}</h2>
    <div className="grid">
      {article.filter((a) => a.category_id == cat.id) 
        .map((art) => (
          <ArticleItem
            key={art.id}
            title={art.title}
            description={art.description}
            category={cat.name}
            image={art.image}
            readingTime={art.reading_time}
          />
        ))}
    </div>
  </div>
))}

        </div>
      </div>
   
  );
}
