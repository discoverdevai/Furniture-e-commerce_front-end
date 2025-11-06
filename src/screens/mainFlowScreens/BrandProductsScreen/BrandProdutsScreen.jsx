import { OffersCategories } from "./Sections/OffersCategories";
import { AppNavbar } from "../../../components/Layout/Navbar";
import BrandProductSection from "./Sections/BrandProductsMainSection/BrandProductsMainSecion"
import { FooterSection } from "../../../components/Layout/FooterSection";

export const BrandProdutsScreen = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')" }} // change to your image path
    >
      <AppNavbar />
      <section className="w-full pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20">
        <OffersCategories />
      </section>
      <BrandProductSection/>
      <FooterSection/>
    </div>
  );
};
