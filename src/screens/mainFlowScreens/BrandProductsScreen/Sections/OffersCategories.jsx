import React from "react";
import { ChevronDownIcon, ChevronRightIcon,ChevronLeftIcon } from "lucide-react";
import { Checkbox } from "../../../../components/ui/OffersCategoriesCheckBox";
import { useTranslation } from "react-i18next";
import { MobileCategorySection } from "./MobileCategorySection/MobileCategorySection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/ui/BreadCrumbs";


// 🟤 Breadcrumb items
const breadcrumbItems = [
  { label: "المتاجر", href: "#", isActive: false, color: "text-[#a16a35]" },
  { label: "اسم المتجر", href: "#", isActive: false, color: "text-[#a16a35]" },
  { label: "المنتجات", href: "#", isActive: true, color: "text-[#4f4f4f]" },
];

// 🟠 Categories
const categories = [
  { image: "/image 4.png", label: "كراسي", rounded: true },
  { image: "/image 4.png", label: "طاولات", rounded: true },
  { image: "/image 4.png", label: "وحدات تلفاز", rounded: true },
  { image: "/image 4.png", label: "ركنة", rounded: true },
  { image: "/image 4.png", label: "كنب", rounded: true },
];

// 🟡 Filters
const filters = [
  { label: "متوفر", icon: "checkbox", checked: false, textColor: "text-[#1a1713]" },
  { label: "النمط", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { label: "اللون", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { label: "الاعلى تقيما", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { label: "السعر", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { label: "العروض و التخفيضات", icon: "checkbox", checked: true, textColor: "text-[#835f40]" },
];

export const OffersCategories = () => {
  
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className="flex flex-col items-start gap-6 relative">
      {/* 🧭 Breadcrumb Section */}
      <Breadcrumb >
        <BreadcrumbList className="flex items-center gap-2">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.isActive ? (
                  <BreadcrumbPage
                    className={`font-h5-regular font-[number:var(--h5-regular-font-weight)] ${item.color} text-[length:var(--h5-regular-font-size)] tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] whitespace-nowrap [font-style:var(--h5-regular-font-style)]`}
                  >
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    className={`font-h5-regular font-[number:var(--h5-regular-font-weight)] ${item.color} text-[length:var(--h5-regular-font-size)] tracking-[var(--h5-regular-letter-spacing)] leading-[var(--h5-regular-line-height)] whitespace-nowrap [font-style:var(--h5-regular-font-style)]`}
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator>
                {isArabic? <ChevronLeftIcon className="w-6 h-6" />:<ChevronRightIcon className="w-6 h-6" />}
                  
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* 📱 Mobile Category Section */}
      <div className="block md:hidden mx-auto">
        <MobileCategorySection />
      </div>

      {/* 🪑 Categories Section */}
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
              alt={category.label}
              src={category.image}
            />
            <div className="mt-2 text-[12px] sm:text-[14px] font-h5-regular text-[#1a1713] text-center [direction:rtl]">
              {category.label}
            </div>
          </button>
        ))}
      </div>

      {/* 💠 Filters Section */}
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
                  whitespace-nowrap [direction:rtl]
                  [font-style:var(--h-5-font-style)]`}
              >
                {filter.label}
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
