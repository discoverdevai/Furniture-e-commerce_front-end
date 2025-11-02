import React from "react";
import { RatePopupButton } from "../../ui/RatePopupButton";

export const ReorderPopup = () => {
  return (
    <div className="flex flex-col w-full max-w-[659px] items-center gap-6 relative">
      <div className="flex flex-col w-full max-w-[394px] items-center gap-4 relative">
        <img
          className="relative self-stretch w-full h-auto"
          alt="Element wavy tech"
          src="/reorder-popup-icon.png"
        />

        <div className="flex flex-col items-start gap-3 self-stretch w-full relative">
          <h3 className="mt-[-1.00px] font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] relative self-stretch font-h-3 text-center tracking-[var(--h-3-letter-spacing)] leading-[var(--h-3-line-height)] [direction:rtl] [font-style:var(--h-3-font-style)]">
            هل ترغب في إعادة هذا الطلب ؟
          </h3>

          <p className="font-medium text-[#4f4f4f] text-base relative self-stretch [font-family:'Cairo',Helvetica] text-center tracking-[0] leading-6 [direction:rtl]">
            سيتم إضافة نفس المنتجات إلى سلة التسوق كما كانت في هذا الطلب
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between self-stretch w-full gap-6 relative">
        <RatePopupButton
          variant="outline"
          className="flex-1 h-14 items-center justify-center gap-2 p-2 rounded-[10px] border-[none] bg-transparent before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[10px] before:[background:linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none relative"
        >
          <span className="relative w-fit bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-button-text font-[number:var(--button-text-font-weight)] text-transparent text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--button-text-font-style)]">
            العودة للتسوق
          </span>
        </RatePopupButton>

        <RatePopupButton className="flex-1 h-14 items-center justify-center gap-2 p-2 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
          <span className="relative w-fit font-button-text font-[number:var(--button-text-font-weight)] text-[#fefefe] text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--button-text-font-style)]">
            إعادة طلب
          </span>
        </RatePopupButton>
      </div>
    </div>
  );
};
