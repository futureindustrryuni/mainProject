import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Rich404() {
  return (
    <div
      className={`h-screen flex flex-col items-center justify-center transition-colors duration-700 relative overflow-hidden 
       bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800 text-white" : "bg-gradient-to-br from-white via-gray-100 to-blue-100 text-gray-900"`}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-20">
        {Array.from({ length: 96 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-400/30 dark:border-gray-500/30"
          ></div>
        ))}
      </div>

      {/* Soft colored blobs */}
      <div className="absolute w-96 h-96 bg-[#ff9900]/30 dark:bg-[#ff9900]/15 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-[#ddff99]/30 dark:bg-[#ddff00]/15 rounded-full blur-3xl -bottom-30 -right-30"></div>
      <div className="absolute w-96 h-96 bg-[#ff99bb]/30 dark:bg-[#ff99bb]/15 rounded-full blur-3xl top-1/3 left-1/3"></div>

      {/* Particle elements */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-zinc-300/50 dark:bg-white/20"
          style={{
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        ></div>
      ))}

      {/* 404 text */}
       <h1 className="text-[10rem] -mb-5 Morabba text-black dark:text-white font-extrabold relative select-none tracking-wide drop-shadow-lg">
        <span className="inline-block animate-[wave1_4s_ease-in-out_infinite]">4</span>
        <span className="inline-block animate-[wave2_4s_ease-in-out_infinite]">0</span>
        <span className="inline-block animate-[wave1_4s_ease-in-out_infinite]">4</span>
      </h1>

      {/* Subtitle */}
      <p className="text-2xl Morabba text-center max-w-xl text-black dark:text-white">
        اوه! صفحه‌ای که دنبالش هستی پیدا نشد. ممکن است لینک منقضی شده باشد یا به
        اشتباه تایپ شده باشد.
      </p>

      {/* Footer note */}
      <p className="mt-5 Morabba text-lg text-center max-w-lg text-black dark:text-gray-400">
        اگر فکر می‌کنید این یک خطای سایت است، لطفاً با پشتیبانی تماس بگیرید.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 z-10">
        <Link
          to="/"
          className="py-4 Morabba px-8 rounded-2xl text-[1rem] bg-gradient-to-r bg-primary text-white font-semibold shadow-lg hover:scale-105 transform transition duration-300"
        >
          بازگشت به خانه
        </Link>
      </div>

      <style>{`
         @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -5px); }
          50% { transform: translate(-10px, 5px); }
          75% { transform: translate(5px, -10px); }
        }
        @keyframes wave1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(-5deg); }
          50% { transform: translateY(10px) rotate(5deg); }
          75% { transform: translateY(-10px) rotate(-3deg); }
        }
        @keyframes wave2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(10px) rotate(3deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(15px) rotate(5deg); }
        }
        @keyframes particle-0 { 0% { transform: translate(0,0); } 100% { transform: translate(15px, -15px); } }
        @keyframes particle-1 { 0% { transform: translate(0,0); } 100% { transform: translate(-15px, 10px); } }
        @keyframes particle-2 { 0% { transform: translate(0,0); } 100% { transform: translate(10px, 20px); } }
        @keyframes particle-3 { 0% { transform: translate(0,0); } 100% { transform: translate(-10px, -20px); } }
        @keyframes particle-4 { 0% { transform: translate(0,0); } 100% { transform: translate(20px, -10px); } }
      `}</style>
    </div>
  );
}
