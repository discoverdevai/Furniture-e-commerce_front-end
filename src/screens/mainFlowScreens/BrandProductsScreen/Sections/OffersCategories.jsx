import React, { useState, useEffect, useCallback } from "react";
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
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";

export const OffersCategories = ({ storeName }) => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayOffers, setDisplayOffers] = useState([]);

  const breadcrumbItems = [
    {
      label: "المتاجر",
      href: "/stores",
      isActive: false,
      color: "text-[#a16a35]",
    },
    { label: storeName, href: "#", isActive: false, color: "text-[#a16a35]" },
    { label: "المنتجات", href: "#", isActive: true, color: "text-[#4f4f4f]" },
  ];

  // Fetch cart (backend if logged in, else localStorage)
  const fetchCart = useCallback(async () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const token = userData.token;
    if (token) {
      try {
        const res = await api.get("/api/cart/items");
        setCartItems(res.data?.data?.items || []);
      } catch {
        console.error("❌ Could not fetch cart items");
      }
    } else {
      setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
    }
  }, []);

  // Fetch products & wishlist
  useEffect(() => {
    const fetchProductsAndWishlist = async () => {
      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      const token = userData.token;
      try {
        const res = await api.get("/api/products");
        if (!res.data.success) throw new Error();
        // filter by store
        const filtered = res.data.data.products.filter(
          (p) => p.vendorName === storeName
        );
        let prods = filtered.map((item) => ({
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
          stock: item.stockQuantity ?? Infinity,
          isInWishlist: false,
          storeName: item.vendorName,
        }));

        if (token) {
          const wishRes = await api.get("/api/wishlist");
          const wishIds = wishRes.data?.data?.map((w) => w.productId) || [];
          prods = prods.map((p) => ({
            ...p,
            isInWishlist: wishIds.includes(p.id),
          }));
        } else {
          const guestWish = JSON.parse(localStorage.getItem("wishlist")) || [];
          prods = prods.map((p) => ({
            ...p,
            isInWishlist: guestWish.includes(p.id),
          }));
        }

        setOffers(prods);
      } catch (err) {
        console.error("❌ Failed to fetch offers:", err);
      } finally {
        setLoading(false);
        fetchCart();
      }
    };

    fetchProductsAndWishlist();
  }, [storeName, fetchCart]);

  // Compute remaining stock
  useEffect(() => {
    if (!offers.length) return;
    const withStock = offers.map((p) => {
      const inCart = cartItems.find((c) => c.productId === p.id)?.quantity || 0;
      return { ...p, stockLeft: Math.max(p.stock - inCart, 0) };
    });
    setDisplayOffers(withStock);
  }, [offers, cartItems]);

  // Toggle wishlist
  const handleToggleWishlist = async (productId) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const token = userData.token;
    if (token) {
      try {
        const current = offers.find((p) => p.id === productId).isInWishlist;
        if (current) await api.delete(`/api/wishlist/${productId}`);
        else await api.post(`/api/wishlist/${productId}`);
        setOffers((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
          )
        );
      } catch {
        console.error("❌ Wishlist toggle failed");
      }
    } else {
      setOffers((prev) => {
        const updated = prev.map((p) =>
          p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
        );
        const ids = updated.filter((p) => p.isInWishlist).map((p) => p.id);
        localStorage.setItem("wishlist", JSON.stringify(ids));
        return updated;
      });
    }
  };

  // Add to cart
  const handleAddToCart = async (productId, quantity = 1, variant = null) => {
    const prod = offers.find((p) => p.id === productId);
    const inCart =
      cartItems.find((c) => c.productId === productId)?.quantity || 0;
    if (inCart + quantity > prod.stock) {
      return Swal.fire({
        icon: "warning",
        title: isArabic ? "نفدت الكمية" : "Out of stock",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const token = userData.token;
    const cartItem = { productId, quantity, variant };

    if (token) {
      try {
        await api.post("/api/cart/add", cartItem);
        await fetchCart();
        Swal.fire({
          icon: "success",
          title: t("cartAlerts.success_title"),
          text: t("cartAlerts.added_successfully"),
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: t("cartAlerts.error"),
          text: t("cartAlerts.something_went_wrong"),
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      const ls = JSON.parse(localStorage.getItem("cart")) || [];
      const idx = ls.findIndex(
        (c) => c.productId === productId && c.variant === variant
      );
      if (idx > -1) ls[idx].quantity += quantity;
      else ls.push({ ...cartItem, product: prod });
      localStorage.setItem("cart", JSON.stringify(ls));
      setCartItems(ls);
      Swal.fire({
        icon: "success",
        title: t("cartAlerts.success_title"),
        text: t("cartAlerts.added_successfully"),
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const filters = [
    {
      label: "متوفر",
      icon: "checkbox",
      checked: false,
      textColor: "text-[#1a1713]",
    },
    {
      label: "النمط",
      icon: "arrow",
      checked: false,
      textColor: "text-[#1a1713]",
    },
    {
      label: "اللون",
      icon: "arrow",
      checked: false,
      textColor: "text-[#1a1713]",
    },
    {
      label: "الاعلى تقيما",
      icon: "arrow",
      checked: false,
      textColor: "text-[#1a1713]",
    },
    {
      label: "السعر",
      icon: "arrow",
      checked: false,
      textColor: "text-[#1a1713]",
    },
    {
      label: "العروض و التخفيضات",
      icon: "checkbox",
      checked: true,
      textColor: "text-[#835f40]",
    },
  ];

  const handleCardClick = (productId) => {
    navigate(`/product-details/${productId}/${storeName}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-12 h-12 text-[#683800] animate-spin mb-3" />
        <p className="text-[#683800] font-semibold text-xl">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-6 relative">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList className="flex items-center gap-2">
          {breadcrumbItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                {item.isActive ? (
                  <BreadcrumbPage
                    className={`font-[Cairo] text-[16px] ${item.color}`}
                  >
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    className={`font-[Cairo] text-[16px] ${item.color}`}
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {idx < breadcrumbItems.length - 1 && (
                <BreadcrumbSeparator>
                  {isArabic ? (
                    <ChevronLeftIcon className="w-6 h-6" />
                  ) : (
                    <ChevronRightIcon className="w-6 h-6" />
                  )}
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

      {/* Filters (unchanged) */}
      <div
        className={`hidden md:flex self-stretch w-full rounded-[10px] items-center relative ${
          isArabic ? "divide-x" : "divide-x-reverse"
        } divide-[#c3c3c3]`}
      >
        {filters.map((filter, i) => {
          const isFirst = i === 0,
            isLast = i === filters.length - 1;
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
              key={i}
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
        {displayOffers.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            لا توجد منتجات حالياً
          </div>
        ) : (
          displayOffers.map((prod) => (
            <div
              key={prod.id}
              onClick={() => handleCardClick(prod.id)}
              className="cursor-pointer"
            >
              <GlobalProductCard
                {...prod}
                stock={prod.stockLeft}
                disabled={prod.stockLeft === 0}
                isRTL={isArabic}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
