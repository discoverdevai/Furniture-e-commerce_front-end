import React from "react";
import { useTranslation } from "react-i18next";
import { LatestArticlesCard } from "../../../components/ui/LatestArticlesCard";
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
  return (
    <>
      {/* ===== Hero Section with Curved Image and Centered Text ===== */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-40 bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
      >
        {/* Curved Shape Background */}
        {/* Desktop image (md and up) */}
        <img
          src="/Rectangle-blogs-header.png"
          alt="shape"
          className="hidden md:block absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Mobile image (below md) */}
        <img
          src="/Rectangle-bg-blog-mobile.png"
          alt="shape"
          className="block md:hidden absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        {/* Centered Text Content */}
        <div className="relative z-10 max-w-3xl px-6">
          <h2
            className="text-[32px] font-semibold text-[#835F40] mb-4"
            style={{ fontFamily: "Cairo" }}
          >
            {isArabic
              ? "إلهام بيتك يبدأ من هنا"
              : "Home Inspiration Starts Here"}
          </h2>
          <p
            className="text-[#1A1713] leading-relaxed font-medium"
            style={{ fontFamily: "Cairo" }}
          >
            {isArabic
              ? "غُص في عالم الأثاث والديكور، حيث تجد أفكارًا مبتكرة ونصائح عملية تساعدك على ابتكار مساحة تعكس ذوقك وتمنحك شعورًا بالراحة والدفء."
              : "Dive into the world of furniture and decor, where you'll find innovative ideas and practical tips to help you create a space that reflects your taste and gives you a feeling of comfort and warmth."}
          </p>
        </div>
      </section>

      {/* ===== Cards Section (Below the Header) ===== */}
      <section className="py-12 px-20 lg:px-32">
        <div className={`flex justify-start mb-8`}>
          <h2
            className="text-[32px] font-semibold text-[#1A1713]"
            style={{ fontFamily: "Cairo" }}
          >
            {isArabic ? "أحدث المقالات" : "Latest Articles"}
          </h2>
        </div>

        <div className="flex flex-wrap justify-between gap-6">
          {blogsData.map((blog) => (
            <LatestArticlesCard
              key={blog.id}
              image={blog.image}
              date={blog.date}
              title={blog.title[currentLang]}
              description={blog.description[currentLang]}
              author={blog.author[currentLang]}
              authorImage={blog.authorImage}
            />
          ))}
        </div>
      </section>
    </>
  );
};
