import React from "react";
import { useTranslation } from "react-i18next";

export const PopularArticlesCard = ({
  image,
  date,
  title,
  description,
  author,
  authorImage,
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const isArabic = currentLang === "ar";

  return (
    <>
      {/* desktop view */}
      <div
        className="  group relative  rounded-xl  shadow-md w-full h-[120px] lg:h-[213px] "
        style={{ backgroundColor: "#F2F2F2" }}
      >
        {/* 🔹 Content overlay */}
        <div className=" flex flex-col justify-between h-full  p-4 rounded-xl backdrop-blur-[2px] bg-[#F2F2F2]">
          <p
            className="text-[#4F4F4F] text-[8px] md:text-[9px] lg:text-[10px] font-medium"
            style={{ fontFamily: "Cairo" }}
          >
            {isArabic ? "نشر بتاريخ " : "Published on "}
            {date}
          </p>

          <p
            className="text-[#835F40] font-medium text-[12px] md:text-[15px] lg:text-lg"
            style={{ fontFamily: "Cairo" }}
          >
            {title}
          </p>

          <p
            className="text-[#1A1713] lg:text-[#4F4F4F] text-[10px] md:text-[12px] lg:text-sm font-medium "
            style={{ fontFamily: "Cairo" }}
          >
            {description}
          </p>

          <div className="flex items-center gap-2  ">
            <img
              src={authorImage}
              alt={author}
              className="w-4 h-4 lg:w-5 lg:h-5 rounded-full object-cover"
            />
            <span
              className="text-[8px] md:text-[9px] lg:text-[10px] text-[#4F4F4F] font-medium"
              style={{ fontFamily: "Cairo" }}
            >
              {author}
            </span>
          </div>
        </div>
      </div>
      {/* mobile view */}
    </>
  );
};
