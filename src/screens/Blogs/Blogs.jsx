import React from "react";
import { FooterSection } from "../../screens/Home/Sections/FooterSection/FooterSection";
import { BlogsHeroSection } from "./BlogsHeroSection/BlogsHeroSection";
import { BlogsMainSection } from "./BlogsMainSection/BlogsMainSection";
import { AppBar } from "@mui/material";
import { AppNavbar } from "../../components/Navbar";

export const Blogs = () => (
  <>
    <BlogsHeroSection />
    <BlogsMainSection />
    <FooterSection />
  </>
);
