import React from "react";
import { HeroSection } from "./Sections/HeroSection/HeroSection";
import { FooterSection } from "./Sections/FooterSection/FooterSection";
import Offers from "./Sections/Offers/Offers";
import { Categories } from "./Sections/Categories/Categories";
import { TestimonialSection } from "./Sections/Testimonials/Testimonials";


export const Home = () => {
  return (
    <>
      <HeroSection />
<Categories />
      <Offers/>
<TestimonialSection />
      <FooterSection />
      
    </>
  );
};
