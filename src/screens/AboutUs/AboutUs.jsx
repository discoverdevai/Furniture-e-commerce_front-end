import React from "react";
import { AboutUsHeroSection } from "./AboutUsHeroSection/AboutUsHeroSection";
import { FooterSection } from "../../screens/Home/Sections/FooterSection/FooterSection";
import { AboutUsMainSection } from "./AboutUsMainSection/AboutUsMainSection";
import { AboutUsMainSection2 } from "./AboutUsMainSection2/AboutUsMainSection2";
export const AboutUs = () => {
  return (
    <>
      <AboutUsHeroSection />
      <AboutUsMainSection />
      <AboutUsMainSection2 />

      <div className="w-full pt-3">
        <div className="max-w-[2000px] mx-auto">
          <FooterSection />
        </div>
      </div>
    </>
  );
};
