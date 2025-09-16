import React, { useState } from 'react'
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';
import { CiEdit } from "react-icons/ci";
import { LiaUserSolid } from "react-icons/lia";
export default function Skills() {
  const [isOpen, setIsOpen] = useState(1)
  return (
    <>
      <div className="flex h-svh bg-white dark:bg-dark  text-black dark:text-white">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className={`${isOpen?"w-[100%] lg:w-[80%] xl:w-[83%] ":"w-[100%]"} `}>
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="p-5">
            {/*کداتو اینجا بزن*/}
            <div className='grid grid-cols-2 bg-white dark:bg-[#1B202C] py-6 px-10 gap-7 rounded-xl sm:gap-y-7 shadow-[0_3px_15px_5px_rgba(0,0,0,0.1)] sm:gap-x-0 sm:grid-cols-[25%_25%_25%25%]'>
               <div className='flex items-center gap-1 sm:col-span-2'>
                <LiaUserSolid className="sm:size-[2.2rem] size-7" />
                <p className=' font-IranYekanBold text-[1rem]'>مهارت فنی</p>
              </div>
              <div className='flex items-center gap-2 sm:col-span-2 text-[.8rem] border w-max justify-self-end px-3 py-1 rounded-lg cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-50/10 '>
                <p className=''>ویرایش</p>
                <CiEdit className="size-[1rem]" />
              </div>
              <p className='sm:border-b-1 border-second-light text-right sm:pb-4'>PYTHON</p>
              <p className="text-second-light text-left sm:text-right sm:border-b-1 sm:border-second-light sm:pb-4">100%</p>
              <p className='sm:border-b-1 border-second-light sm:pb-4'>JAVA SCRIPT</p>
              <p className="text-second-light text-left sm:text-right sm:border-b-1 sm:border-second-light sm:pb-4">75%</p>
              <p className='sm:border-b-1 border-second-light sm:pb-4'>CSS</p>
              <p className="text-second-light text-left sm:text-right sm:border-b-1 sm:border-second-light sm:pb-4">65%</p>
              <p className='sm:border-b-1 border-second-light sm:pb-4'>NEXT JS</p>
              <p className="text-second-light text-left sm:text-right sm:border-b-1 sm:border-second-light sm:pb-4">47%</p>
              <p className='sm:border-b-1 border-second-light sm:pb-4'>ERACT</p>
              <p className="text-second-light text-left sm:text-right sm:border-b-1 sm:border-second-light sm:pb-4">25%</p>
              <p className='sm:border-b-1 border-second-light sm:pb-4'>JQUERY</p>
              <p className="text-second-light text-left sm:text-right sm:border-b-1 sm:border-second-light sm:pb-4">50%</p>
              <p className='sm:border-b-1 border-second-light sm:pb-4'>FIGMA</p>
              <p className="text-second-light text-left sm:text-right sm:border-b-1 sm:border-second-light sm:pb-4">80%</p>
              <p className='sm:border-b-1 border-second-light sm:pb-4'>MY SQL</p>
              <p className="text-second-light text-left sm:text-right sm:border-b-1 sm:border-second-light sm:pb-4">90%</p>
              <p className='sm:border-b-1 border-second-light sm:pb-4'>HTML</p>
              <p className="text-second-light text-left sm:text-right sm:border-b-1 sm:border-second-light sm:pb-4">95%</p>
              <p className='sm:border-b-1 border-second-light sm:pb-4'>C++</p>
              <p className="text-second-light text-left sm:text-right sm:border-b-1 sm:border-second-light sm:pb-4">45%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
