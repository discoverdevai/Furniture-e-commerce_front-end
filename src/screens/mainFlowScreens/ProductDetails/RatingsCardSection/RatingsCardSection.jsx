import React from "react";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/RatingsCard";

const reviewsData = [
  {
    id: 1,
    name: "آلاء خميس",
    date: "15 يوليو 2025",
    avatar: "/Ellipse 32.png",
    rating: "/frame-1984081579.svg",
    text: "بصراحة تجربة الشراء كانت جدا مميزة. أول ما شفت القطعة عجبني شكلها، ولما وصلتني طلعت أحلى من الصور. الخامة فخمة والتفاصيل مرتبة وواضح إن الشغل متقن. مرة مريحة وغيرت شكل الغرفة بالكامل، صارت أحلى وأرتب بكثير.",
    showActions: true,
  },
  {
    id: 2,
    name: "عهود بن ناصر",
    date: "15 يوليو 2025",
    avatar: "Ellipse 32.png",
    rating: "/frame-1984081579.svg",
    text: "بصراحة تجربة الشراء كانت جدا مميزة. أول ما شفت القطعة عجبني شكلها، ولما وصلتني طلعت أحلى من الصور. الخامة فخمة والتفاصيل مرتبة وواضح إن الشغل متقن. مرة مريحة وغيرت شكل الغرفة بالكامل، صارت أحلى وأرتب بكثير.",
    showActions: false,
  },
  {
    id: 3,
    name: "عهود بن ناصر",
    date: "15 يوليو 2025",
    avatar: "Ellipse 32.png",
    rating: "/frame 1984081579.svg",
    text: "بصراحة تجربة الشراء كانت جدا مميزة. أول ما شفت القطعة عجبني شكلها، ولما وصلتني طلعت أحلى من الصور. الخامة فخمة والتفاصيل مرتبة وواضح إن الشغل متقن. مرة مريحة وغيرت شكل الغرفة بالكامل، صارت أحلى وأرتب بكثير.",
    showActions: false,
  },
];

const ratingsData = [
  { stars: 5, percentage: 90, width: 245 },
  { stars: 4, percentage: 70, width: 191 },
  { stars: 3, percentage: 50, width: 133 },
  { stars: 2, percentage: 5, width: 24 },
  { stars: 1, percentage: 0, width: 0 },
];

export const RatingsCardSection = () => {
  return (
    <div className="mx-auto"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "1200px",
        alignItems: "flex-start",
        gap: "24px",
        fontFamily: "Cairo, sans-serif",


      }}
    >
      <h2
        style={{
          color: "#1a1713",
          fontWeight: 600,
          fontSize: "32px",
          lineHeight: "100%",
          textAlign: "right",
        }}
      >
        أراء العملاء
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "24px",
          width: "100%",
        }}
      >
        {/* Reviews Section */}
      

        {/* Ratings Summary */}
        <div
          style={{
            width: "384px",
            border: "1px solid #c3c3c3",
            borderRadius: "10px",
            padding: "24px 16px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "16px",

            }}
          >
            {/* Overall Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ fontSize: "32px", fontWeight: 600, color: "#1a1713" }}>
                4.5
              </div>
              <div style={{ width: "152px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px" }}>
                <img
                  src="/frame-1984081579.svg"
                  alt="Rating stars"
                  style={{ width: "100%" }}
                />
                <div style={{ fontSize: "14px", color: "#4f4f4f" }}>+5 الف تقيم</div>
              </div>
            </div>

            {/* Bars */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }}>
              {ratingsData.map((rating) => (
                <div
                  key={rating.stars}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "8px",
                  }}
                >
                  <div style={{ fontSize: "14px", color: "#1a1713" }}>
                    {rating.percentage}%
                  </div>

                  <div
                    style={{
                      width: "266px",
                      height: "5px",
                      position: "relative",
                      backgroundColor: "#c3c3c3",
                      borderRadius: "10px",
                    }}
                  >
                    {rating.percentage > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          height: "5px",
                          width: `${rating.width}px`,
                          backgroundColor: "#835f40",
                          borderRadius: "10px",
                        }}
                      ></div>
                    )}
                  </div>

                  <div style={{ fontSize: "14px", color: "#1a1713" }}>
                    {rating.stars}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
          <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "24px",
          }}
        >
          {reviewsData.map((review) => (
            <div
              key={review.id}
              style={{
                border: "1px solid #c3c3c3",
                borderRadius: "10px",
                padding: "16px",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  textAlign: "right",
                }}
              >
                {/* Header */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "4px" }}>
                      <img src={review.avatar}
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></img>
                    <div style={{display: "flex", flexDirection: "column"}}>
                      <div style={{ fontWeight: 600, fontSize: "18px", color: "#1a1713" }}>
                        {review.name}
                      </div>
                       
                      <div style={{ fontSize: "14px", color: "#4f4f4f" }}>
                        {review.date}
                      </div>

                    </div>
                      
                    </div>

                   
                  </div>

                  <img
                    src={review.rating}
                    alt="Rating stars"
                    style={{ width: "152px", marginTop: "8px" }}
                  />

                  <p
                    style={{
                      fontSize: "16px",
                      color: "#3b3b3b",
                      lineHeight: "150%",
                    }}
                  >
                    {review.text}
                  </p>
                </div>
              </div>

              {review.showActions && (
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    display: "flex",
                    gap: "24px",
                  }}
                >
                  <Button variant="ghost" size="icon">
                    <Trash2Icon size={24} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Edit2Icon size={24} />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
