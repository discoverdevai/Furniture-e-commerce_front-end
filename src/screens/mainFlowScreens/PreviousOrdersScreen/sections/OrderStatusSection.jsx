import React, { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../../../Api/Axios";
import { DeletePopup } from "../../../../components/Common/Popups/DeletePopup"; // import the dialog component

// Backend status mapped to Arabic label and colors
const statusStyles = {
  PENDING: {
    label: { ar: "قيد الانتظار", en: "Pending" },
    bg: "bg-[#ebf0fb]",
    color: "text-[#00154c]",
  },
  CONFIRMED: {
    label: { ar: "قيد تجهيز", en: "Being prepared" },
    bg: "bg-[#ebf0fb]",
    color: "text-[#00154c]",
  },
  DELIVERING: {
    label: { ar: "جاري التوصيل", en: "Delivering" },
    bg: "bg-[#fbfce2]",
    color: "text-[#414706]",
  },
  DELIVERED: {
    label: { ar: "تم التوصيل", en: "Delivered" },
    bg: "bg-[#f6f0ea]",
    color: "text-[#5a2c00]",
  },
  SHIPPED: {
    label: { ar: "تم الشحن", en: "Shipped" },
    bg: "bg-[#f6f0ea]",
    color: "text-[#5a2c00]",
  },
  CANCELLED: {
    label: { ar: "تم الالغاء", en: "Cancelled" },
    bg: "bg-[#fbeaea]",
    color: "text-[#a60000]",
  },
};

export const OrderStatusSection = ({ orders = [] }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";

  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [currentOrderNumber, setCurrentOrderNumber] = useState(null);
  const [orderList, setOrderList] = useState(orders); // local copy for UI updates

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10 w-full">
        {isArabic ? "لا توجد طلبات لعرضها" : "No orders to display"}
      </div>
    );
  }

  const handleCardClick = (orderNumber) => {
    navigate(`/order-tracking/${orderNumber}`);
  };

  const handleOpenCancelDialog = (orderNumber) => {
    setCurrentOrderNumber(orderNumber);
    setOpenCancelDialog(true);
  };

  const handleCancelOrder = async () => {
    try {
      const response = await api.put(
        `/api/buyer/orders/cancel/${currentOrderNumber}`,
        { reason: "Ordered by mistake" }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: isArabic ? "تم الإلغاء" : "Cancelled",
          text: isArabic
            ? "تم إلغاء الطلب بنجاح"
            : "Order cancelled successfully",
        });

        // update order status in local state
        setOrderList((prev) =>
          prev.map((order) =>
            order.orderNumber === currentOrderNumber
              ? { ...order, status: "CANCELLED" }
              : order
          )
        );
      } else {
        Swal.fire({
          icon: "error",
          title: isArabic ? "فشل الإلغاء" : "Failed to cancel",
          text: response.data.message,
        });
      }
      setOpenCancelDialog(false); // close dialog
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: isArabic ? "حدث خطأ" : "Error occurred",
        text: isArabic
          ? "تعذر إلغاء الطلب، حاول مرة أخرى"
          : "Failed to cancel order, please try again",
      });
      console.error("Cancel order error:", error);
    }
  };

  return (
    <section
      className={`flex flex-col items-start gap-6 w-full ${
        isArabic ? "text-right" : "text-left"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {orderList.map((order) => {
        const style = statusStyles[order.status] || {};
        const firstItem = order.orderItems?.[0];
        const showCancel =
          order.status === "PENDING" || order.status === "CONFIRMED";

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
                  <img
                    className="w-[56px] h-[54px] sm:w-[222px] sm:h-[213px] rounded-[10px] object-cover"
                    alt={firstItem?.productName}
                    src={firstItem?.productImage || "/image 4.png"}
                  />

                  <div className="flex flex-col items-start gap-2 sm:gap-3">
                    <div className="text-[14px] font-semibold text-[#4f4f4f]">
                      #{order.orderNumber}
                    </div>

                    <div className="text-[16px] font-semibold text-[#1a1713]">
                      {firstItem?.productName}
                    </div>

                    <div className="text-[14px] text-[#1a1713]">
                      {isArabic ? " العدد " : " Quantity: "}
                      <span className="font-semibold text-2xl">
                        {firstItem?.quantity}
                      </span>
                    </div>

                    <div className="text-[14px] text-[#1a1713]">
                      {isArabic ? "السعر :" : " Price: "}
                      <span className="font-semibold text-[#835f40] text-2xl">
                        {firstItem?.totalPrice}
                      </span>{" "}
                      <span className="text-[#835f40] text-lg">
                        {isArabic ? "ر.س" : "SAR"}
                      </span>
                    </div>

                    <div className="text-[14px] text-[#1a1713]">
                      {isArabic
                        ? "تاريخ التوصيل المتوقع :"
                        : " Expected Delivery: "}
                      <span className="font-semibold text-2xl">
                        {new Date(
                          order.expectedDeliveryDate
                        ).toLocaleDateString("ar-EG", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section: Status Badge */}
                <div className="flex sm:flex-col justify-end sm:justify-start">
                  <Badge
                    className={`${style.bg} ${style.color} inline-flex items-center justify-center gap-2 p-1 rounded-[10px] h-auto font-semibold text-[14px]`}
                  >
                    {isArabic ? style.label.ar : style.label.en}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Cancel Button */}
            {showCancel && (
              <Button
                variant="ghost"
                className="inline-flex items-center justify-start gap-3 h-auto p-0 hover:bg-transparent"
                onClick={() => handleOpenCancelDialog(order.orderNumber)}
              >
                <img
                  className="w-6 h-6"
                  alt="Close circle"
                  src="./close-circle.svg"
                />
                <span className="font-medium text-[#4f4f4f] text-[16px] whitespace-nowrap">
                  {isArabic ? "إلغاء الطلب" : "Cancel Order"}
                </span>
              </Button>
            )}
          </div>
        );
      })}

      {/* Cancel Order Dialog */}
      <DeletePopup
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        orderNumber={currentOrderNumber}
        handleCancelOrder={handleCancelOrder} // pass handler
      />
    </section>
  );
};
