import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/Tabs";
import { useTranslation } from "react-i18next";

export const OrderSummarySection = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <Tabs defaultValue="current" className="w-full">
      <TabsList className="w-full h-auto grid grid-cols-2 bg-transparent rounded-none p-0 gap-0">
        <TabsTrigger
          value="previous"
          className="flex-1 items-center justify-center gap-2 p-4 border-b-2 border-[#c3c3c3] bg-transparent rounded-none 
                     data-[state=active]:bg-transparent data-[state=active]:shadow-none 
                     data-[state=active]:border-b-2 
                     data-[state=active]:[border-image:linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)_1] 
                     font-[Cairo] font-semibold text-[16px] lg:text-[24px] leading-[100%] tracking-[0%] text-center 
                     text-[#4f4f4f] data-[state=active]:text-[#835f40] whitespace-nowrap"
        >
          {isArabic ? "الطلبات السابقة" : "Previous Orders"}
        </TabsTrigger>

        <TabsTrigger
          value="current"
          className="flex-1 items-center justify-center gap-2 p-4 border-b-2 border-transparent bg-transparent rounded-none 
                     data-[state=active]:bg-transparent data-[state=active]:shadow-none 
                     data-[state=active]:border-b-2 
                     data-[state=active]:[border-image:linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)_1] 
                     font-[Cairo] font-semibold text-[16px] lg:text-[24px] leading-[100%] tracking-[0%] text-center 
                     text-[#4f4f4f] data-[state=active]:text-[#835f40] whitespace-nowrap"
        >
          {isArabic ? "الطلبات الحالية" : "Current Orders"}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
