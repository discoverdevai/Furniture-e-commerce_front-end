import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../../../components/ui/SliderButton";
import { Card, CardContent } from "../../../../components/ui/CategoriesCard";

const categories = [
  { id: 1, title: "غرف معيشة", image: "/image 16.png" },
  { id: 2, title: "غرف نوم", image: "/image 16.png" },
  { id: 3, title: "غرف سفرة", image: "/image 16.png" },
  { id: 4, title: "مكاتب", image: "/image 16.png" },
  { id: 5, title: "مطابخ", image: "/image 16.png" },
  { id: 6, title: "حمامات", image: "/image 16.png" },
  { id: 7, title: "سسس", image: "/image 16.png" },
  { id: 8, title: "مطاششبخ", image: "/image 16.png" },
  { id: 9, title: "حماماييت", image: "/image 16.png" },
];

export const Categories = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerSlide = 3;
  const totalSlides = Math.ceil(categories.length / cardsPerSlide);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full bg-[#fefefe] flex items-center justify-center overflow-hidden min-h-[400px] sm:min-h-[685px] [direction:rtl]">
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
          {/* Right Button (Previous) */}
          <Button
            onClick={handlePrev}
            variant="outline"
            size="icon"
            className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full border-0 bg-transparent p-0 relative before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-full before:[background:linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] hover:bg-transparent"
          >
            <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>

          {/* Cards Carousel */}
          <div className="relative flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${totalSlides * 100}%`,
                transform: `translateX(${currentSlide * (100 / totalSlides)}%)`, // ← reversed for RTL
                flexDirection: "row-reverse",
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

          {/* Left Button (Next) */}
          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full border-0 bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90"
          >
            <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};
