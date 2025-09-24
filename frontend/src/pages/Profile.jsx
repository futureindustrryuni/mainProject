import { useEffect, useId, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import SampleCard from "../components/SampleCard";
import header from "/images/Frame 196.png";
import ProjectItem from "../components/ProjectItem";
// import { div } from "framer-motion/client";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("about");

  // user
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(null)
  useEffect(() => {
    const userId = 1;

    fetch(`http://127.0.0.1:8000/api/developer/${userId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => {
      if (!res.ok) {
        throw new Error("خطا در گرفتن اطلاعات")
      }
      return res.json()
    }).then(data => {
      console.log("Data : ", data)
      setUser(data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)

    })
  })

  return (
    <div className="dark:bg-dark h-full">
      <div className=" mx-auto w-[100%] xl:w-[80%] dark:bg-dark">
        <div className="w-full">
          <img src="/images/banner-with-retro-computer-for-print-and-design-illustration-vector.jpg" alt="" className="w-full h-[14rem] object-cover" />
        </div>
        <div className="w-full dark:bg-dark">
          <div className="flex justify-between border-b *:cursor-pointer border-gray-300 lg:justify-end lg:gap-[20%] lg:pl-[10%] dark:bg-gray-800 dark:border-gray-800">
            <button
              className={`px-4 py-5 text-gray-500 ${activeTab === "about" ? "!text-black dark:!text-white" : ""
                } `}
              onClick={() => setActiveTab("about")}
            >
              درباره من
            </button>
            <button
              className={`px-4 py-5 text-gray-500 ${activeTab === "collection" ? "!text-black dark:!text-white" : ""
                } `}
              onClick={() => setActiveTab("collection")}
            >
              کالکشن
            </button>
            <button
              className={`px-4 py-5 text-gray-500 ${activeTab === "portfilio" ? "!text-black dark:!text-white" : ""
                }`}
              onClick={() => setActiveTab("portfilio")}
            >
              نمونه کار
            </button>
          </div>
          <div>
            {activeTab === "about" && (
              <div className="p-6 lg:py-0 lg:grid lg:grid-cols-[20%_75%] lg:gap-10">
                <ProfileCard name={user.name} email={user.email} locaion={user.locaion} date={user.birth_date}/>
                <div className="flex flex-col gap-3 pb-5 mt-10">
                  <p className="text-justify text-2xl dark:text-gray-300">
                    لورم ایپسوم متن ساختگی
                  </p>
                  <p className="text-justify text-gray-500 dark:text-zinc-400 leading-[2rem]">
                    {user.bio}
                  </p>
                  <img src="/images/project1.png" className="rounded-lg" alt="" />
                  <p className="text-justify text-gray-500 dark:text-zinc-400 leading-[2rem]">
                    {user.bio}
                  </p>
                </div>
              </div>
            )}
            {activeTab === "collection" && (
              <div className="p-6 lg:py-0 lg:grid lg:grid-cols-[20%_75%] lg:gap-10">
                <ProfileCard name={user.name} email={user.email} locaion={user.locaion} date={user.birth_date}/>
                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-10">
                  <ProjectItem
                    id={1}
                    img="/images/project1.png"
                    username="Kamraan"
                  />
                  <ProjectItem
                    id={2}
                    img="/images/project2.png"
                    username="Amin"
                  />
                  <ProjectItem
                    id={3}
                    img="/images/project3.png"
                    username="Sara"
                  />
                  <ProjectItem
                    id={4}
                    img="/images/project4.png"
                    username="Sohrab"
                  />
                </div>
              </div>
            )}
            {activeTab === "portfilio" && (
              <div className="p-6 lg:py-0 lg:grid lg:grid-cols-[20%_75%] lg:gap-10 ">
                <ProfileCard name={user.name} email={user.email} locaion={user.locaion} date={user.birth_date} />
                <div className=" className=grid grid-cols-2 gap-[5%] sm:gap-[2%] sm:grid-cols-3"></div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
