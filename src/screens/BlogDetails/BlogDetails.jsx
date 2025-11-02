import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import api from "../../Api/Axios"; // ✅ import your axios instance

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/BlogDetailsAvatar";
import { Card, CardContent } from "../../components/ui/BlogDetailsCard";
import { AppNavbar } from "../../components/Layout/Navbar";
import { BlogDetailsSection } from "./Sections/BlogDetailsSection";
import { FooterSection } from "../../components/Layout/FooterSection";

export const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // ✅ get blog id from URL
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/api/blogs/${id}`, {
          params: { lang: i18n.language },
        });
        setBlog(response.data.data); // adjust based on your API structure
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, i18n.language]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        {t("loading")}...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        {t("blog_not_found")}
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#faf8f6] w-full h-[408px] rounded-b-[100px] mt-[-22px]">
        {/* Navbar */}
        <div className="max-w-[1440px] mx-auto pt-3">
          <AppNavbar />
        </div>

        {/* Header Content */}
        <div className="max-w-[1440px] mx-auto px-8 mt-10 pb-12">
          <div className="relative w-full flex flex-col md:flex-row items-start justify-between">
            {/* Blog Info Card */}
            <Card className="border-none shadow-none flex justify-start w-full md:w-auto">
              <CardContent className="flex flex-col items-start md:pl-20 gap-6">
                <h2 className="text-right font-semibold text-[#a16a35] text-[24px] md:text-[32px] leading-tight font-['Cairo',Helvetica] tracking-tight">
                  {blog.subject}
                </h2>

                <div className="inline-flex flex-row-reverse items-center justify-center gap-2 px-5 py-1 ">
                  <div className="text-[14px] md:text-[16px] text-[#292929] leading-6 whitespace-nowrap font-['Cairo',Helvetica]">
                    {/* Static author name for now */}
                    م : محمد احمد
                  </div>
                  <Avatar className="w-10 h-10 md:w-12 md:h-12">
                    {/* Static image until backend provides author data */}
                    <AvatarImage src="/Ellipse 33.png" alt="محمد احمد" />
                    <AvatarFallback className="bg-[#a16a35] text-white">
                      م
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            {/* Blog Images Section */}
            <div className="relative flex-shrink-0 mr-8 hidden lg:block">
              <img
                className="w-[306px] h-[296px] rounded-[32px] object-cover shadow-lg"
                alt={blog.subject}
                src={blog.image1 || "/image 50.png"}
              />
              <img
                className={`absolute w-[224px] h-[216px] rounded-[32px] object-cover shadow-xl top-[50px] ${
                  isArabic ? "left-[220px]" : "end-[220px]"
                }`}
                alt={blog.subject}
                src={blog.image2 || "/image 53.png"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Blog details content */}
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: "url('/image 36.png')" }}
      >
        {/* Reuse the BlogDetailsSection (can also pass blog if needed) */}
        <BlogDetailsSection />
        <FooterSection />
      </div>
    </>
  );
};
