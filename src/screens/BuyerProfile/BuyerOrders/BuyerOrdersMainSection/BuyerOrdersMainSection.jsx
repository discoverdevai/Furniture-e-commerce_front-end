import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ProfileOrderCard } from "../../../../components/ui/ProfileOrderCard";
import { ProfileSideBar } from "../../../../components/ProfileSideBar";
import { AppNavbar } from "../../../../components/Layout/Navbar";
import { ProfileBreadcrumb } from "../../../../components/ProfileBreadcrumb";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import api from "../../../../Api/Axios";
import { ProductDetailsSection } from "../../../mainFlowScreens/PreviousOrdersScreen/sections/ProductDetailsSection";
import { OrderStatusSection } from "../../../mainFlowScreens/PreviousOrdersScreen/sections/OrderStatusSection";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../../components/ui/Tabs";

export const BuyerOrdersMainSection = () => {
  const [orders, setOrders] = useState([]); // all orders
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  // 1️⃣ Fetch order history on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/buyer/orders/history", {
          params: { page: 0, size: 1000 },
        });
        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 3️⃣ Split into tabs
  const currentOrders = orders.filter((o) =>
    ["PENDING", "DELIVERING", "CONFIRMED"].includes(o.status.toUpperCase())
  );
  const previousOrders = orders.filter((o) =>
    ["DELIVERED", "CANCELLED", "SHIPPED"].includes(o.status.toUpperCase())
  );
  const listToShow = activeTab === "current" ? currentOrders : previousOrders;

  const handleBackClick = () => navigate(-1);

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
        className="flex flex-col w-full max-w-[1200px] gap-2 mx-auto items-start mt-4"
        dir={isArabic ? "rtl" : "ltr"}
      >
        {isMobile ? (
          <div className="relative flex items-center justify-center w-full">
            <IconButton
              onClick={handleBackClick}
              edge="start"
              className={`!p-2 absolute ${isArabic ? "right-2" : "left-2"}`}
            >
              <img
                src="/breadcrumb-arrow.svg"
                alt="breadcrumb arrow"
                className={`w-6 h-6 ${isArabic ? "rotate-180" : ""}`}
                style={{ filter: "brightness(0) saturate(100%)" }}
              />
            </IconButton>
            <h4 className="text-center text-xl font-medium text-[#1A1713] font-[cairo] mx-auto">
              {t("sidebar.orders")}
            </h4>
          </div>
        ) : (
          <ProfileBreadcrumb />
        )}

        <div className="flex items-start justify-between gap-6 w-full">
          {!isMobile && <ProfileSideBar />}

          <main className="flex flex-col w-full max-w-[894px] gap-5">
            {!isMobile && (
              <h2 className="font-[cairo] font-semibold text-[32px] text-[#1a1713]">
                {t("orders.title")}
              </h2>
            )}

            <div className="flex flex-col items-start w-full mx-auto gap-5 pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20 mb-20">
              <Tabs defaultValue="current" className="w-full">
                <TabsList className="w-full h-auto grid grid-cols-2 bg-transparent rounded-none p-0 gap-0">
                  <TabsTrigger
                    value="previous"
                    className="flex-1 items-center justify-center gap-2 p-4 border-b-2 border-[#c3c3c3] bg-transparent rounded-none 
                            data-[state=active]:bg-transparent data-[state=active]:shadow-none 
                            data-[state=active]:border-b-2 
                            data-[state=active]:[border-image:linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)_1] 
                            font-[Cairo] font-semibold text-[16px] lg:text-[24px] leading-[100%] tracking-[0%] text-center 
                            text-[#4f4f4f] data-[state=active]:text-[#835f40] whitespace-nowrap"
                  >
                    {isArabic ? "الطلبات السابقة" : "Previous Orders"}{" "}
                  </TabsTrigger>

                  <TabsTrigger
                    value="current"
                    className="flex-1 items-center justify-center gap-2 p-4 border-b-2 border-transparent bg-transparent rounded-none 
                            data-[state=active]:bg-transparent data-[state=active]:shadow-none 
                            data-[state=active]:border-b-2 
                            data-[state=active]:[border-image:linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)_1] 
                            font-[Cairo] font-semibold text-[16px] lg:text-[24px] leading-[100%] tracking-[0%] text-center 
                            text-[#4f4f4f] data-[state=active]:text-[#835f40] whitespace-nowrap"
                  >
                    {isArabic ? "الطلبات الحالية" : "Current Orders"}{" "}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="previous" className="w-full">
                  {loading ? (
                    <div className="text-center text-gray-600 py-10">
                      {isArabic ? "جاري التحميل..." : "Loading..."}
                    </div>
                  ) : (
                    <OrderStatusSection orders={previousOrders} />
                  )}
                </TabsContent>
                <TabsContent value="current" className="w-full">
                  {loading ? (
                    <div className="text-center text-gray-600 py-10">
                      {isArabic ? "جاري التحميل..." : "Loading..."}
                    </div>
                  ) : (
                    <OrderStatusSection orders={currentOrders} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};
