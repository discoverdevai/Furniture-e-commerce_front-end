import React from "react";
import { OrderStatusSection } from "./sections/OrderStatusSection";
import { OrderSummarySection } from "./sections/OrderSummarySection";
import { ProductDetailsSection } from "./sections/ProductDetailsSection";
import { FooterSection } from "../../../components/Layout/FooterSection";
import {AppNavbar}from "../../../components/Layout/Navbar"

export const PreviousOrdersScreen = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')",fontFamily : "'Cairo',Helvetica" }} // change to your image path
    >
        <AppNavbar/>
         <div className="flex flex-col items-start w-full mx-auto  gap-5 w-full pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20 mb-20 ">
<ProductDetailsSection />
      <OrderSummarySection />
      <OrderStatusSection />
        </div>
        <FooterSection/>
      
    </div>
  );
};
