import React from "react";
import { ChevronLeftIcon, MenuIcon ,ChevronRightIcon} from "lucide-react";
import { Button } from "../../../../components/ui/OffersCategoriesButton"
import { useTranslation } from "react-i18next";

export const MobileCategorySection = () => {
    const { i18n } = useTranslation();
      const isArabic = i18n.language === "ar";

  return (
    <header className="flex w-[343px] items-center justify-between relative">
      <Button variant="ghost" size="icon" className="w-12 h-12">
      {isArabic ? (
                <ChevronRightIcon className="w-6 h-6" />

      ) : (
                <ChevronLeftIcon className="w-6 h-6" />

      )}
    </Button>


      <div className="inline-flex items-center gap-[37px] relative flex-[0_0_auto]">
        <h1 className="relative w-fit font-h4-medium font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] text-center tracking-[var(--h4-medium-letter-spacing)] leading-[var(--h4-medium-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--h4-medium-font-style)]">
          العروض و التخفيضات
        </h1>

        
      </div>
            <Button
        variant="outline"
        size="icon"
        className="w-12 h-12 rounded-[10px] border-[#aaaaaa]"
      >
       <img src="/categories button.svg" alt="" />
      </Button>
    </header>
  );
};
