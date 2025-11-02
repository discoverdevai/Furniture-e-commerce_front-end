import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PopularArticlesCard } from "../../../components/ui/PopularArticlesCard";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import api from "../../../Api/Axios"
import { button } from "@heroui/react";
import { useNavigate } from "react-router-dom";


export const BlogsMainSection = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const isArabic = currentLang === "ar";
  const isMobile = useMediaQuery("(max-width:550px)");
  const isTablet = useMediaQuery("(max-width:1000px)");
  const navigate = useNavigate()

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/api/blogs", {
  params: { mostCommon: true , lang:currentLang },
}); // 🔹 Update API URL
        if (res.data.success) {
          setBlogs(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, [currentLang]);

  const getDescription = (desc) => {
    if (isMobile) return desc.split(" ").slice(0, 10).join(" ") + "...";
    if (isTablet) return desc.split(" ").slice(0, 13).join(" ") + "...";
    return desc;
  };

  const getTitle = (title) => {
    if (isMobile) return title.split(" ").slice(0, 4).join(" ") + "...";
    if (isTablet) return title.split(" ").slice(0, 5).join(" ") + "...";
    return title;
  };

  // Fallback in case backend returns less than 4 blogs
  const displayedBlogs = blogs.slice(0, 4);

  return (
    <section
      className="bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
    >
      <section className="lg:py-20 px-6 md:px-12 lg:px-32">
        {/* Section Title */}
        <h2
          className={`text-[16px] font-medium lg:text-[32px] lg:font-semibold mb-2 text-[#1A1713] ${
            isArabic ? "text-right" : "text-left"
          }`}
          style={{ fontFamily: "Cairo" }}
        >
          {t("popularArticles")}
        </h2>

        {/* === First Row: Image Left - Cards Right === */}
        <div className="flex flex-row-reverse items-center gap-3 lg:gap-8 mb-10">
          {/* Left Side - Image */}
          <div className={`${isMobile ? "w-1/2" : "w-2/3"}`}>
            <img
              src={isMobile ? "/main-blog-mob-img1.png" : "/main-bolgs-img1.png"}
              alt="Popular Article Visual 1"
              className="w-full rounded-2xl object-cover shadow-lg"
            />
          </div>

          {/* Right Side - Two stacked cards */}
          <div
            className={`flex flex-col gap-2 lg:gap-6 ${
              isMobile ? "w-1/2" : "w-1/3"
            }`}
          >
            {displayedBlogs.slice(0, 2).map((article) => (
              <button onClick={() => navigate(`/blog/${article.id}`)}>
                <PopularArticlesCard
                key={article.id}
                date={new Date(article.createdAt).toLocaleDateString()}
                title={getTitle(article.subject)}
                description={getDescription(article.intro)}
                author="Mohamed Ahmed"
                authorImage="/ellipse-13.png"
              />
              </button>
             
            ))}
          </div>
        </div>

        {/* === Second Row: Image Right - Cards Left === */}
        <div className="flex flex-row items-center gap-3 lg:gap-8">
          {/* Right Side - Image */}
          <div className={`${isMobile ? "w-1/2" : "w-2/3"} h-full`}>
            <img
              src={isMobile ? "/main-blog-mob-img2.png" : "/main-blogs-img2.png"}
              alt="Popular Article Visual 2"
              className="w-full rounded-2xl object-cover shadow-lg"
            />
          </div>

          {/* Left Side - Two stacked cards */}
          <div
            className={`flex flex-col gap-2 lg:gap-6 ${
              isMobile ? "w-1/2" : "w-1/3"
            }`}
          >
            {displayedBlogs.slice(2, 4).map((article) => (
              <PopularArticlesCard
                key={article.id}
                date={new Date(article.createdAt).toLocaleDateString()}
                title={getTitle(article.subject)}
                description={getDescription(article.intro)}
                author="Mohamed Ahmed"
                authorImage="/ellipse-13.png"
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
