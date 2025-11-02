import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/ProductsCard";
import { Button } from "../../../../components/ui/button";
import { HeartIcon, StarIcon } from "lucide-react";
import api from "../../../../Api/Axios"; 
import { useNavigate, useLocation } from "react-router-dom";
// ✅ adjust path if your api.js is elsewhere

const BestSelling = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get("/api/products/most-purchased"); // ✅ use your actual endpoint
        if (response.data.success) {
          const mappedOffers = response.data.data.map((item) => ({
            id: item.id,
            title: item.name,
            description: item.description,
           price: item.salePrice,
            oldPrice: item.price || item.salePrice,
            shop: item.vendorName,
            image: item.imageUrl || "/image 4.png",
            saleImage: "/004a6ad414299e763bb7bf9ba6361c15c394e6c8.gif",
             rating: item.averageRating, // static for now
            isOnSale : item.isOnSale
          }));
          setOffers(mappedOffers);
        }
      } catch (error) {
        console.error("❌ Failed to fetch offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-[#683800] font-semibold text-lg">جاري تحميل العروض...</p>
      </div>
    );
  }

  return (
    <section style={{ backgroundImage: "url('/image 37.png')" }}>
      <div className="pt-12 px-12 lg:px-32">
        {/* Header Section */}
      

        {/* Offer Cards */}
        <div
          className="
            flex flex-nowrap justify-start gap-8 py-6 bg-cover bg-center
            overflow-x-auto scrollbar-hide snap-x snap-mandatory
            sm:flex-wrap sm:justify-center sm:overflow-visible
          "
          style={{ scrollBehavior: "smooth" }}
        >
          {offers.map((offer) => (
            <Card
              key={offer.id}
              className="
                flex flex-col justify-between
                w-[240px] sm:w-[282px] flex-shrink-0
                rounded-[16px] border border-solid border-[#c3c3c3]
                sm:rounded-3xl sm:border sm:border-[#c3c3c3]
                overflow-hidden bg-white
                snap-center
              "
            >
              {/* Image */}
              <div className="relative w-full h-[160px] sm:h-[271px] rounded-t-[16px] overflow-hidden">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  alt={offer.title}
                  src={offer.image}
                />

                <div className="absolute top-2 right-2 sm:top-4 sm:right-3 flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ffffff33] rounded-full hover:bg-[#ffffff4d]"
                  >
                    <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-red-500" />
                  </Button>
                </div>

                  {offer.isOnSale && (
  <img
    className="absolute top-[90px] sm:top-[127px] left-1/2 -translate-x-1/2 w-[120px] sm:w-[194px] h-24 sm:h-36 object-cover"
    alt="Sale animation"
    src={offer.saleImage}
  />
)}
              </div>

              {/* Content */}
              <CardContent className="flex flex-col items-start gap-1 sm:gap-2 p-2 sm:p-4 flex-grow">
                <div className="w-full flex flex-col gap-1 sm:gap-3">
                  <div className="flex">
                    <div className="font-medium text-[#292929] text-xs sm:text-sm [font-family:'Cairo',Helvetica]">
                      {offer.shop}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <div className="font-bold text-[#1a1713] text-xs sm:text-base [font-family:'Cairo',Helvetica]">
                      {offer.title}
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <StarIcon className="w-4 h-4 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
                      <div className="font-bold text-[#1a1713] text-xs sm:text-base leading-4">
                        {offer.rating}
                      </div>
                    </div>
                  </div>

                  <div className="text-[#292929] text-xs sm:text-base leading-5 [font-family:'Cairo',Helvetica]">
                    {offer.description}
                  </div>
                </div>
              </CardContent>

              {/* Price Section */}
              <div className="mt-auto w-full bg-[#00000033]">
                <div className="w-full h-10 sm:h-14 bg-[#ffffff80] flex items-center justify-between px-2 sm:px-3 rounded-b-[16px] sm:rounded-b-[24px]">
                   <div className="flex flex-col items-end gap-0 sm:gap-1">
                    <div className="font-bold text-[#835f40] text-sm sm:text-lg">
                      {offer.oldPrice} <span className="font-medium">ر.س</span>
                    </div>
                    {offer.price && (
                      <div className="text-[#1a1713] text-[10px] sm:text-xs line-through">
                        {offer.oldPrice} ر.س
                      </div>
                    )}
                  </div>

                  <Button
                    className="group relative flex items-center justify-center bg-[#ffffff80] rounded-[50px] overflow-hidden transition-all duration-500 ease-in-out p-2 hover:bg-[#ffffffa0]"
                    style={{ width: "fit-content" }}
                  >
                    <div className="flex items-center justify-center transition-all duration-500 ease-in-out">
                      <img
                        src="/cart.svg"
                        alt="cart"
                        className="w-4 h-4 sm:w-6 sm:h-6 text-[#835f40] transition-transform duration-500 group-hover:translate-x-[-4px]"
                      />
                      <span className="max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out text-[#835f40] font-bold text-xs sm:text-base whitespace-nowrap [font-family:'Cairo',Helvetica] ml-0 group-hover:ml-2">
                        اشتري الآن
                      </span>
                    </div>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
