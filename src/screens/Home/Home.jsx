import React from "react";
import { HeroSection } from "./Sections/HeroSection/HeroSection";

export const Home = () => {
  return (
    <main
      className="
        relative
        flex flex-col items-center justify-center
        w-full min-h-screen
        bg-cover bg-center bg-no-repeat
      "
      style={{ backgroundImage: `url('/image 64.png')` }}
    >
      {/* HeroSection (which includes Navbar) */}
      <div className="absolute top-0 left-0 w-full z-50">
        <HeroSection />
      </div>

      {/* Optional: background overlay for better contrast */}
      {/* <div className="absolute inset-0 bg-black/30 z-0"></div> */}
    </main>
  );
};
