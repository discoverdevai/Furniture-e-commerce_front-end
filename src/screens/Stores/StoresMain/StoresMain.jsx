import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { AppNavbar } from "../../../components/Layout/Navbar";
import api from "../../../Api/Axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGlobalValue } from "../../../Store/Store";
import { useMediaQuery } from "@mui/material";
import { MobileCategorySection } from "./MobileCategorySection/MobileCategorySection";

export const StoresMain = () => {
  const dispatch = useDispatch();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await api.get("/api/vendors");

        // ✅ Adjusted based on your new API shape
        if (response.data.success && Array.isArray(response.data.data)) {
          setVendors(response.data.data);
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleCardClick = (name) => {
    const encodedName = encodeURIComponent(name);
    navigate(`/store/${encodedName}`);
    dispatch(setGlobalValue({ key: "storeName", value: name }));
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

      {/* ✅ Mobile-only header section */}
      <div className={`${isMobile ? "block mx-auto" : "hidden"}`}>
        <MobileCategorySection />
      </div>

      <div className="flex flex-wrap gap-6 justify-center px-[120px] py-20 sm:px-[40px] xs:px-4">
        {loading ? (
          <p className="text-white text-lg">جاري التحميل...</p>
        ) : vendors.length > 0 ? (
          vendors.map((vendor, index) => (
            <Card
              key={vendor.id || index}
              onClick={() =>
                handleCardClick(vendor.businessNameAr || vendor.businessName)
              }
              className="
                cursor-pointer overflow-hidden border-0 shadow-none
                transition-transform duration-300 hover:scale-105
                w-[159px] h-[151px] rounded-[8px] opacity-100 rotate-0
                sm:w-[282px] sm:h-[282px] sm:rounded-3xl
              "
            >
              <CardContent className="p-0 relative w-full h-full flex flex-col items-center justify-end">
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  alt={vendor.businessName}
                  src={
                    vendor.tradeLicenseUrl && vendor.tradeLicenseUrl !== ""
                      ? vendor.tradeLicenseUrl
                      : "/stores-icon.png"
                  }
                />

                <div className="flex flex-col w-full items-center justify-center relative z-10">
                  <div
                    className="
                    h-10 sm:h-12 gap-1 p-2 w-full
                    bg-[#ffffff33] rounded-b-[8px] sm:rounded-b-[24px]
                    backdrop-blur-[10px] flex items-center justify-center
                  "
                  >
                    <div className="text-white text-xs sm:text-base font-semibold text-center whitespace-nowrap [direction:rtl]">
                      {vendor.businessNameAr || vendor.businessName}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-white text-lg">لا توجد متاجر متاحة حالياً</p>
        )}
      </div>
    </section>
  );
};
