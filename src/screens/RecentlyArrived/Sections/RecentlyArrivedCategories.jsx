import React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Checkbox } from "../../../components/ui/OffersCategoriesCheckBox";
import { useTranslation } from "react-i18next";
import { MobileCategorySection } from "./MobileCategorySection/MobileCategorySection";

const categories = [
  { image: "/image 4.png", key: "chairs", rounded: true },
  { image: "/image 4.png", key: "tables", rounded: true },
  { image: "/image 4.png", key: "tv_units", rounded: true },
  { image: "/image 4.png", key: "corner_sofa", rounded: true },
  { image: "/image 4.png", key: "sofa", rounded: true },
];

const filters = [
  { key: "available", icon: "checkbox", checked: false, textColor: "text-[#1a1713]" },
  { key: "pattern", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { key: "color", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { key: "top_rated", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { key: "price", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { key: "recently_arrived", icon: "checkbox", checked: true, textColor: "text-[#835f40]" },
];

export const OffersCategories = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="flex flex-col items-start gap-6 relative">
      {/* 📱 Mobile Category Section — shown in md and smaller */}
      <div className="block md:hidden mx-auto">
        <MobileCategorySection />
      </div>

      {/* 🪑 Categories Section — shared */}
      <div
        className={`w-full flex items-center relative overflow-x-auto scrollbar-hide gap-10 p-4
          sm:justify-center sm:bg-[#f2f2f2] sm:rounded-3xl bg-transparent`}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center cursor-pointer bg-transparent border-0 p-0 flex-shrink-0 w-[68px] h-[90px] sm:w-[98px] sm:h-[120px]"
          >
            <img
              className={`w-[68px] h-[68px] sm:w-[98px] sm:h-[98px] ${
                category.rounded ? "rounded-full object-cover" : ""
              }`}
              alt={t(category.key)}
              src={category.image}
            />
            <div
              className={`mt-2 text-[12px] sm:text-[14px] font-h5-regular text-[#1a1713] text-center ${
                isArabic ? "[direction:rtl]" : "[direction:ltr]"
              }`}
            >
              {t(category.key)}
            </div>
          </button>
        ))}
      </div>

      {/* 💠 Filters Section — shown on screens > md */}
      <div
        className={`hidden md:flex self-stretch w-full flex-[0_0_auto] rounded-[10px] items-center relative 
        ${isArabic ? "divide-x" : "divide-x-reverse"} divide-[#c3c3c3]`}
      >
        {filters.map((filter, index) => {
          const isFirst = index === 0;
          const isLast = index === filters.length - 1;

          let roundedClass = "";
          if (isArabic) {
            if (isFirst) roundedClass = "rounded-[0px_10px_10px_0px]";
            else if (isLast) roundedClass = "rounded-[10px_0px_0px_10px]";
          } else {
            if (isFirst) roundedClass = "rounded-[10px_0px_0px_10px]";
            else if (isLast) roundedClass = "rounded-[0px_10px_10px_0px]";
          }

          return (
            <button
              key={index}
              className={`flex-1 h-12 justify-between px-3 py-4
                ${roundedClass}
                border border-solid border-[#c3c3c3]
                flex items-center relative cursor-pointer
                bg-transparent hover:bg-gray-50 transition-colors`}
            >
              <div
                className={`${filter.textColor} relative w-fit mt-[-1px]
                  font-h-5 font-[number:var(--h-5-font-weight)]
                  text-[length:var(--h-5-font-size)]
                  tracking-[var(--h-5-letter-spacing)]
                  leading-[var(--h-5-line-height)]
                  whitespace-nowrap ${isArabic ? "[direction:rtl]" : "[direction:ltr]"}
                  [font-style:var(--h-5-font-style)]`}
              >
                {t(filter.key)}
              </div>

              {filter.icon === "checkbox" ? (
                <Checkbox checked={filter.checked} className="w-6 h-6 mt-[-4px] mb-[-4px]" />
              ) : (
                <ChevronDownIcon className="w-6 h-6 mt-[-4px] mb-[-4px]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
