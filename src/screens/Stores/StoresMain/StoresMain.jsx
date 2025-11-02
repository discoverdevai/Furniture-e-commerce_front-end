import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { AppNavbar } from "../../../components/Layout/Navbar";

export const StoresMain = () => {
  const storesData = [
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Living Room Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Bedroom Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Kitchen Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Office Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: " أسم المتجر",
      imageAlt: "Living Room Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Bedroom Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Kitchen Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Office Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Living Room Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Bedroom Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Kitchen Image",
    },
    {
      imageSrc: "/stores-icon.png",
      text: "أسم المتجر",
      imageAlt: "Office Image",
    },
  ];

  return (
    <section
      className="bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
    >
      <div className="w-full pt-3">
        <div className="max-w-[1440px] mx-auto">
          <AppNavbar />
        </div>
      </div>
      <div className="flex flex-wrap gap-6 justify-center px-[120px] py-20 ">
        {storesData.map((item, index) => (
          <Card
            key={index}
            className="w-[282px] h-[282px] overflow-hidden rounded-3xl border-0 shadow-none"
          >
            <CardContent className="p-0 relative w-full h-full flex flex-col items-center justify-end">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt={item.imageAlt}
                src={item.imageSrc}
              />

              <div className="flex flex-col w-full items-center justify-center relative z-10">
                <div className="h-12 gap-2 p-2 w-full bg-[#ffffff33] rounded-[0px_0px_24px_24px] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] flex items-center justify-center">
                  <div className="relative w-fit font-h-3 font-[number:var(--h-3-font-weight)] text-[#fefefe] text-[length:var(--h-3-font-size)] text-center tracking-[var(--h-3-letter-spacing)] leading-[var(--h-3-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--h-3-font-style)]">
                    {item.text}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
