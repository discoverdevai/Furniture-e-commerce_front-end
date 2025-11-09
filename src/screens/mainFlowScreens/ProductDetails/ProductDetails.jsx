import { DetailsSection } from "./DetailsSection/DetailsSection";
import { RatingsCardSection } from "./RatingsCardSection/RatingsCardSection";

import { FooterSection } from "../../../components/Layout/FooterSection";
import {AppNavbar}from "../../../components/Layout/Navbar"
import { useParams } from "react-router-dom";

export const ProductDetails = () => {
   const { id } = useParams();
   const { storeName } = useParams();
  return (
    <>
     <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')" }} // change to your image path
    >
      <AppNavbar/>
     <section className="w-full pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20 mb-20">
  <DetailsSection productId={id} storeName = {storeName} />
      </section>
      <RatingsCardSection productId={id} storeName = {storeName}/>
      <FooterSection/>
    
    </div>

      {/* <FooterSection /> */}
    </>
  );
};
