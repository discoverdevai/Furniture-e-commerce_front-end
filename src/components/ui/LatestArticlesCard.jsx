import React from "react";
import { useTranslation } from "react-i18next";

export const LatestArticlesCard = ({
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
        className="hidden lg:block group relative rounded-xl  shadow-md w-[282px] h-[211px] transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
        style={{ backgroundColor: "#F2F2F2" }}
      >
        {/* 🔹 Background image */}

        <div
          className={`absolute inset-0 bg-center bg-cover rounded-xl transitions-transform  duration-500 ease-in-out z-0 pointer-events-none group-hover:-translate-y-44  ${
            isArabic ? "group-hover:rotate-12" : "group-hover:-rotate-12"
          } `}
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>

        {/* 🔹 Content overlay */}
        <div className="relative flex flex-col justify-between h-full z-10 p-4 rounded-xl backdrop-blur-[2px] bg-[#F2F2F2]">
          <p
            className="text-[#4F4F4F] text-[10px] font-medium"
            style={{ fontFamily: "Cairo" }}
          >
            {isArabic ? "نشر بتاريخ " : "Published on "}
            {date}
          </p>

          <p
            className="text-[#835F40] font-medium text-lg"
            style={{ fontFamily: "Cairo" }}
          >
            {title}
          </p>

          <p
            className="text-[#4F4F4F] text-sm font-medium "
            style={{ fontFamily: "Cairo" }}
          >
            {description}
          </p>

          <div className="flex items-center gap-2  ">
            <img
              src={authorImage}
              alt={author}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span
              className="text-[10px] text-[#4F4F4F] font-medium"
              style={{ fontFamily: "Cairo" }}
            >
              {author}
            </span>
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div className="block lg:hidden group relative rounded-xl  shadow-md w-[251px] h-[175px] ">
        {/* 🔹 Background image */}

        <div
          className="absolute inset-0 bg-center bg-cover rounded-xl z-0 "
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>

        {/* 🔹 Content overlay */}
        <div className="relative flex flex-col justify-between h-full z-10 p-4 rounded-xl  bg-[#F2F2F2] bg-opacity-55">
          <p
            className="text-[##1A1713] text-[10px] font-medium"
            style={{ fontFamily: "Cairo" }}
          >
            {isArabic ? "نشر بتاريخ " : "Published on "}
            {date}
          </p>

          <p
            className="text-[##1A1713] font-medium text-lg"
            style={{ fontFamily: "Cairo" }}
          >
            {title}
          </p>

          <p
            className="text-[##3C3C3C] text-xs font-medium "
            style={{ fontFamily: "Cairo" }}
          >
            {description}
          </p>

          <div className="flex items-center gap-2  ">
            <img
              src={authorImage}
              alt={author}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span
              className="text-[10px] text-[#1A1713] font-medium"
              style={{ fontFamily: "Cairo" }}
            >
              {author}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
