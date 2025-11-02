import React from "react";
import { HeroSection } from "./Sections/HeroSection/HeroSection";
import { FooterSection } from "../../components/Layout/FooterSection";
import Offers from "./Sections/Offers/Offers";
import { Categories } from "./Sections/Categories/Categories";
import { TestimonialSection } from "./Sections/Testimonials/Testimonials";
import RecentlyArrived from "./Sections/RecentlyArrived/RecentlyArrived";
import MostPurchased from "./Sections/MostPurchased/MostPurchased";

export const Home = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <Offers numberOfProducts={4} />
      <MostPurchased/>
      <RecentlyArrived />
      <TestimonialSection />
      <FooterSection />
    </>
  );
};
