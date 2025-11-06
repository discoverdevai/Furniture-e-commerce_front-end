import React from "react";
import { Button } from "../../../../components/ui/button";

export const ProductDetailsSection = () => {
  return (
    <header className="flex items-center justify-between w-full">
       <h1 className="font-h2-semiboald font-[number:var(--h2-semiboald-font-weight)] text-[#1a1713] text-[length:var(--h2-semiboald-font-size)] text-center tracking-[var(--h2-semiboald-letter-spacing)] leading-[var(--h2-semiboald-line-height)] whitespace-nowrap  [font-style:var(--h2-semiboald-font-style)]">
        سجل الطلبات
      </h1>
      {/* <Button
        variant="outline"
        className="flex items-center justify-center gap-2 px-4 py-2 h-auto rounded-[10px] border border-[#c3c3c3] bg-transparent hover:bg-transparent"
      >
        <span className="font-h-5 font-[number:var(--h-5-font-weight)] text-[#4f4f4f] text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)] whitespace-nowrap  [font-style:var(--h-5-font-style)]">
          التصفية
        </span>
        <div className="w-6 h-6 bg-[url(/vuesax-linear-filter-search.png)] bg-[100%_100%]" />
      </Button> */}

     
    </header>
  );
};
