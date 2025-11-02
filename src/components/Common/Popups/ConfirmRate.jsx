import React from "react";
import { RatePopupButton } from "../../ui/RatePopupButton";

export const ConfirmRate = () => {
  return (
    <div className="flex flex-col w-full max-w-[659px] items-center gap-8 relative">
      {/* Image & Text Section */}
      <div className="w-full max-w-[339px] flex flex-col items-center gap-6 relative">
        <img
          className="w-full max-w-[289px] h-auto"
          alt="Success Illustration"
          src="/confirm-rate-icon.png"
        />

        <div className="flex flex-col items-center gap-4 w-full text-center">
          <h3 className="font-h-3 text-[#1a1713] text-[length:var(--h-3-font-size)] font-[number:var(--h-3-font-weight)] leading-[var(--h-3-line-height)] tracking-[var(--h-3-letter-spacing)] [direction:rtl] [font-style:var(--h-3-font-style)]">
            شكرا لتقييمك !
          </h3>

          <p className="font-medium text-base leading-4 text-[#1a1713] [font-family:'Cairo',Helvetica] tracking-[0] [direction:rtl]">
            تم تسجيل تقييمك بنجاح , نسعد بكوننا جزء من تجربتك
          </p>
        </div>
      </div>

      {/* Gradient Button — using the same RatePopupButton logic */}
      <RatePopupButton className="w-full h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:bg-[linear-gradient(270deg,rgba(128,91,60,0.9)_0%,rgba(211,186,164,0.9)_100%)]">
        الإستمرار في التسوق
      </RatePopupButton>
    </div>
  );
};
