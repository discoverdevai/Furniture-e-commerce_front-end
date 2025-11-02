import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../../../components/ui/SliderButton";
import { Card, CardContent } from "../../../../components/ui/CategoriesCard";
import { useTranslation } from "react-i18next";
import api from "../../../../Api/Axios"; // ✅ Make sure this path is correct

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/categories");
        if (response.data) {
          const mapped = response.data.data.map((cat) => ({
            id: cat.id,
            title: cat.name,
            description: cat.description,
            image: cat.imageUrl || "/image 16.png", // fallback image
          }));
          setCategories(mapped);
        }
      } catch (error) {
        console.error("❌ Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(categories.length / cardsPerSlide);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <section className="flex justify-center items-center py-20 bg-[#fefefe]">
        <p className="text-[#683800] font-semibold text-lg">
          جاري تحميل الأقسام...
        </p>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="flex justify-center items-center py-20 bg-[#fefefe]">
        <p className="text-[#683800] font-semibold text-lg">
          لا توجد أقسام متاحة حالياً
        </p>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-[#fefefe] flex items-center justify-center overflow-hidden min-h-[400px] sm:min-h-[685px]">
      {/* Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background pattern"
        src="/image 37.png"
      />

      <div className="relative z-10 flex flex-col w-full max-w-[1200px] items-end gap-10 sm:gap-14 px-4 py-12 sm:py-20">
        <h2 className="self-stretch text-[#1a1713] text-lg sm:text-[length:var(--h2-semiboald-font-size)] leading-[var(--h2-semiboald-line-height)] font-h2-semiboald tracking-[var(--h2-semiboald-letter-spacing)]">
          الأقسام
        </h2>

        <div className="flex items-center justify-center gap-4 sm:gap-12 w-full">
          {/* Previous Button */}
          <Button
            onClick={isArabic ? handleNext : handlePrev}
            variant="outline"
            size="icon"
            className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full border-0 bg-white text-[#1a1713] transition-all duration-300 hover:bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:text-white"
          >
            {isArabic ? (
              <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </Button>

          {/* Cards Carousel */}
          <div className="relative flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${totalSlides * 100}%`,
                transform: `translateX(${
                  isArabic
                    ? currentSlide * (100 / totalSlides)
                    : -currentSlide * (100 / totalSlides)
                }%)`,
                flexDirection: isArabic ? "row-reverse" : "row",
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const start = slideIndex * cardsPerSlide;
                const slideCards = categories.slice(start, start + cardsPerSlide);

                return (
                  <div
                    key={slideIndex}
                    className="flex justify-center gap-4 sm:gap-[73px]"
                    style={{ width: `${100 / totalSlides}%` }}
                  >
                    {slideCards.map((category) => (
                      <Card
                        key={category.id}
                        className="relative rounded-2xl sm:rounded-3xl border-0 bg-[#1a1713] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 w-[98px] h-[92px] xs:w-[120px] xs:h-[120px] sm:w-[180px] sm:h-[240px] md:w-[220px] md:h-[340px] lg:w-[282px] lg:h-[437px]"
                      >
                        <CardContent className="p-0 h-full flex flex-col items-center justify-end">
                          <img
                            className="absolute inset-0 w-full h-full object-cover"
                            alt={category.title}
                            src={category.image}
                          />
                          <div className="relative z-10 flex flex-col w-full">
                            <div className="w-full h-8 sm:h-12 bg-[#00000040] rounded-b-[16px] sm:rounded-b-[24px] backdrop-blur-[10px]" />
                            <div className="flex items-center justify-center gap-2 p-1 sm:p-2 w-full -mt-[30px] sm:-mt-[83px] bg-[#ffffff80] rounded-b-[16px] sm:rounded-b-[24px] backdrop-blur-[10px]">
                              <span className="text-[#fefefe] text-xs sm:text-base text-center whitespace-nowrap font-h-3">
                                {category.title}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Button */}
          <Button
            onClick={isArabic ? handlePrev : handleNext}
            variant="outline"
            size="icon"
            className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full border-0 bg-white text-[#1a1713] transition-all duration-300 hover:bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:text-white"
          >
            {isArabic ? (
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};
