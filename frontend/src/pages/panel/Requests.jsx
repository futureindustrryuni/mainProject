import React, { useState } from "react";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

export default function Requests() {
  const [isOpen, setIsOpen] = useState(1);

  return (
    <>
      <div className="flex">
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={`${
            isOpen ? "w-[100%] lg:w-[80%] xl:w-[83%] " : "w-[100%]"
          } `}
        >
          <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="p-5">
            {/*کداتو اینجا بزن*/}
            <p>Requests</p>
          </div>
        </div>
      </div>
    </>
  );
}
