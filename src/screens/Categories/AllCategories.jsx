import { OffersCategories } from "./Sections/OffersCategories";
import { AppNavbar } from "../../components/Layout/Navbar";
import Offers from "./Sections/Offers/Offers";
import { FooterSection } from "../../components/Layout/FooterSection";
import { useParams } from "react-router-dom";

export const CategoriesScreen = () => {
  const { id } = useParams(); // ⬅️ get categoryId from the route

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')" }}
    >
      <AppNavbar />

      <section className="w-full pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20">
        <OffersCategories />
      </section>

      {/* 🔥 Passing categoryId to Offers */}
      <Offers categoryId={id} />

      <FooterSection />
    </div>
  );
};
