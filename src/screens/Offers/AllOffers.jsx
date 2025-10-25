import { OffersCategories } from "./Sections/OffersCategories";
import { AppNavbar } from "../../components/Navbar";
import Offers from "./Sections/Offers/Offers"
import { FooterSection } from "../../screens/Home/Sections/FooterSection/FooterSection";

export const OffersScreen = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')" }} // change to your image path
    >
      <AppNavbar />
      <section className="w-full pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20">
        <OffersCategories />
      </section>
      <Offers/>
      <FooterSection/>
    </div>
  );
};
