import React from "react";

export default function Loader() {
  return (
    <div className="w-full h-screen bg-white dark:bg-dark flex items-center justify-center flex-col gap-2">
      <p className="loader bg-primary !size-[2.5rem]"></p>
      <p className="text-black dark:text-white">در حال بارگذاری</p>
    </div>
  );
}
