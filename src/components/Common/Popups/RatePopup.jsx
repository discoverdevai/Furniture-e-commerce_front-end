import React, { useState, useRef, useEffect } from "react";
import { RatePopupButton } from "../../ui/RatePopupButton";
import { RatePopupLabel } from "../../ui/RatePopupLable";
import { RatePopupTextarea } from "../../ui/RatePopupTextarea";

export const RatePopup = () => {
  const [rating, setRating] = useState(4);
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const ratingNumbers = [
    {
      value: "1",
      className:
        "relative w-fit mt-[-1.00px] font-h-6 font-[number:var(--h-6-font-weight)] text-[#482500] text-[length:var(--h-6-font-size)] text-center tracking-[var(--h-6-letter-spacing)] leading-[var(--h-6-line-height)] whitespace-nowrap [font-style:var(--h-6-font-style)]",
    },
    {
      value: "2",
      className:
        "relative w-fit mt-[-1.00px] font-h-6 font-[number:var(--h-6-font-weight)] text-[#482500] text-[length:var(--h-6-font-size)] text-center tracking-[var(--h-6-letter-spacing)] leading-[var(--h-6-line-height)] whitespace-nowrap [font-style:var(--h-6-font-style)]",
    },
    {
      value: "3",
      className:
        "relative w-fit mt-[-1.00px] font-h-6 font-[number:var(--h-6-font-weight)] text-[#482500] text-[length:var(--h-6-font-size)] text-center tracking-[var(--h-6-letter-spacing)] leading-[var(--h-6-line-height)] whitespace-nowrap [font-style:var(--h-6-font-style)]",
    },
    {
      value: "4",
      className:
        "relative w-fit mt-[-1.00px] font-h-6 font-[number:var(--h-6-font-weight)] text-[#482500] text-[length:var(--h-6-font-size)] text-center tracking-[var(--h-6-letter-spacing)] leading-[var(--h-6-line-height)] whitespace-nowrap [font-style:var(--h-6-font-style)]",
    },
    {
      value: "5",
      className:
        "relative w-fit mt-[-1.00px] mr-[-2.00px] font-h-6 font-[number:var(--h-6-font-weight)] text-[#482500] text-[length:var(--h-6-font-size)] text-center tracking-[var(--h-6-letter-spacing)] leading-[var(--h-6-line-height)] whitespace-nowrap [font-style:var(--h-6-font-style)]",
    },
  ];

  const updateRatingFromMouse = (clientX) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const newRating = Math.round(percentage * 4) + 1;
      setRating(Math.max(1, Math.min(5, newRating)));
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateRatingFromMouse(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) updateRatingFromMouse(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const getStarPosition = () => (rating - 1) * 136 - 24;
  const getBarWidth = () => ((rating - 1) / 4) * 544;

  return (
    <div className="flex flex-col w-[659px] items-center gap-6 relative">
      <header className="flex flex-col w-[332px] items-center gap-3 relative flex-[0_0_auto]">
        <img
          className="relative w-[226px] h-[226px]"
          alt="Element"
          src="/rate-popup-icon.png"
        />
        <h1 className="self-stretch font-[number:var(--h-3-font-weight)] text-[#1a1713] text-[length:var(--h-3-font-size)] text-center leading-[var(--h-3-line-height)] relative font-h-3 tracking-[var(--h-3-letter-spacing)] [direction:rtl] [font-style:var(--h-3-font-style)]">
          رأيك يهمنا , قيم تجربتك مع المنتج!
        </h1>
      </header>

      <section className="relative w-[659px] h-[364px]">
        <div className="flex flex-col w-[544px] items-start absolute top-0 left-[calc(50.00%_-_272px)]">
          <div className="relative w-[544px] h-12">
            <div
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              className="flex flex-col w-[544px] h-2 items-start gap-2 absolute top-6 left-0 bg-[#f3efec] rounded-lg cursor-pointer"
            >
              <div
                className="relative h-2 rounded-lg bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] transition-all duration-100"
                style={{ width: `${getBarWidth()}px` }}
              />
            </div>

            <div
              className="absolute top-0 w-12 h-12 flex items-center justify-center transition-all duration-100"
              style={{ left: `${getStarPosition()}px` }}
            >
              <img className="h-8 w-8" alt="Star" src="/star.svg" />
            </div>
          </div>

          <div className="flex items-center gap-[118px] px-3 py-0 relative self-stretch w-full flex-[0_0_auto]">
            {ratingNumbers.map((r, index) => (
              <div key={index} className={r.className}>
                {r.value}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-[659px] items-start gap-6 absolute top-[88px] left-0">
          <div className="flex flex-col items-end gap-3 relative self-stretch w-full flex-[0_0_auto]">
            <RatePopupLabel className="self-stretch mt-[-1.00px] font-[number:var(--h4-medium-font-weight)] text-[#1a1713] text-[length:var(--h4-medium-font-size)] leading-[var(--h4-medium-line-height)] relative font-h4-medium tracking-[var(--h4-medium-letter-spacing)] [direction:rtl] [font-style:var(--h4-medium-font-style)]">
              تعديل التعليق
            </RatePopupLabel>

            <RatePopupTextarea
              className="h-[164px] w-full rounded-[10px] border border-solid border-[#c3c3c3] p-3 font-normal text-[#4f4f4f] text-sm leading-[21px] [font-family:'Cairo',Helvetica] tracking-[0] [direction:rtl] resize-none"
              defaultValue="بصراحة تجربة الشراء كانت جدا مميزة. أول ما شفت القطعة عجبني شكلها، ولما وصلتني طلعت أحلى من الصور. الخامة فخمة والتفاصيل مرتبة وواضح إن الشغل متقن. مرة مريحة وغيرت شكل الغرفة بالكامل، صارت أحلى وأرتب بكثير."
            />
          </div>

          <RatePopupButton className="h-14 w-full rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] font-button-text font-[number:var(--button-text-font-weight)] text-[#fefefe] text-[length:var(--button-text-font-size)] tracking-[var(--button-text-letter-spacing)] leading-[var(--button-text-line-height)] [direction:rtl] [font-style:var(--button-text-font-style)]">
            حفظ التعديل
          </RatePopupButton>
        </div>
      </section>
    </div>
  );
};
