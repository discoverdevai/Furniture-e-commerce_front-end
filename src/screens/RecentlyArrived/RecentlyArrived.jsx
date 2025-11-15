import { OffersCategories } from "./Sections/RecentlyArrivedCategories";
import { AppNavbar } from "../../components/Layout/Navbar";
import RecentlyArrivedMainSection from "./Sections/RecentlyArrivedMainSection/RecentlyArrivedMainSection";
import { FooterSection } from "../../components/Layout/FooterSection";

export const RecentlyArrived = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')" }} // change to your image path
    >
      <AppNavbar />
      <section className="w-full pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20">
        <OffersCategories />
      </section>
      <RecentlyArrivedMainSection />
      <FooterSection />
    </div>
  );
};
