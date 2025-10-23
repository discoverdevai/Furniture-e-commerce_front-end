import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/BlogDetailsAvatar";
import { Card, CardContent } from "../../components/ui/BlogDetailsCard";
import { AppNavbar } from "../../components/Navbar";
import { BlogDetailsSection } from "./Sections/BlogDetailsSection";
import { FooterSection } from "../Home/Sections/FooterSection/FooterSection";

export const BlogDetails = () => {
  return (
    <>
      <div
        dir="rtl"
        className="bg-[#faf8f6] w-full h-[408px] rounded-b-[100px] mt-[-22px]"
      >
        {/* Navbar with white background and top gap */}
        <div className=" max-w-[1440px] mx-auto pt-3">
          <AppNavbar />
        </div>

        {/* Page Content */}
        <div className="max-w-[1440px] mx-auto px-8 mt-10 pb-12">
          <div className="relative w-full flex flex-col md:flex-row items-start justify-between">
            {/* Left Card Section */}
            <Card className="border-none shadow-none flex justify-start w-full md:w-auto">
              <CardContent className="flex flex-col items-start md:pl-20 gap-6">
                <h2 className="text-right font-semibold text-[#a16a35] text-[24px] md:text-[32px] leading-tight font-['Cairo',Helvetica] tracking-tight">
                  كيف تختار الألوان المناسبة لغرفة المعيشة؟
                </h2>

                <div className="inline-flex flex-row-reverse items-center justify-center gap-2 px-5 py-1 ">
                  <div className="text-[14px] md:text-[16px] text-[#292929] leading-6 whitespace-nowrap font-['Cairo',Helvetica]">
                    م : محمد احمد
                  </div>
                  <Avatar className="w-10 h-10 md:w-12 md:h-12 ">
                    <AvatarImage src="/Ellipse 33.png" alt="محمد احمد" />
                    <AvatarFallback className="bg-[#a16a35] text-white">
                      م
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            {/* Right Images Section (RTL layout) */}
            <div className="relative flex-shrink-0 mr-8 hidden md:block">
              <img
                className="w-[306px] h-[296px] rounded-[32px] object-cover shadow-lg"
                alt="غرفة معيشة بلون أبيض"
                src="/image 50.png"
              />
              <img
                className="absolute w-[224px] h-[216px] rounded-[32px] object-cover shadow-xl top-[50px] left-[220px]"
                alt="غرفة معيشة بلون بيج"
                src="/image 53.png"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog content section with background */}
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: "url('/image 36.png')" }}
      >
        <BlogDetailsSection />
        <FooterSection />
      </div>
    </>
  );
};
