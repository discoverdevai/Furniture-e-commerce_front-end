import React from "react";
import { RatePopupButton } from "../../ui/RatePopupButton";

export const DeletePopup = () => {
  return (
    <div className="flex flex-col w-full max-w-[659px] items-center gap-6 relative">
      <div className="flex flex-col w-full max-w-[315px] gap-6 items-center relative">
        <img
          className="relative w-[359px] h-[359px]"
          alt="Element"
          src="/delete-popup-icon.png"
        />

        <div className="flex flex-col gap-3 w-full items-center relative">
          <h3 className="font-h-3 font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] text-center tracking-[var(--h-3-letter-spacing)] leading-[var(--h-3-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--h-3-font-style)]">
            هل انت متأكد من مسح تعليقك ؟
          </h3>
        </div>
      </div>

      <div className="flex justify-between w-full gap-6 items-center relative">
        <RatePopupButton
          variant="outline"
          className="flex-1 h-14 items-center justify-center gap-2 p-2 rounded-[10px] border border-solid border-[#c3c3c3] bg-transparent hover:bg-transparent"
        >
          <span className="font-button-text font-[number:var(--button-text-font-weight)] text-[#1a1713] text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--button-text-font-style)]">
            رجوع
          </span>
        </RatePopupButton>

        <RatePopupButton
          variant="destructive"
          className="flex-1 h-14 items-center justify-center gap-2 p-2 bg-[#b90000] rounded-[10px] hover:bg-[#b90000]/90"
        >
          <span className="font-button-text font-[number:var(--button-text-font-weight)] text-[#fefefe] text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--button-text-font-style)]">
            إلغاء
          </span>
        </RatePopupButton>
      </div>
    </div>
  );
};
