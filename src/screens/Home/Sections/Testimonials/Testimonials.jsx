import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/TestimonialAvatar";
import {
  TestimonialsCard,
  TestimonialsCardContent,
} from "../../../../components/ui/TestimonialsCard";
import { useTranslation } from "react-i18next";
import api from "../../../../Api/Axios"; // ✅ Make sure this points to your configured Axios instance

export const TestimonialSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [reviews, setReviews] = useState([]);

  // Fetch reviews using Axios
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get("/api/buyer/reviews/all"); // ✅ your provided endpoint
        if (response.data.success && Array.isArray(response.data.data)) {
          setReviews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="relative w-full bg-[#fefefe] py-20 overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background pattern"
        src="/image 37.png"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 flex flex-col gap-10 items-start text-start">
        {/* Title */}
        <div className="flex items-center justify-between w-full mb-2">
          <h2
            className="
              font-[number:var(--h2-semiboald-font-weight)]
              text-[20px]
              sm:text-[length:var(--h2-semiboald-font-size)]
              leading-[var(--h2-semiboald-line-height)]
              font-h2-semiboald
              text-[#1a1713]
              tracking-[var(--h2-semiboald-letter-spacing)]
              [font-style:var(--h2-semiboald-font-style)]
            "
          >
            {isArabic ? "آراء العملاء" : "Customer Reviews"}
          </h2>
          <span className="text-[#a16a35] font-medium text-[14px] cursor-pointer hover:underline">
            {isArabic ? "المزيد" : "See more"}
          </span>
        </div>

        {/* Cards container */}
        <div
          className={`flex gap-6 w-full  overflow-x-auto lg:overflow-visible pb-4 md:pb-0 scroll-smooth`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {reviews.map((review) => (
            <div
              key={review.id}
              className="pt-12 flex-shrink-0 lg:flex-shrink w-[280px] sm:w-[300px] flex flex-col items-start relative text-start"
            >
              {/* Avatar */}
              <Avatar
                className={`absolute -top-0 ${
                  isArabic ? "right-1" : "left-1"
                } w-[85px] h-[85px] z-10`}
              >
                <AvatarImage
                  src={"/Ellipse 32.png"}
                  alt={review.username}
                  className="object-cover"
                />
              </Avatar>

              {/* Review Card */}
              <TestimonialsCard className="w-full border-0 shadow-none bg-transparent">
                <TestimonialsCardContent className="relative p-0">
                  <img
                    className="absolute top-0 left-0 w-full h-full"
                    alt="Card background"
                    src="/Union.svg"
                  />

                  <div className="relative flex flex-col items-center gap-2 px-3 py-[61px] min-h-[247px]">
                    <div className="flex flex-col w-full items-start gap-11">
                      {/* Comment */}
                      <p className="font-normal text-sm leading-[21px] [font-family:'Cairo',Helvetica] text-[#1a1713] tracking-[0]">
                        {review.comment}
                      </p>

                      {/* Username + Rating */}
                      <div className="flex items-center justify-between w-full">
                        <div className="font-h-5 font-[number:var(--h-5-font-weight)] text-[#3b3b3b] text-[length:var(--h-5-font-size)] tracking-[var(--h-5-letter-spacing)] leading-[var(--h-5-line-height)] whitespace-nowrap [font-style:var(--h-5-font-style)]">
                          {review.username}
                        </div>

                        {/* Dynamic stars */}
                        <div className="flex gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <img
                              key={i}
                              src="/star.svg"
                              alt="Star"
                              className="w-4 h-4"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TestimonialsCardContent>
              </TestimonialsCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
