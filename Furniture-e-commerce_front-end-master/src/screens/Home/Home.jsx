import React from "react";
import { HeroSection } from "./Sections/HeroSection/HeroSection";
import { FooterSection } from "./Sections/FooterSection/FooterSection";
import Offers from "./Sections/Offers/Offers";

export const Home = () => {
  return (
    <>
      <HeroSection />
      <Offers/>
      <FooterSection />
      
    </>
  );
};
