import React from "react";
import { useTranslation } from "react-i18next";
import { AppNavbar } from "../../../components/Layout/Navbar";

export const AboutUsHeroSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const isArabic = currentLang === "ar";

  const images = [
    {
      src: "/aboutus-hero1.png",
      alt: t("aboutUs.image1Alt"),
      className: isArabic
        ? "top-0 left-0 h-[260px] md:h-[380px] lg:h-[509px]  rounded-[100px_100px_0px_100px] w-56 md:w-72 lg:w-96 object-cover"
        : "top-0 right-0 h-[260px] md:h-[380px] lg:h-[509px] rounded-[100px_100px_100px_0px] w-56 md:w-72 lg:w-96 object-cover",
    },
    {
      src: "/aboutus-hero2.png",
      alt: t("aboutUs.image2Alt"),
      className: isArabic
        ? "top-[190px] md:top-[280px] lg:top-[364px] left-[120px] md:left-[200px] lg:left-[306px] h-[230px] md:h-[340px] lg:h-[470px]  rounded-[0px_100px_100px_100px] w-56 md:w-72 lg:w-96   object-cover"
        : "top-[190px] md:top-[280px] lg:top-[364px] right-[120px] md:right-[200px] lg:right-[306px] h-[230px] md:h-[340px] lg:h-[470px]  rounded-[100px_100px_100px_100px] w-56 md:w-72 lg:w-96 object-cover",
    },
  ];

  return (
    <section
      className="w-full bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
    >
      <div className="w-full pt-3">
        <div className="max-w-[1440px] mx-auto">
          <AppNavbar />
        </div>
      </div>
      <section
        className={`flex flex-col lg:flex-row-reverse  w-full items-center lg:items-start justify-center mt-10 mb-16 gap-6 relative sm:px-6 md:px-8 `}
      >
        <div
          className={`relative flex w-[300px] md:w-[500px] lg:w-[690px] h-[400px] md:h-[600px] lg:h-[834px] mb-4 md:mb-6 lg:mb-0 order-1`}
          aria-hidden="true"
        >
          {images.map((image, index) => (
            <img
              key={index}
              className={`absolute ${image.className}`}
              alt={image.alt}
              src={image.src}
            />
          ))}
        </div>

        <div
          className={` w-full md:w-[650px] lg:w-[486px] h-auto lg:h-[530px] flex flex-col items-start justify-start order-2 px-4 md:px-0 lg:px-0  
             gap-6 md:gap-10 lg:gap-[154px] ${
               isArabic ? "text-right" : "text-left"
             }`}
        >
          {/* Title */}
          <h2 className="font-[450] md:font-[500] lg:font-[600] text-[#1A1713] text-[24px] md:text-[28px] lg:text-[32px] leading-[100%]  font-[Cairo]">
            {t("aboutUs.title")}
          </h2>

          {/* Content Frame */}
          <div className="flex flex-col items-start gap-6 self-stretch w-full">
            <h3 className="font-[450] md:font-[500] lg:font-[600] text-[#1A1713] text-[20px] md:text-[24px] lg:text-[30px] leading-[100%]  font-[Cairo]">
              {t("aboutUs.subtitle")}
            </h3>

            <p className="font-[400] md:font-[450] lg:font-[500] text-[#3C3C3C] text-[16px] md:text-[18px] lg:text-[20px] leading-[150%] items-center lg:items-start font-[Cairo]">
              {t("aboutUs.description")}
            </p>

            {/* Button */}
            <button
              className={`w-[220px] md:w-[250px] lg:w-[282px] h-[56px] flex mx-auto lg:mx-0 justify-center items-center gap-2 px-2 rounded-[10px] ${
                isArabic
                  ? "bg-[linear-gradient(270deg,#805B3C_0%,#D3BAA4_100%)]"
                  : "bg-[linear-gradient(90deg,#805B3C_0%,#D3BAA4_100%)]"
              }  text-[#FEFEFE] text-[14px] md:text-[16px] lg:text-[18px] font-[700] leading-[100%] text-center font-[Cairo] hover:opacity-90 transition-opacity`}
            >
              {t("aboutUs.button")}
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};
