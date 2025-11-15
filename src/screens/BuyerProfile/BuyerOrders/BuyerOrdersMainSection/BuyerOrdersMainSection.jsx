import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProfileOrderCard } from "../../../../components/ui/ProfileOrderCard";
import { ProfileSideBar } from "../../../../components/ProfileSideBar";
import { AppNavbar } from "../../../../components/Layout/Navbar";
import { ProfileBreadcrumb } from "../../../../components/ProfileBreadcrumb";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useMediaQuery } from "@mui/material";

const ordersData = {
  current: [
    {
      id: "123a",
      status: "inProgress",
      title_ar: "أريكة - تصميم عملي ومعتزي",
      title_en: "Sofa - Practical and Stylish Design",
      quantity: 1,
      price: 3000,
      deliveryDate_ar: "30 يونيو 2025",
      deliveryDate_en: "June 30, 2025",
      imageUrl:
        "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ],
  previous: [
    {
      id: "123b",
      status: "completed",
      title_ar: "كرسي - تصميم فاخر",
      title_en: "Chair - Luxury Design",
      quantity: 1,
      price: 1500,
      deliveryDate_ar: "25 مايو 2025",
      deliveryDate_en: "May 25, 2025",
      imageUrl:
        "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "123c",
      status: "cancelled",
      title_ar: "طاولة - تصميم حديث",
      title_en: "Table - Modern Design",
      quantity: 1,
      price: 1000,
      deliveryDate_ar: "15 يونيو 2025",
      deliveryDate_en: "June 15, 2025",
      imageUrl:
        "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ],
};

export const BuyerOrdersMainSection = () => {
  const [activeTab, setActiveTab] = useState("current");
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <section
      className="bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
    >
      <div className="w-full pt-3">
        <div className="max-w-[1440px] mx-auto">
          <AppNavbar />
        </div>
      </div>
      <div
        className={`flex flex-col w-full  max-w-[1200px] gap-2 mx-auto items-start mt-4`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {isMobile ? (
          <div
            className={`relative flex items-center justify-center w-full  ${
              isArabic ? "" : ""
            }`}
          >
            {/* Back Button */}
            <IconButton
              onClick={handleBackClick}
              edge="start"
              className={`!p-2 absolute ${isArabic ? "right-2" : "left-2"} `}
            >
              <img
                src="/breadcrumb-arrow.svg"
                alt="breadcrumb arrow"
                className={`w-6 h-6 ${isArabic ? "rotate-180" : ""}`}
                style={{ filter: "brightness(0) saturate(100%)" }}
              />
            </IconButton>

            {/* Title */}
            <h4 className="text-center text-xl font-medium text-[#1A1713] font-[cairo] mx-auto">
              {t("sidebar.orders")}
            </h4>
          </div>
        ) : (
          <ProfileBreadcrumb />
        )}

        <div
          className={`flex items-start justify-between gap-6 w-full ${
            isArabic ? "flex-row" : ""
          }`}
        >
          {!isMobile && <ProfileSideBar />}{" "}
          <main className="flex flex-col w-full max-w-[894px] gap-10">
            <div className="flex items-center justify-between w-full">
              {/* <button className="font-h5-regular text-[#4f4f4f] hover:text-[#835f40]">
                {t("orders.favorites")}
              </button> */}
              {!isMobile && (
                <h2 className="font-[cairo] font-semibold text-[32px] text-[#1a1713]">
                  {t("orders.title")}
                </h2>
              )}
            </div>

            <div className="flex items-center justify-start gap-4 w-full border-b border-[#e0e0e0]">
              <button
                onClick={() => setActiveTab("previous")}
                className={`pb-3 px-6 font-h4-medium ${
                  activeTab === "previous"
                    ? "text-[#835f40] border-b-2 border-[#835f40]"
                    : "text-[#4f4f4f]"
                }`}
              >
                {t("orders.previous")}
              </button>

              <button
                onClick={() => setActiveTab("current")}
                className={`pb-3 px-6 font-h4-medium ${
                  activeTab === "current"
                    ? "text-[#835f40] border-b-2 border-[#835f40]"
                    : "text-[#4f4f4f]"
                }`}
              >
                {t("orders.current")}
              </button>
            </div>

            <div
              className={`flex flex-col gap-6 w-full ${
                isArabic ? "items-end" : "items-start"
              }`}
            >
              {ordersData[activeTab].map((order, index) => (
                <ProfileOrderCard
                  key={index}
                  {...order}
                  title={isArabic ? order.title_ar : order.title_en}
                  deliveryDate={
                    isArabic ? order.deliveryDate_ar : order.deliveryDate_en
                  }
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};
