import {
  ChevronRightIcon,
  ChevronDownIcon,
  ClockIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import  Checkbox  from "../../components/ui/CheckBox"
import { useTranslation } from "react-i18next";

const filterCategories = [
  { id: "living-rooms", label: "غرف معيشة", checked: true },
  { id: "children-rooms", label: "غرف اطفال", checked: false },
  { id: "bedrooms", label: "غرف نوم", checked: false },
  { id: "dining-rooms", label: "غرف سفرة", checked: false },
  { id: "beds", label: "سراير", checked: false },
];

const searchHistory = [
  { id: 1, text: "غرف معيشة" },
  { id: 2, text: "كرسي" },
  { id: 3, text: "غرف اطفال" },
];

export const SearchDropdown = () => {
      const { t, i18n } = useTranslation();
      const isArabic = i18n.language === "ar";
    
  return (
    <div className="w-[1150px] h-[735px] flex bg-[#fefefe] rounded-3xl overflow-hidden">
      <div className="flex mt-8 w-[1086px] h-[476px] ml-8 gap-6 items-start">
        {/* Sidebar Filters */}
      
        {/* Main Content */}
        <main className="flex flex-col w-[808px] items-start gap-6">
          {/* Search Input */}
          <div className="flex items-center justify-start gap-2 p-4 w-full rounded-[10px] border border-solid border-[#aaaaaa]">
            <div className="inline-flex items-center justify-end gap-2">
                  <SearchIcon className="w-6 h-6" />
              <div className="font-placeholder text-[#545454] [direction:rtl]">
                ما الذي تبحث عنه ؟
              </div>
            
            </div>
          </div>

          {/* Search History */}
          <div className="flex h-[136px] items-start justify-between w-full">
           

            <div className="flex flex-col items-start gap-4">
              <h3 className="font-h-5 text-[#1a1713] [direction:rtl]">
                سجل البحث
              </h3>

              <div className="flex flex-col items-start gap-4">
                {searchHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-end gap-2 cursor-pointer"
                  >
                     <ClockIcon className="w-6 h-6" />
                    <div className="font-placeholder text-[#545454] [direction:rtl]">
                      {item.text}
                    </div>
                   
                  </div>
                ))}
              </div>
            </div>
             <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
              <XIcon className="w-6 h-6" />
            </Button>
          </div>
        </main>
          <aside className="flex flex-col w-[254px] h-[476px] p-4 rounded-[10px] border border-solid border-[#aaaaaa]">
          <div className="flex items-center justify-between w-full mb-10">
           

            <div className="inline-flex items-center justify-center gap-3">
               <img src="/mage_filter.svg" alt="" />
              <div className="font-placeholder text-[#545454] [direction:rtl]">
                تصفية
              </div>
              
            </div>
             <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
              <ChevronDownIcon className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex flex-col items-start gap-4">
            {filterCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-start gap-2 w-full"
              >
                <Checkbox
  id={category.id}
  defaultChecked={category.checked}
/>

                <label
                  htmlFor={category.id}
                  className="font-h-5 text-[#1a1713] cursor-pointer [direction:rtl]"
                >
                  {category.label}
                </label>
               
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
};
