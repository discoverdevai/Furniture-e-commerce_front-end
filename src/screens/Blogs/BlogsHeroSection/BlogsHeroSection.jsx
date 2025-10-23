import React from "react";
import { useTranslation } from "react-i18next";
import { LatestArticlesCard } from "../../../components/ui/LatestArticlesCard";
import { useMediaQuery } from "@mui/material";
import { AppNavbar } from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
export const blogsData = [
  {
    id: 1,
    image: "/Article-1.png",
    date: "2025-08-16",
    title: {
      en: "How to Choose the Right Colors for Your Living Room",
      ar: "كيف تختار الألوان المناسبة لغرفة المعيشة؟",
    },
    description: {
      en: "Smart color tips to create a cozy and bright atmosphere.",
      ar: "ألوان ذكية تمنح الغرفة دفء وأناقة في كل زاوية.",
    },
    author: { en: "Rasha Nabil", ar: "رشا نبيل" },
    authorImage: "/Ellipse 35.png",
  },
  {
    id: 2,
    image: "/Article-2.png",
    date: "2025-06-18",
    title: {
      en: "Smart Tips for Small Spaces",
      ar: "أفكار لتنسيق الأثاث في المساحات الصغيرة",
    },
    description: {
      en: "Simple ways to make your room feel bigger and more comfortable.",
      ar: "حيل بسيطة تخلي بيتك أوسع وأكثر راحة.",
    },
    author: { en: "Rasha Nabil", ar: "رشا نبيل" },
    authorImage: "/Ellipse 35.png",
  },
  {
    id: 3,
    image: "/Article-3.png",
    date: "2025-06-17",
    title: {
      en: "Latest Furniture Trends 2025",
      ar: "أحدث صيحات الأثاث لعام 2025",
    },
    description: {
      en: "Discover the new elegant furniture trends for your modern home.",
      ar: "تعرّف على القطع الرائجة اللي هتغيّر شكل منزلك.",
    },
    author: {
      en: "Mohamed Ahmed",
      ar: "محمد أحمد",
    },
    authorImage: "/ellipse-13.png",
  },
  {
    id: 4,
    image: "/Article-4.png",
    date: "2025-06-17",
    title: {
      en: "Latest Furniture Trends 2025",
      ar: "أحدث صيحات الأثاث لعام 2025",
    },
    description: {
      en: "Discover the new elegant furniture trends for your modern home.",
      ar: "تعرّف على القطع الرائجة اللي هتغيّر شكل منزلك.",
    },
    author: {
      en: "Mohamed Ahmed",
      ar: "محمد أحمد",
    },
    authorImage: "/ellipse-13.png",
  },
];

export const BlogsHeroSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const isArabic = currentLang === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const handleBackClick = () => {
    // Navigate back to previous page (browser default behavior)
    navigate(-1);
  };

  return (
    <>
      <section
        className="bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
      >
        <div className="w-full pt-3">
          <div className="max-w-[1440px] mx-auto">
            <AppNavbar />
          </div>
        </div>
        {/* ===== Hero Section with Curved Image and Centered Text ===== */}
        <section className="relative flex flex-col items-center justify-center text-center py-40 ">
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

              {/* Spacer to balance the flex layout */}
              <div className="w-10"></div>
            </div>
          )}
          {/* Curved Shape Background */}
          {/* Desktop image (md and up) */}
          <img
            src="/Rectangle-blogs-header.png"
            alt="shape"
            className="hidden md:block  absolute top-0 left-0 w-full h-full object-cover z-0"
          />

          {/* Mobile image (below md) */}
          <img
            src="/Rectangle-bg-blog-mobile.png"
            alt="shape"
            className="block md:hidden absolute top-10 left-0 w-full h-full object-cover z-0"
          />

          {/* Centered Text Content */}
          <div className={`relative z-10 top-9 md:top-0 max-w-3xl px-6`}>
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
        <section className=" py-12 px-6 md:px-12 lg:px-32">
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
          <div className={`flex md:hidden justify-start mb-8`}>
            <h5
              className="text-[16px] font-medium text-[#1A1713]"
              style={{ fontFamily: "Cairo" }}
            >
              {t("latestArticles")}
            </h5>
          </div>

          <div
            className={`
                         ${
                           isMobile
                             ? "flex flex-nowrap overflow-x-auto gap-4 pb-4 scrollbar-hide"
                             : "flex flex-wrap justify-between gap-6"
                         }
                             `}
          >
            {blogsData.map((blog) => (
              <div
                key={blog.id}
                className={`
          ${
            isMobile
              ? "flex-shrink-0 w-[280px]" // Fixed width for mobile cards
              : "flex-1 min-w-[280px] max-w-[300px]" // Responsive for desktop
          }
        `}
              >
                <LatestArticlesCard
                  image={blog.image}
                  date={blog.date}
                  title={blog.title[currentLang]}
                  description={blog.description[currentLang]}
                  author={blog.author[currentLang]}
                  authorImage={blog.authorImage}
                />
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};
