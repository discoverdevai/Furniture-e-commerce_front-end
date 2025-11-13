import React, { useEffect, useState } from "react";
import api from "../../../Api/Axios"; // adjust path if needed
import { OrderStatusSection } from "./sections/OrderStatusSection";
import { OrderSummarySection } from "./sections/OrderSummarySection";
import { ProductDetailsSection } from "./sections/ProductDetailsSection";
import { FooterSection } from "../../../components/Layout/FooterSection";
import { AppNavbar } from "../../../components/Layout/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../components/ui/Tabs";

export const PreviousOrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/api/buyer/orders/history");
        if (response.data.success) {
          setOrders(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Split orders by status
  const currentOrders = orders.filter(
    (o) => o.status === "PENDING" || o.status === "DELIVERING"
  );
  const previousOrders = orders.filter(
    (o) => o.status === "DELIVERED" || o.status === "CANCELLED" || o.status === "SHIPPED"
  );

  return (
    <div
      className="font-cairo min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')", fontFamily: "'Cairo',Helvetica" }}
    >
      <AppNavbar />

      <div className="flex flex-col items-start w-full mx-auto gap-5 pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20 mb-20">
        <ProductDetailsSection />

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
              الطلبات السابقة
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
              الطلبات الحالية
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="w-full">
            {loading ? (
              <div className="text-center text-gray-600 py-10">جاري التحميل...</div>
            ) : (
              <OrderStatusSection orders={currentOrders} />
            )}
          </TabsContent>

          <TabsContent value="previous" className="w-full">
            {loading ? (
              <div className="text-center text-gray-600 py-10">جاري التحميل...</div>
            ) : (
              <OrderStatusSection orders={previousOrders} />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <FooterSection />
    </div>
  );
};
