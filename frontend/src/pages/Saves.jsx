import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import ProjectItem from "../components/ProjectItem";

export default function Saves() {
  let [isOpen, setIsOpen] = useState(0);
  let [savedItems, setSavedItems] = useState([
    { id: 1, name: "001", discripthion: "text", image: "/images/proje1.png" },
  ]);
  let navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-dark ">
      <div className="h-screen container mx-auto">
        {savedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen text-center ">
            <div className="flex flex-col items-center gap-[20px] *:text-white">
              <FiPlus className="text-[80px]" />
              <p>شما هنوز هیچ پروژه ای ذخیره نکرده‌اید !</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="justify-start py-3 mb-1">
              <button className="flex items-right gap-2 dark:text-white text-black px-4 py-2">
                <FaRegBookmark className="text-lg" />
                ذخیره‌شده‌ها
              </button>
            </div>

            <hr className="dark:text-white/50 text-black p-3" />
            <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5 ">
              <ProjectItem
                id={1}
                img="/images/project1.png"
                username="Kamraan"
              />
              <ProjectItem id={2} img="/images/project2.png" username="Amin" />
              <ProjectItem id={3} img="/images/project3.png" username="Sara" />
              <ProjectItem
                id={4}
                img="/images/project4.png"
                username="Sohrab"
              />
              <ProjectItem
                id={1}
                img="/images/project5.png"
                username="Kamraan"
              />
              <ProjectItem id={2} img="/images/project6.png" username="Amin" />
              <ProjectItem id={3} img="/images/project7.png" username="Sara" />
              <ProjectItem
                id={4}
                img="/images/project8.png"
                username="Sohrab"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
