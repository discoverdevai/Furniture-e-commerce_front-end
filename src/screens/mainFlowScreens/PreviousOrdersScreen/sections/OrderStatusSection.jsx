import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Backend status mapped to Arabic label and colors
const statusStyles = {
  PENDING: { label: "قيد الانتظار", bg: "bg-[#ebf0fb]", color: "text-[#00154c]" },
  DELIVERING: { label: "جاري التوصيل", bg: "bg-[#fbfce2]", color: "text-[#414706]" },
  DELIVERED: { label: "تم التوصيل", bg: "bg-[#f6f0ea]", color: "text-[#5a2c00]" },
   SHIPPED: { label: "تم التحميل", bg: "bg-[#f6f0ea]", color: "text-[#5a2c00]" },
  CANCELLED: { label: "ملغي", bg: "bg-[#fbeaea]", color: "text-[#a60000]" },
};

export const OrderStatusSection = ({ orders = [] }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10 w-full">
        لا توجد طلبات لعرضها
      </div>
    );
  }

  const handleCardClick = (orderNumber) => {
    console.log("order0" + orderNumber);
    
    navigate(`/order-tracking/${orderNumber}`);
  };

  return (
    <section
      className={`flex flex-col items-start gap-6 w-full ${
        isArabic ? "text-right" : "text-left"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {orders.map((order) => {
        const style = statusStyles[order.status] || {};
        const firstItem = order.orderItems?.[0];
        const showCancel = order.status === "PENDING";

        return (
          <div key={order.id} className="flex flex-col gap-4 w-full">
            {/* Clickable Card */}
            <Card
              onClick={() => handleCardClick(order.orderNumber)}
              className="w-full border border-[#c3c3c3] rounded-[10px] cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardContent className="flex flex-col sm:flex-row sm:items-start sm:justify-between p-4 gap-4">
                {/* Left Section: Image and Info */}
                <div className="flex items-start gap-4 w-full sm:w-auto">
                  {/* Product Image */}
                  <img
                    className="w-[56px] h-[54px] sm:w-[222px] sm:h-[213px] rounded-[10px] object-cover"
                    alt={firstItem?.productName}
                    src={firstItem?.productImage || "/image 4.png"}
                  />

                  {/* Product Details */}
                  <div className="flex flex-col items-start gap-2 sm:gap-3">
                    <div className="text-[14px] font-semibold text-[#4f4f4f]">
                      #{order.orderNumber}
                    </div>

                    <div className="text-[16px] font-semibold text-[#1a1713]">
                      {firstItem?.productName}
                    </div>

                    <div className="text-[14px] text-[#1a1713]">
                      العدد :{" "}
                      <span className="font-semibold text-2xl">
                        {firstItem?.quantity}
                      </span>
                    </div>

                    <div className="text-[14px] text-[#1a1713]">
                      السعر :{" "}
                      <span className="font-semibold text-[#835f40] text-2xl">
                        {firstItem?.totalPrice}
                      </span>{" "}
                      <span className="text-[#835f40] text-lg">ر.س</span>
                    </div>

                    <div className="text-[14px] text-[#1a1713]">
                      تاريخ الاستلام المتوقع :{" "}
                      <span className="font-semibold text-2xl">
                        {new Date(order.expectedDeliveryDate).toLocaleDateString(
                          "ar-EG",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section: Status Badge */}
                <div className="flex sm:flex-col justify-end sm:justify-start">
                  <Badge
                    className={`${style.bg} ${style.color} inline-flex items-center justify-center gap-2 p-1 rounded-[10px] h-auto font-semibold text-[14px]`}
                  >
                    {style.label}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Cancel Button (only for pending orders) */}
            {showCancel && (
              <Button
                variant="ghost"
                className="inline-flex items-center justify-start gap-3 h-auto p-0 hover:bg-transparent"
              >
                <img
                  className="w-6 h-6"
                  alt="Close circle"
                  src="./close-circle.svg"
                />
                <span className="font-medium text-[#4f4f4f] text-[16px] whitespace-nowrap">
                  إلغاء الطلب
                </span>
              </Button>
            )}
          </div>
        );
      })}
    </section>
  );
};
