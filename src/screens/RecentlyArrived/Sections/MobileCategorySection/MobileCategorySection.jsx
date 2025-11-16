import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";
import { Button } from "../../../../components/ui/OffersCategoriesButton";
import { Checkbox } from "../../../../components/ui/OffersCategoriesCheckBox";
import { Drawer, DrawerContent, DrawerTrigger } from "../../../../components/ui/drawer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Filters with translation keys
const filters = [
  { key: "available", icon: "checkbox", checked: false, textColor: "text-[#1a1713]" },
  { key: "style", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { key: "color", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { key: "top_rated", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { key: "price", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
  { key: "offers_discounts", icon: "checkbox", checked: true, textColor: "text-[#835f40]" },
];

export const MobileCategorySection = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [open, setOpen] = useState(false);

  return (
    <header className="flex w-[343px] items-center justify-between relative">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12"
        onClick={() => navigate(-1)}
      >
        {isArabic ? (
          <ChevronRightIcon className="w-6 h-6" />
        ) : (
          <ChevronLeftIcon className="w-6 h-6" />
        )}
      </Button>

      {/* Title */}
      <div className="inline-flex items-center gap-[37px] relative flex-[0_0_auto]">
        <h1
          className={`relative w-fit font-h4-medium font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] text-center tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] whitespace-nowrap ${isArabic ? "[direction:rtl]" : "[direction:ltr]"} [font-style:var(--h4-medium-font-style)]`}
        >
          {t("new_arrivals")}
        </h1>
      </div>

      {/* Filters Drawer Trigger */}
      <Drawer direction={isArabic ? "right" : "left"} open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="w-12 h-12 rounded-[10px] border-[#aaaaaa]"
          >
            <img src="/categories button.svg" alt={t("filters")} />
          </Button>
        </DrawerTrigger>

        {/* Sidebar Content */}
        <DrawerContent className={`p-4 bg-white ${isArabic ? "text-right" : "text-left"}`}>
          <h2 className="text-lg font-semibold mb-4">{t("filters")}</h2>
          <div className="flex flex-col gap-3">
            {filters.map((filter, index) => (
              <button
                key={index}
                className="w-full h-12 flex items-center justify-between px-3 py-4 border border-solid border-[#c3c3c3] rounded-[10px] bg-transparent hover:bg-gray-50 transition-colors"
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
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );
};
