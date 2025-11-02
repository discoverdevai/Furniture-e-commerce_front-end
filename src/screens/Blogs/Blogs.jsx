import React from "react";
import { FooterSection } from "../../components/Layout/FooterSection";
import { BlogsHeroSection } from "./BlogsHeroSection/BlogsHeroSection";
import { BlogsMainSection } from "./BlogsMainSection/BlogsMainSection";

export const Blogs = () => (
  <>
    <BlogsHeroSection />
    <BlogsMainSection />
    <FooterSection />
  </>
);
