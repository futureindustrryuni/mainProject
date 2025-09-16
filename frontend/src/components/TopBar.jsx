import React from 'react'
import { HiMenu } from "react-icons/hi";
import { LuBadgeCheck } from "react-icons/lu";

export default function TopBar({ isOpen, setIsOpen }) {
    return (
        <div className="h-[6rem] flex items-center gap-5 p-5 bg-white dark:bg-dark">
            <HiMenu onClick={() => setIsOpen(!isOpen)} className="bg-zinc-200 dark:bg-zinc-800 dark:text-white p-1 rounded-lg text-[2rem] cursor-pointer hover:scale-110 duration-150 " />
            <div className="flex items-center gap-3 ">
                <img src="/images/team3.jpg" alt="" className="size-[3.5rem] rounded-full object-cover " />
                <div>
                    <div className="flex items-center gap-3 ">
                        <p className='dark:text-white text-black'>Mamad2091</p>
                        <div className="flex items-center gap-1 bg-primary/20 rounded-lg px-3 p-1">
                            <LuBadgeCheck className="text-[.9rem] text-primary" />
                            <p className="text-[.7rem] text-primary">برنامه نویس</p>
                        </div>
                    </div>
                    <p className="text-[.9rem] text-zinc-500 ">example@gmail.com</p>
                </div>
            </div>
        </div>
    )
}
