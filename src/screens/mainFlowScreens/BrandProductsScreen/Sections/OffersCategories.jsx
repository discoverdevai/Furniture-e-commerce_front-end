import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "lucide-react";
import { Checkbox } from "../../../../components/ui/OffersCategoriesCheckBox";
import { useTranslation } from "react-i18next";
import { MobileCategorySection } from "./MobileCategorySection/MobileCategorySection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/ui/BreadCrumbs";
import { GlobalProductCard } from "../../../../components/ui/GlobalProductCard";
import api from "../../../../Api/Axios"; 
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";


export const OffersCategories = ({ storeName }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

const handleCardClick = (productId,storeName) => {
  navigate(`/product-details/${productId}/${storeName}`);
};

  const [offers, setOffers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { label: "المتاجر", href: "/stores", isActive: false, color: "text-[#a16a35]" },
    { label: storeName, href: "#", isActive: false, color: "text-[#a16a35]" },
    { label: "المنتجات", href: "#", isActive: true, color: "text-[#4f4f4f]" },
  ];

  // Fetch products + wishlist
  useEffect(() => {
    const fetchProductsAndWishlist = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;
      try {
        const res = await api.get("/api/products");
        if (res.data?.success && res.data?.data?.products) {
          const filtered = res.data.data.products.filter(
            (p) => p.vendorName === storeName
          );
          // map products
          const products = filtered.map((item) => ({
            id: item.id,
            title: item.name,
            description: item.description,
            price: item.price,
            oldPrice: item.originalPrice,
            shop: item.vendorName,
            image: item.imageUrl || "/image 50.png",
            saleImage: "/sale.gif",
            rating: item.averageRating ?? "—",
            isOnSale: item.isOnSale,
            isInWishlist: false,
          }));

          if (token) {
            const wishlistRes = await api.get("/api/wishlist");
            const wishlistIds = wishlistRes.data?.data?.map((w) => w.productId) || [];
            const syncedProducts = products.map((p) => ({
              ...p,
              isInWishlist: wishlistIds.includes(p.id),
            }));
            setOffers(syncedProducts);
          } else {
            const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            const syncedProducts = products.map((p) => ({
              ...p,
              isInWishlist: storedWishlist.includes(p.id),
            }));
            setOffers(syncedProducts);
          }
        }
      } catch (error) {
        console.error("❌ Failed to fetch offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsAndWishlist();
  }, [storeName]);

  // Wishlist toggle
  const handleToggleWishlist = async (productId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (token) {
      try {
        const product = offers.find((p) => p.id === productId);
        if (product.isInWishlist) await api.delete(`/api/wishlist/${productId}`);
        else await api.post(`/api/wishlist/${productId}`);

        setOffers((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
          )
        );
      } catch (error) {
        console.error("❌ Wishlist toggle failed:", error);
      }
    } else {
      setOffers((prev) => {
        const updated = prev.map((p) =>
          p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
        );
        const updatedWishlistIds = updated.filter((p) => p.isInWishlist).map((p) => p.id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlistIds));
        return updated;
      });
    }
  };

  // Add to cart
  const handleAddToCart = async (productId, quantity = 1, variant = null) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    const cartItem = { productId, quantity, variant };

    if (token) {
      try {
        await api.post("/api/cart/add", cartItem);
        setCartItems((prev) => [...prev, cartItem]);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const productData = offers.find((p) => p.id === productId);
      const localCartItem = { ...cartItem, product: productData };

      const existingIndex = existingCart.findIndex(
        (item) => item.productId === productId && item.variant === variant
      );

      if (existingIndex > -1) existingCart[existingIndex].quantity += quantity;
      else existingCart.push(localCartItem);

      localStorage.setItem("cart", JSON.stringify(existingCart));
      setCartItems(existingCart);
    }
  };

  const filters = [
    { label: "متوفر", icon: "checkbox", checked: false, textColor: "text-[#1a1713]" },
    { label: "النمط", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
    { label: "اللون", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
    { label: "الاعلى تقيما", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
    { label: "السعر", icon: "arrow", checked: false, textColor: "text-[#1a1713]" },
    { label: "العروض و التخفيضات", icon: "checkbox", checked: true, textColor: "text-[#835f40]" },
  ];

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <p className="text-[#683800] font-semibold text-lg">جاري التحميل...</p>
    </div>
  );

  return (
    <div className="flex flex-col items-start gap-6 relative">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2">
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.isActive ? (
                  <BreadcrumbPage className={`font-[Cairo] text-[16px] ${item.color}`}>
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href} className={`font-[Cairo] text-[16px] ${item.color}`}>
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator>
                  {isArabic ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Mobile Categories */}
      <div className="block md:hidden mx-auto">
        <MobileCategorySection />
      </div>

      {/* Filters */}
      <div className={`hidden md:flex self-stretch w-full rounded-[10px] items-center relative ${isArabic ? "divide-x" : "divide-x-reverse"} divide-[#c3c3c3]`}>
        {filters.map((filter, index) => {
          const isFirst = index === 0;
          const isLast = index === filters.length - 1;

          let roundedClass = "";
          if (isArabic) {
            if (isFirst) roundedClass = "rounded-[0px_10px_10px_0px]";
            else if (isLast) roundedClass = "rounded-[10px_0px_0px_10px]";
          } else {
            if (isFirst) roundedClass = "rounded-[10px_0px_0px_10px]";
            else if (isLast) roundedClass = "rounded-[0px_10px_10px_0px]";
          }

          return (
            <button
              key={index}
              className={`flex-1 h-12 justify-between px-3 py-4 ${roundedClass} border border-solid border-[#c3c3c3] flex items-center relative cursor-pointer bg-transparent hover:bg-gray-50 transition-colors`}
            >
              <div className={`${filter.textColor} relative w-fit`}>
                {filter.label}
              </div>
              {filter.icon === "checkbox" ? (
                <Checkbox checked={filter.checked} className="w-6 h-6" />
              ) : (
                <ChevronDownIcon className="w-6 h-6" />
              )}
            </button>
          );
        })}
      </div>

      {/* Product Cards */}
      <div className="w-full flex flex-wrap justify-center gap-6 py-10">
        {offers.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">لا توجد منتجات حالياً</div>
        ) : (
          offers.map((product) => (
            <button onClick={() => handleCardClick(product.id,storeName)}>
               <GlobalProductCard
              key={product.id}
              {...product}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
               
            />
            </button>
           
          ))
        )}
      </div>
    </div>
  );
};
