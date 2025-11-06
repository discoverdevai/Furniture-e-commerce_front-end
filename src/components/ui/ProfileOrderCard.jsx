import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";

const statusColors = {
  completed: "bg-[#f4f9f4] text-[#4caf50]",
  inProgress: "bg-[#fff8e1] text-[#ffa726]",
  cancelled: "bg-[#fce4ec] text-[#e91e63]",
};

export const ProfileOrderCard = ({
  status,
  title,
  quantity,
  price,
  deliveryDate,
  imageUrl,
  onViewDetails,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className={`flex flex-col gap-6 p-6 w-full rounded-[10px] border border-[#e0e0e0] bg-white ${
        isArabic ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <div className="flex items-start justify-between w-full">
        <div className={`px-3 py-1 rounded-[5px] ${statusColors[status]}`}>
          <span className="font-h5-regular">
            {t(`orders.status.${status}`)}
          </span>
        </div>

        <div className="font-h5-regular text-[#4f4f4f]">#123a</div>
      </div>

      <div
        className={`flex items-start gap-6 w-full ${
          isArabic ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex flex-col gap-3 flex-1 ${
            isArabic ? "items-end" : "items-start"
          }`}
        >
          <h3 className="font-h3-semibold text-[#1a1713]">{title}</h3>

          <div
            className={`flex flex-col gap-2 w-full ${
              isArabic ? "items-end" : "items-start"
            }`}
          >
            <span className="font-placeholder text-[#4f4f4f]">
              {isArabic
                ? `${quantity} : ${t("orders.quantity")}`
                : `${t("orders.quantity")} : ${quantity}`}
            </span>

            <span className="font-placeholder text-[#4f4f4f]">
              {isArabic
                ? `ر.س ${price} : ${t("orders.price")}`
                : `${t("orders.price")} : ${price} SAR`}
            </span>

            <span className="font-placeholder text-[#4f4f4f]">
              {isArabic
                ? `${deliveryDate} : ${t("orders.deliveryDate")}`
                : `${t("orders.deliveryDate")} : ${deliveryDate}`}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="font-h4-medium text-[#1a1713]">
              {t("orders.now")}
            </span>
          </div>
        </div>

        <div className="w-[120px] h-[120px] rounded-[10px] overflow-hidden bg-[#f5f5f5] flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <Button
        onClick={onViewDetails}
        variant="ghost"
        className="flex items-center gap-2 h-auto p-0 hover:bg-transparent"
      >
        <Eye className="w-5 h-5 text-[#835f40]" />
        <span className="font-h5-regular text-[#835f40]">
          {t("orders.viewDetails")}
        </span>
      </Button>
    </div>
  );
};
