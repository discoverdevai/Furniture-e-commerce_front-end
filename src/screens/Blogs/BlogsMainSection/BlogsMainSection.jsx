import React from "react";
import { useTranslation } from "react-i18next";
import { PopularArticlesCard } from "../../../components/ui/PopularArticlesCard";
import { useMediaQuery } from "@mui/material";

export const popularArticlesData = [
  {
    id: 1,
    date: "2025-09-16",
    title: {
      en: "How to Choose the Right Colors for Your Living Room?",
      ar: "كيف تختار الألوان المناسبة لغرفة المعيشة؟",
    },
    description: {
      en: "Colors aren’t just decoration.they set the entire mood of the room. Discover the shades that bring comfort and elegance, turning your living room into the perfect space for family and guests.",
      ar: "الألوان مش مجرد ديكور، دي اللي بتحدد جو الغرفة بالكامل. تعرّف على الألوان اللي تضيف راحة وأناقة وتخلي غرفة المعيشة مكان مثالي يجمع العيلة والضيوف.",
    },
    author: {
      en: "Mohamed Ahmed",
      ar: "محمد أحمد",
    },
    authorImage: "/ellipse-13.png",
  },
  {
    id: 2,
    date: "2025-09-16",
    title: {
      en: "The secret to choosing the perfect furniture for your room.",
      ar: "سر اختيار الأثاث المثالي لغرفتك",
    },
    description: {
      en: "Not every piece of furniture fits every space. Learn the simple rules that help you choose furniture that matches your room’s size and reflects your lifestyle.",
      ar: "مش كل قطعة أثاث تناسب أي مساحة. تعرف على القواعد البسيطة اللي تساعدك تختار الأثاث اللي ينسجم مع حجم الغرفة ويعكس أسلوب حياتك.",
    },
    author: {
      en: "Mohamed Ahmed",
      ar: "محمد أحمد",
    },
    authorImage: "/ellipse-13.png",
  },
  {
    id: 3,
    date: "2025-09-16",
    title: {
      en: "How Colors Affect Your Mood?",
      ar: "ألوان الديكور وتأثيرها على المزاج",
    },
    description: {
      en: "Colors aren’t just about looks — they’re about feeling. Learn how to choose colors that make your home more peaceful or more vibrant, adding a touch that reflects your personality.",
      ar: "الألوان مش بس شكل، هي إحساس. اعرف إزاي تختار ألوان تخلي بيتك أكثر هدوء أو أكثر حيوية، وتضيف لمسة تعكس شخصيتك.",
    },
    author: {
      en: "Mohamed Ahmed",
      ar: "محمد أحمد",
    },
    authorImage: "/ellipse-13.png",
  },
  {
    id: 4,
    date: "2025-09-16",
    title: {
      en: "How to Combine Comfort and Elegance?",
      ar: "كيف تدمج بين الراحة والأناقة؟",
    },
    description: {
      en: "Your home should be both practical and beautiful. Discover ideas that help you combine comfort and functionality with stunning design in every corner of your house.",
      ar: "بيتك لازم يكون عملي وجميل في نفس الوقت. اكتشف أفكار تساعدك تجمع بين الراحة في الاستخدام وروعة التصميم في كل ركن من أركان منزلك.",
    },
    author: {
      en: "Mohamed Ahmed",
      ar: "محمد أحمد",
    },
    authorImage: "/ellipse-13.png",
  },
];

export const BlogsMainSection = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;
  const isArabic = currentLang === "ar";
  const isMobile = useMediaQuery("(max-width:550px)");
  const isTablet = useMediaQuery("(max-width:1000px)");
  const getDescription = (article, lang) => {
    const desc = article.description[lang];

    if (isMobile) return desc.split(" ").slice(0, 10).join(" ") + "...";
    if (isTablet) return desc.split(" ").slice(0, 13).join(" ") + "...";
    return desc;
  };
  const getTitle = (title) => {
    if (currentLang === "ar") return title; // Show full Arabic title

    if (isMobile) return title.split(" ").slice(0, 4).join(" ") + "...";
    if (isTablet) return title.split(" ").slice(0, 5).join(" ") + "...";

    return title;
  };

  return (
    <section
      className="bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
    >
      <section className=" lg:py-20 px-6 md:px-12 lg:px-32">
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
        <div
          className={`flex flex-row-reverse items-center gap-3 lg:gap-8 mb-10 `}
        >
          {/* Left Side - Image */}
          <div className={`${isMobile ? "w-1/2" : "w-2/3"}  `}>
            <img
              src={
                isMobile ? "/main-blog-mob-img1.png" : "/main-bolgs-img1.png"
              }
              alt="Popular Article Visual 1"
              className="w-full rounded-2xl object-cover shadow-lg"
            />
          </div>

          {/* Right Side - Two stacked cards */}
          <div
            className={`flex flex-col gap-2 lg:gap-6  ${
              isMobile ? "w-1/2" : "w-1/3"
            }`}
          >
            {popularArticlesData.slice(0, 2).map((article) => (
              <PopularArticlesCard
                key={article.id}
                date={article.date}
                title={getTitle(article.title[currentLang])}
                description={getDescription(article, currentLang)}
                author={article.author[currentLang]}
                authorImage={article.authorImage}
              />
            ))}
          </div>
        </div>

        {/* === Second Row: Image Right - Cards Left === */}
        <div className={`flex flex-row  items-center gap-3 lg:gap-8  `}>
          {/* Right Side - Image */}
          <div className={`${isMobile ? "w-1/2" : "w-2/3"} h-full `}>
            <img
              src={
                isMobile ? "/main-blog-mob-img2.png" : "/main-blogs-img2.png"
              }
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
            {popularArticlesData.slice(2, 4).map((article) => (
              <PopularArticlesCard
                key={article.id}
                date={article.date}
                title={getTitle(article.title[currentLang])}
                description={getDescription(article, currentLang)}
                author={article.author[currentLang]}
                authorImage={article.authorImage}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};
