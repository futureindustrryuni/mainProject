// ProjectCard.jsx
import React from "react";

const ProjectCard = ({ imageUrl }) => {
  return (
   
   <div className="w-[170px] h-[192px] mt-4 md:h-[190px]  md:w-[150px] rounded-[15px] flex flex-col  items-center justify-between  sm:w-[190px] sm:h-[230px] xs:w-full xs:h-auto">
    
 <div
      className="w-[150px] h-[180px] md:h-[170px]  md:w-[130px]  bg-cover bg-center outline-[#F5F5F5] dark:outline-[#1B202C] outline-12 rounded-[10px] sm:w-[170px] sm:h-[210px] xs:w-full xs:h-[200px]"
      style={{
         backgroundImage: `url(${imageUrl})` }}
    ></div>
   
    <button className="w-full h-[49px] cursor-pointer bg-[#F5F5F5] dark:bg-[#1B202C] rounded-[10px] mt-6 flex items-center justify-center">
      <span className="text-[#373D37] dark:text-[#F1FFED] leading-[21px] font-medium md:text-[16px]  sm:text-[19px] xs:text-[18px]">
        مشاهده
      </span>
    </button>
  </div>
  );
};

export default ProjectCard;
