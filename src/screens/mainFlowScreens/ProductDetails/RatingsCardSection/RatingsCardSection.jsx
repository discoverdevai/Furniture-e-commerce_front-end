import React from "react";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useTranslation } from "react-i18next";

const reviewsData = [
  {
    id: 1,
    name: "آلاء خميس",
    date: "15 يوليو 2025",
    avatar: "/Ellipse 32.png",
    rating: "/star.svg",
    text: "بصراحة تجربة الشراء كانت جدا مميزة. أول ما شفت القطعة عجبني شكلها، ولما وصلتني طلعت أحلى من الصور. الخامة فخمة والتفاصيل مرتبة وواضح إن الشغل متقن. مرة مريحة وغيرت شكل الغرفة بالكامل، صارت أحلى وأرتب بكثير.",
    showActions: true,
  },
  {
    id: 2,
    name: "عهود بن ناصر",
    date: "15 يوليو 2025",
    avatar: "/Ellipse 32.png",
    rating: "/star.svg",
    text: "تجربة رائعة مع القطعة، والتوصيل كان سريع.",
    showActions: false,
  },
  {
    id: 3,
    name: "محمد أحمد",
    date: "15 يوليو 2025",
    avatar: "/Ellipse 32.png",
    rating: "/star.svg",
    text: "الخدمة ممتازة والجودة عالية.",
    showActions: false,
  },
];

const ratingsData = [
  { stars: 5, percentage: 90 },
  { stars: 4, percentage: 70 },
  { stars: 3, percentage: 50 },
  { stars: 2, percentage: 5 },
  { stars: 1, percentage: 0 },
];

export const RatingsCardSection = () => {
  const { i18n } = useTranslation();
  const isAabic = i18n.language === "ar";
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 flex flex-col gap-6 font-cairo">
      <h2 className="text-2xl md:text-3xl font-semibold text-right text-[#1a1713]">
        {isAabic ? "التقييمات و المراجعات" : "Ratings & Reviews"}
      </h2>

      <div className="flex flex-col md:flex-row gap-6 md:items-start">
        {/* Ratings Summary */}
        <div className="md:w-[384px] w-full md:h-auto bg-white border border-gray-300 rounded-lg p-6 flex flex-col gap-4 items-start md:mx-0 mx-auto">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-semibold text-[#1a1713]">4.5</div>
            <div className="flex flex-col gap-2 w-[152px]">
              <img
                src="/star.svg"
                alt="Rating stars"
                className="w-[24px] h-[24px]"
              />
              <span className="text-sm text-gray-500">+5 الف تقيم</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            {ratingsData.map((rating) => (
              <div key={rating.stars} className="flex items-center gap-2">
                <span className="text-sm text-[#1a1713]">
                  {rating.percentage}%
                </span>
                <div className="w-full h-1 bg-gray-300 rounded-full relative">
                  {rating.percentage > 0 && (
                    <div
                      className="h-1 bg-[#835f40] rounded-full absolute right-0"
                      style={{ width: `${(rating.percentage / 100) * 100}%` }}
                    />
                  )}
                </div>
                <span className="text-sm text-[#1a1713]">{rating.stars}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="flex-1 flex flex-col gap-6">
          {/* For small screens: horizontal scroll */}
          <div className="md:hidden flex overflow-x-auto gap-4 pb-2">
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-[223px] h-[155px] border border-gray-300 rounded-md p-2 flex flex-col justify-between text-right"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col text-sm">
                    <span className="font-semibold text-[#1a1713]">
                      {review.name}
                    </span>
                    <span className="text-[10px] text-gray-500">
                      {review.date}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] font-normal leading-[150%] text-gray-700">
                  {review.text}
                </p>
              </div>
            ))}
          </div>

          {/* For medium and large screens: vertical list */}
          <div className="hidden md:flex flex-col gap-6">
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="border border-gray-300 rounded-lg p-4 relative text-right"
              >
                {review.showActions && (
                  <div className="absolute top-4 left-4 flex gap-4">
                    <Button variant="ghost" size="icon">
                      <Trash2Icon size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit2Icon size={20} />
                    </Button>
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-14 h-14 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-lg text-[#1a1713]">
                          {review.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <img
                    src={review.rating}
                    alt="Rating stars"
                    className="w-[24px] h-[24px]"
                  />
                  <p className="text-sm text-gray-800 leading-6 font-cairo">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
