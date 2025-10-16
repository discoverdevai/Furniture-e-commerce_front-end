// HeroSection.tsx
import { AppNavbar } from "../../../../components/Navbar";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";

export const HeroSection = () => {
  const [searchValue, setSearchValue] = useState("");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isDesktop = useMediaQuery("(min-width:900px)");

  /* مسارات صور العملاء */
  const avatars = [
    "/Ellipse 37.png",
    "/Ellipse 36.png",
    "/Ellipse 35.png",
    "/Ellipse 34.png",
    "/Ellipse 33.png",
    "/Ellipse 32.png",
  ];

  return (
    <section
      className="
        relative flex flex-col w-full
        bg-[url('/mob2.png')] md:bg-[url('/bg-largeSize.png')]
        bg-cover bg-center bg-no-repeat
        aspect-[375/459] sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[1440/1024]
        text-right
      "
    >
      {/* -------- Navbar -------- */}
      <AppNavbar />

      {/* ================= Desktop (lg+) ================= */}

      <div
        className="
          hidden md:flex flex-col items-center justify-center
          w-full  max-w-[600px] md:max-w-[700px] lg:max-w-[885px] mx-auto my-auto
        "
      >
        {/* *** البطاقة الزجاجية *** */}
        <div
          className="
            w-full flex flex-col items-center gap-8
           bg-white/50
            rounded-[50px] px-10 py-12
          "
          style={{ fontFamily: "Cairo" }}
        >
          <h1
            className={` md:text-[36px] lg:text-[48px] leading-[1.3] font-semibold text-[#110f0d] ${
              isArabic ? "text-right" : "text-left"
            } `}
          >
            {t("hero.title")}
          </h1>

          <p
            className={`
              md:text-[15px] lg:text-[20px] text-[#292929] font-medium leading-relaxed max-w-3xl
              ${isArabic ? "text-right" : "text-left"}
            `}
          >
            {t("hero.description")}
          </p>

          {/* حقل البحث */}
          <div
            className={`w-full flex items-center overflow-hidden rounded-lg bg-white shadow-sm ${
              isArabic ? "flex-row" : "flex-row"
            }`}
          >
            <div className="relative flex-grow flex items-center">
              {/* Custom search icon (hidden when typing) */}
              {!searchValue && (
                <img
                  src="/search-normal.svg"
                  alt="search icon"
                  width={24}
                  height={24}
                  className={`absolute ${
                    isArabic ? "right-4" : "left-4"
                  } pointer-events-none opacity-80 transition-opacity duration-200`}
                />
              )}

              {/* Input */}
              <input
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className={`
                  w-full py-4 px-10 text-sm text-gray-700 placeholder-gray-400
                  focus:outline-none
                  ${isArabic ? "text-right" : "text-left"}
                `}
              />
            </div>
            <button
              className={`
                  w-[194px] text-center
                  ${
                    isArabic
                      ? "bg-[linear-gradient(270deg,#805B3C_0%,#D3BAA4_100%)]"
                      : "bg-[linear-gradient(90deg,#805B3C_0%,#D3BAA4_100%)]"
                  }
                  rounded-lg text-white text-lg font-bold 
                  h-full transition-all duration-300 hover:opacity-90
                    `}
            >
              {t("hero.searchButton")}
            </button>
          </div>
        </div>

        {/* شريط التقييم */}
        <div
          className={`
            flex flex-row items-center gap-4 mt-8
            bg-white/50 
            rounded-3xl px-8 py-3  justify-between ${
              isArabic ? "w-[561px]" : "flex-w-[590px]"
            }
          `}
        >
          {/* النجوم */}
          <div className="flex flex-col items-right">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="/star.svg"
                  alt="cart"
                  width={24}
                  height={24}
                  key={i}
                />
              ))}
            </div>

            <div
              className="text-lg text-[##1A1713]  whitespace-nowrap"
              style={{ fontFamily: "Cairo" }}
            >
              <span className="text-xl font-semibold text-[#835F40]">
                +500{" "}
              </span>
              {t("hero.happyClients")}{" "}
            </div>
          </div>
          {/* صور العملاء */}
          <div className="flex -space-x-2">
            {avatars.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt=""
                width={48}
                height={48}
                className="rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= Mobile / Tablet (<lg) ================= */}
      <div
        className="
          md:hidden flex flex-col items-center justify-around 
          w-[90%]  mx-auto my-auto gap-6
        "
      >
        {/* البطاقة الزجاجية للموبايل */}
        <div className="w-full flex flex-col items-center gap-4 bg-white/50 backdrop-blur-md  rounded-2xl p-6 ">
          <p
            className={`
            text-xl font-medium text-[#1A1713]
            ${isArabic ? "text-right" : "text-left"}
          `}
            style={{ fontFamily: "Cairo" }}
          >
            {t("hero.mobileTitle")}
          </p>

          <p
            className={`
              text-[14px] text-[#4F4F4F] leading-relaxed
              ${isArabic ? "text-right" : "text-left"}
            `}
            style={{ fontFamily: "Cairo" }}
          >
            {t("hero.mobileDescription")}
          </p>

          {/* أزرار CTA */}
          <div className="flex flex-row gap-2 justify-between w-full">
            <button
              className={` text-white text-base font-bold py-2 rounded-[10px] hover:bg-[#916a4f] transition w-[55%] h-[44px] ${
                isArabic
                  ? "bg-[linear-gradient(270deg,#805B3C_0%,#D3BAA4_100%)]"
                  : "bg-[linear-gradient(90deg,#805B3C_0%,#D3BAA4_100%)]"
              } `}
              style={{ fontFamily: "Cairo" }}
            >
              {t("hero.ctaBrowse")}
            </button>
            <button
              className={` border-2 text-base font-bold border-[#a77b5a] text-[#835F40] py-2 rounded-[10px] hover:bg-[#a77b5a]/10 transition w-[55%] h-[44px]`}
              style={{ fontFamily: "Cairo" }}
            >
              {t("hero.ctaBestSellers")}
            </button>
          </div>
        </div>

        {/* شريط التقييم للموبايل */}
        <div
          className={`
            flex  items-center justify-between w-[300px] sm:w-[350px]  gap-2 bg-white/50 backdrop-blur-md rounded-[14px] px-6 py-3
            ${isArabic ? "flex-row" : "flex-row"}
          `}
        >
          {/* النجوم */}
          <div className="flex flex-col ">
            <div className="flex w-[50%]">
              {Array.from({ length: 5 }).map((_, i) => (
                <img
                  src="/star.svg"
                  alt="cart"
                  width={16}
                  height={16}
                  key={i}
                />
              ))}
            </div>
            <div
              className="text-xs text-[##1A1713] text-right font-medium  whitespace-nowrap w-[50%]"
              style={{ fontFamily: "Cairo" }}
            >
              <span className="text-base font-medium text-[#835F40]">
                +500{" "}
              </span>
              {t("hero.happyClients")}{" "}
            </div>
          </div>
          <div />

          <div className="flex -space-x-2">
            {avatars.slice(0, 6).map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt=""
                width={24}
                height={24}
                className="rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
