import React from "react";
import { useTranslation } from "react-i18next";

export const AboutUsMainSection2 = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const statsData = t("aboutUsMainSection2.stats", { returnObjects: true });

  return (
    <section className="relative w-full max-w-[2000px] mx-auto bg-white py-16 px-4 sm:px-6 md:px-10">
      {/* background */}
      <img
        className="absolute inset-0 w-full h-full object-cover "
        src="/blogs-header-bg.png"
        alt="Background pattern"
      />
      <div
        className={`absolute inset-0 ${
          isArabic
            ? "bg-gradient-to-l from-[#805B3C] to-[#D3BAA4]"
            : "bg-gradient-to-r from-[#805B3C] to-[#D3BAA4]"
        } mix-blend-multiply opacity-95`}
      />

      {/* content */}
      <div
        className={`relative z-10 flex flex-col items-center gap-10 text-center w-full`}
      >
        <div
          className={`w-full max-w-[1200px] px-6 md:px-10 ${
            isArabic
              ? "text-center md:text-right "
              : "text-center md:text-left "
          }`}
        >
          <h2 className="text-[#FEFEFE] text-[24px] md:text-[28px] lg:text-[32px] font-[500] lg:font-semibold font-[Cairo] leading-tight">
            {t("aboutUsMainSection2.title")}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full px-4">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className=" w-[200px] md:w-[230px] lg:w-[260px] h-[100px] md:h-[120px] flex items-center justify-between p-2 md:p-3 gap-2 text-white border-[1.5px] rounded-xl transition-all"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white rounded-full">
                <img
                  src={stat.icon}
                  alt={stat.alt}
                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                />
              </div>

              <div
                className={`flex flex-col flex-1 items-center text-center gap-0.5 md:gap-1 `}
              >
                <h2 className="text-[22px] md:text-[26px] lg:text-[32px] font-medium md:font-semibold leading-[110%] font-[Cairo]">
                  {stat.number}
                </h2>
                <h4 className=" text-base md:text-lg lg:text-xl font-[400] md:font-medium leading-[110%] font-[Cairo]">
                  {stat.description}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
