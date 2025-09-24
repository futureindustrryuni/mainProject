import React from "react";

export default function Loader() {
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center flex-col gap-2">
      <p className="loader bg-primary !size-[2.5rem]"></p>
      <p>در حال بارگذاری</p>
    </div>
  );
}
