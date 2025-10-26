import React from "react";
import { useTranslation } from "react-i18next";

export const AboutUsMainSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative w-full flex flex-col md:flex-row h-auto md:h-[404px] max-w-[2000px] mx-auto"
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2 h-[250px] md:h-full">
        <img
          src="/Aboutus-main-img.png"
          alt={t("aboutUsMain.imageAlt")}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Left (or right) text section */}
      <div
        className={`flex flex-col justify-center  items-center  md:items-start lg:items-start py-8 md:py-12 px-6 md:px-14 w-full md:w-1/2 bg-[linear-gradient(270deg,#805B3C_0%,#D3BAA4_100%)]`}
      >
        <div className="flex flex-col w-full max-w-[554px] gap-6 text-[#FEFEFE]">
          {/* Title */}
          <h2 className="md:font-[500] lg:font-[600] text-[24px] md:text-[28px] lg:text-[32px] leading-[100%] text-[#FEFEFE] font-[Cairo]">
            {t("aboutUsMain.title")}
          </h2>

          {/* Description */}
          <p className=" font-[400] lg:font-medium text-[14px] md:text-[16px] lg:text-[20px] leading-[150%] text-[#FEFEFE] font-[Cairo] whitespace-pre-line">
            {t("aboutUsMain.description")}
          </p>
        </div>
      </div>
    </section>
  );
};
