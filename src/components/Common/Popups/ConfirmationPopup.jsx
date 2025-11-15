import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { RatePopupButton } from "../../ui/RatePopupButton";

export const ConfirmationModal = ({
  open,
  onClose,
  orderNumber,
  onTrackOrder,
  onContinueShopping,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "24px",
          overflow: "hidden",
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
       <div className="flex flex-col items-center gap-5 relative
                w-[90%] max-w-[900px] lg:max-w-[1000px] h-auto
                bg-white p-8 sm:p-12 md:p-20 rounded-[20px] shadow-xl">
  {/* Image */}
  <img
    src="/confirmation-popup-icon.png"
    alt="confirmation"
    className="mx-auto w-[70%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-auto"
  />

  {/* Text */}
  <div className="flex flex-col items-center gap-3 self-stretch w-full relative mt-2">
    <h3 className="mt-[-1px] text-[#1a1713] text-center font-h-3 text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[var(--h-3-letter-spacing)] leading-[var(--h-3-line-height)] [direction:rtl]">
      تم تأكيد طلبك بنجاح
    </h3>
    <p className="font-medium text-[#4f4f4f] text-base sm:text-base md:text-lg lg:text-xl text-center [font-family:'Cairo',Helvetica] leading-6 [direction:rtl]">
      رقم طلبك هو : {orderNumber}#
    </p>
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row items-center justify-center self-stretch w-full gap-4 mt-4">
    <RatePopupButton
      onClick={onContinueShopping}
      variant="outline"
      className="flex-1 h-12 sm:h-14 items-center justify-center gap-2 p-2 rounded-[10px] border-[none] bg-transparent 
        before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[10px] 
        before:[background:linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] 
        before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] 
        before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] 
        before:z-[1] before:pointer-events-none relative"
    >
      <span className="relative w-fit bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] 
        [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] 
        [text-fill-color:transparent] font-button-text text-transparent whitespace-nowrap [direction:rtl]">
        العودة للتسوق
      </span>
    </RatePopupButton>

    <RatePopupButton
      onClick={onTrackOrder}
      className="flex-1 h-12 sm:h-14 items-center justify-center gap-2 p-2 rounded-[10px] 
        bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90"
    >
      <span className="relative w-fit font-button-text text-[#fefefe] whitespace-nowrap [direction:rtl]">
        تتبع الطلب
      </span>
    </RatePopupButton>
  </div>
</div>

      </DialogContent>
    </Dialog>
  );
};
