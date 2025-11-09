import React from "react";
import { useParams } from "react-router-dom";
import { OffersCategories } from "./Sections/OffersCategories";
import { AppNavbar } from "../../../components/Layout/Navbar";
import BrandProductSection from "./Sections/BrandProductsMainSection/BrandProductsMainSecion";
import { FooterSection } from "../../../components/Layout/FooterSection";

export const BrandProdutsScreen = () => {
  const { storeName } = useParams(); // <-- read it from URL
  const decodedName = decodeURIComponent(storeName); // decode Arabic safely

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')" }}
    >
      <AppNavbar />
      <section className="w-full pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20">
        <OffersCategories storeName={decodedName} />
      </section>
      <BrandProductSection />
      <FooterSection />
    </div>
  );
};
