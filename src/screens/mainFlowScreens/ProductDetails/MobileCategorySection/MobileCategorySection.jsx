import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../../../components/ui/OffersCategoriesButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const MobileCategorySection = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [open, setOpen] = useState(false);

  return (
    <header className="relative flex w-full items-center justify-center h-12">
      {/* Back Button (absolute to start) */}
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        size="icon"
        className={`absolute ${isArabic ? "right-0" : "left-0"} w-12 h-12`}
      >
        {isArabic ? (
          <ChevronRightIcon className="w-6 h-6" />
        ) : (
          <ChevronLeftIcon className="w-6 h-6" />
        )}
      </Button>

      {/* Title (centered) */}
      <h1 className=" font-h4-medium text-[#1a1713] text-lg text-center whitespace-nowrap ">
        تفاصيل المنتج
      </h1>
    </header>
  );
};
