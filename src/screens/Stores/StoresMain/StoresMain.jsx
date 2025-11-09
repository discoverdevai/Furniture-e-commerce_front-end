import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { AppNavbar } from "../../../components/Layout/Navbar";
import api from "../../../Api/Axios";
import { useNavigate } from "react-router-dom";

export const StoresMain = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await api.get("/api/products/vendor");
        if (response.data.success && response.data.data?.vendors) {
          setVendors(response.data.data.vendors);
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
    const encodedName = encodeURIComponent(name); // encode Arabic names safely
    navigate(`/store/${encodedName}`);
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

      <div className="flex flex-wrap gap-6 justify-center px-[120px] py-20">
        {loading ? (
          <p className="text-white text-lg">جاري التحميل...</p>
        ) : vendors.length > 0 ? (
          vendors.map((vendor, index) => (
            <Card
              key={index}
              onClick={() =>
                handleCardClick(vendor.businessNameAr || vendor.businessName)
              }
              className="w-[282px] h-[282px] overflow-hidden rounded-3xl border-0 shadow-none cursor-pointer hover:scale-105 transition-transform duration-300"
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
                  <div className="h-12 gap-2 p-2 w-full bg-[#ffffff33] rounded-[0px_0px_24px_24px] backdrop-blur-[10px] backdrop-brightness-[100%] flex items-center justify-center">
                    <div className="relative w-fit font-h-3 font-[number:var(--h-3-font-weight)] text-[#fefefe] text-[length:var(--h-3-font-size)] text-center tracking-[var(--h-3-letter-spacing)] leading-[var(--h-3-line-height)] whitespace-nowrap [direction:rtl] [font-style:var(--h-3-font-style)]">
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
