import React from "react";
import { DeliveryDetailsSection } from "./sections/DeliveryDetailsSection";
import { OrderSummarySection } from "./sections/OrderSummarySection";
import { FooterSection } from "../../../components/Layout/FooterSection";
import {AppNavbar}from "../../../components/Layout/Navbar"

export const OrderTrackingScreen = () => {
  return (
     <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')" }} // change to your image path
    >
        <AppNavbar/>
         <div className="flex flex-col items-start w-full mx-auto  gap-5 w-full pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20 mb-20 ">
      <header className="w-full mb-8">
        <h1 className="font-h2-semiboald font-[number:var(--h2-semiboald-font-weight)] text-[#1a1713] text-[length:var(--h2-semiboald-font-size)] tracking-[var(--h2-semiboald-letter-spacing)] leading-[var(--h2-semiboald-line-height)] [direction:rtl] [font-style:var(--h2-semiboald-font-style)]">
          تتبع الطلب
        </h1>
      </header>

      <main className="flex items-start gap-6 w-full">
        
        <DeliveryDetailsSection />
        <OrderSummarySection />
      </main>
    </div>
<FooterSection/>
    </div>
   
  );
};
