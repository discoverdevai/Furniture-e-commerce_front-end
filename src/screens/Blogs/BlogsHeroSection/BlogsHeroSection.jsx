import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LatestArticlesCard } from "../../../components/ui/LatestArticlesCard";
import { useMediaQuery } from "@mui/material";
import { AppNavbar } from "../../../components/Layout/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../Api/Axios"

export const BlogsHeroSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const isArabic = currentLang === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/api/blogs", {
  params: { lang:currentLang },
}); // 🔹 Adjust backend URL if needed
        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, [currentLang]);

  const handleBackClick = () => navigate(-1);

  return (
    <>
      <section
        className="bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
      >
        {/* ===== Navbar ===== */}
        <div className="w-full pt-3">
          <div className="max-w-[1440px] mx-auto">
            <AppNavbar />
          </div>
        </div>

        {/* ===== Hero Section with Curved Image and Centered Text ===== */}
        <section className="relative flex flex-col items-center justify-center text-center py-40 lg:py-40">
          {/* Mobile Back Button and Title */}
          {isMobile && (
            <div className="absolute top-8 left-6 right-6 z-20 mb-2 flex items-center justify-between">
              {/* Back Button */}
              <button
                onClick={handleBackClick}
                className="flex items-center justify-center w-10 h-10"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={isArabic ? "rotate-180" : ""}
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="#1A1713"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Page Title */}
              <h1
                className="text-[20px] font-medium text-[#1A1713] mx-2"
                style={{ fontFamily: "Cairo" }}
              >
                {isArabic ? "المدونة" : "Blog"}
              </h1>

              <div className="w-10"></div>
            </div>
          )}

          {/* Curved Shape Background */}
          <img
            src="/Rectangle-blogs-header.png"
            alt="shape"
            className="hidden md:block absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <img
            src="/Rectangle-bg-blog-mobile.png"
            alt="shape"
            className="block md:hidden absolute top-10 left-0 w-full h-full object-cover z-0"
          />

          {/* Centered Text Content */}
          <div className="relative z-10 top-9 md:top-0 max-w-3xl px-6">
            <h2
              className="text-[18px] md:text-[32px] font-bold md:font-semibold text-[#835F40] mb-4"
              style={{ fontFamily: "Cairo" }}
            >
              {t("hero_title")}
            </h2>
            <p
              className="text-[14px] md:text-[20px] text-[#1A1713] leading-relaxed font-normal md:font-medium"
              style={{ fontFamily: "Cairo" }}
            >
              {t("hero_subtitle")}
            </p>
          </div>
        </section>

        {/* ===== Cards Section (Below the Header) ===== */}
        <section className="py-6 md:py-12 lg:py-12 px-6 md:px-12 lg:px-32">
          <div className={`hidden md:flex justify-start mb-8`}>
            <h2
              className={`${
                isMobile ? "text-[24px]" : "text-[32px]"
              } font-semibold text-[#1A1713]`}
              style={{ fontFamily: "Cairo" }}
            >
              {t("latestArticles")}
            </h2>
          </div>
          <div className={`flex md:hidden justify-start mb-2`}>
            <h5
              className="text-[16px] font-medium text-[#1A1713]"
              style={{ fontFamily: "Cairo" }}
            >
              {t("latestArticles")}
            </h5>
          </div>

          {/* Articles List */}
          <div
            className={`${
              isMobile
                ? "flex flex-nowrap overflow-x-auto gap-4 pb-4 scrollbar-hide"
                : "flex flex-wrap justify-between gap-6"
            }`}
          >
            {blogs.length > 0 ? (
              blogs.slice(0, 4).map((blog, index) => (
                <div
                  key={blog.id || index}
                  className={`${
                    isMobile
                      ? "flex-shrink-0 w-[280px]"
                      : "flex-1 min-w-[280px] max-w-[300px]"
                  }`}
                >
                  <button onClick={() => navigate(`/blog/${blog.id}`)}
>
                     <LatestArticlesCard
                    image={`/Article-${(index % 4) + 1}.png`} // Static placeholder images
                    date={new Date(blog.createdAt).toLocaleDateString()}
                    title={blog.subject}
                    description={blog.intro}
                    author={blog.authorName || "Mohamed Ahmed"}
                    authorImage="/ellipse-13.png"
                  />

                  </button>
                 
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">
                {isArabic ? "جاري تحميل المقالات..." : "Loading articles..."}
              </p>
            )}
          </div>
        </section>
      </section>
    </>
  );
};
