import React from "react";
import { RatePopupButton } from "../../ui/RatePopupButton";

export const ConfirmationPopup = ({ orderNumber, onTrackOrder, onContinueShopping }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex flex-col w-full max-w-[659px] items-center gap-6 relative bg-white p-6 rounded-lg">
        {/* Image */}
        <img
          className="w-full max-w-[419px] h-auto aspect-square"
          alt="Element sandy tech"
          src="/confirmation-popup-icon.png"
        />

        {/* Content */}
        <div className="flex flex-col gap-8 items-center">
          <h1 className="text-center text-xl font-semibold text-[#1a1713]">
            تم تأكيد طلبك بنجاح
          </h1>
          <p className="text-center text-lg text-[#1a1713]">
            رقم طلبك هو :&nbsp;&nbsp;{orderNumber}#
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 w-full">
          <RatePopupButton
            onClick={onContinueShopping}
            className="flex-1 h-14 items-center justify-center rounded-[10px] border-none bg-transparent before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[10px] before:[background:linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:bg-transparent"
          >
            العودة للتسوق
          </RatePopupButton>

          <RatePopupButton
            onClick={onTrackOrder}
            className="flex-1 h-14 items-center justify-center rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90"
          >
            تتبع الطلب
          </RatePopupButton>
        </div>
      </div>
    </div>
  );
};
