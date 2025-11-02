import React from "react";
import { RatePopupButton } from "../../ui/RatePopupButton";

export const ConfirmationPopup = () => {
  return (
    <div className="flex flex-col w-full max-w-[659px] items-center gap-6 relative">
      {/* Image */}
      <img
        className="relative w-full max-w-[419px] h-auto aspect-square"
        alt="Element sandy tech"
        src="/confirmation-popup-icon.png"
      />

      {/* Content */}
      <div className="flex flex-col gap-8 self-stretch w-full items-center relative">
        <div className="flex flex-col w-full max-w-[237px] gap-4 items-center relative">
          <h1 className="mt-[-1.00px] font-[number:var(--h4-medium-font-weight)] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] relative self-stretch font-h4-medium text-[#1a1713] text-center tracking-[var(--h4-medium-letter-spacing)] [direction:rtl] [font-style:var(--h4-medium-font-style)]">
            تم تأكيد طلبك بنجاح
          </h1>

          <p className="font-[number:var(--h-3-font-weight)] text-[length:var(--h-3-font-size)] leading-[var(--h-3-line-height)] relative self-stretch font-h-3 text-[#1a1713] text-center tracking-[var(--h-3-letter-spacing)] [direction:rtl] [font-style:var(--h-3-font-style)]">
            رقم طلبك هو :&nbsp;&nbsp;12345#
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-row justify-between self-stretch w-full items-center gap-4 relative">
          <RatePopupButton className="flex flex-1 h-14 items-center justify-center gap-2 p-2 relative rounded-[10px] border-[none] bg-transparent before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[10px] before:[background:linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none hover:bg-transparent">
            <span className="relative w-fit bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-button-text font-[number:var(--button-text-font-weight)] text-transparent text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--button-text-font-style)]">
              العودة للتسوق
            </span>
          </RatePopupButton>

          <RatePopupButton className="flex flex-1 h-14 items-center justify-center gap-2 p-2 relative rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90">
            <span className="relative w-fit font-button-text font-[number:var(--button-text-font-weight)] text-[#fefefe] text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--button-text-font-style)]">
              تتبع الطلب
            </span>
          </RatePopupButton>
        </div>
      </div>
    </div>
  );
};
