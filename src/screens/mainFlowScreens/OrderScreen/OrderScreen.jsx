import React from "react";
import { PaymentInformationSection } from "./PaymentInformationSection/PaymentInformationSection";
import { ProductDetailsSection } from "./ProductDetailsSection/ProductDetailsSection";
import { FooterSection } from "../../../components/Layout/FooterSection";
import { AppNavbar } from "../../../components/Layout/Navbar";
import { Button } from "../../../components/ui/button";


export const OrderScreen = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')" }}
    >
      <AppNavbar /> 

      {/* ✅ Main content layout */}
      <section
        className="
          mx-auto 
          flex flex-col lg:flex-row   /* mobile: column | desktop: row */
          gap-8 
          w-full 
          pt-7 
          px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20 
          mb-20
        "
      >
        {/* Payment form first on mobile */}
        <div className="w-full lg:w-2/3">
          <PaymentInformationSection />
        </div>

        {/* Product details second */}
        <div className="w-full lg:w-1/3 mx-auto">
          <ProductDetailsSection />
        </div>

       

      </section>
      <div className=" px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20 ">
        <Button className="
        flex h-12 sm:h-14 items-center justify-center gap-2 p-2 
        relative self-stretch w-full rounded-[10px] 
        bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] 
        hover:opacity-90 text-sm sm:text-base w-full lg:w-2/3 
      ">
        <span className="relative w-fit font-button-text text-[#fefefe] whitespace-nowrap">
          تأكيد الطلب
        </span>
      </Button>

      </div>
      
      <FooterSection />
      
    </div>
  );
};
