import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppNavbar } from "../../../../components/Layout/Navbar";
import { ProfileSideBar } from "../../../../components/ProfileSideBar";
import { ProfileBreadcrumb } from "../../../../components/ProfileBreadcrumb";
import { GlobalProductCard } from "../../../../components/ui/GlobalProductCard";
import { Button } from "../../../../components/ui/button";
import api from "../../../../Api/Axios";

export const BuyerWishListMainSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [displayWishlist, setDisplayWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch wishlist + cart
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = userData?.token;

        if (token) {
          // Logged-in user
          const [wishlistResp, cartResp] = await Promise.all([
            api.get("/api/wishlist"),
            api.get("/api/cart/items"),
          ]);

          const wishlistData = wishlistResp.data.data || [];
          const cartData = cartResp.data.data.items || [];

          const mappedWishlist = wishlistData.map((item) => ({
            id: item.product.id,
            title: item.product.name,
            description: item.product.description,
            price: item.product.salePrice || item.product.price,
            oldPrice: item.product.isOnSale ? item.product.originalPrice : null,
            shop: item.product.vendorName,
            image: item.product.imageUrl || "/image 4.png",
            rating: item.product.averageRating,
            isOnSale: item.product.isOnSale,
            isInWishlist: true,
            stock: item.product.stockQuantity,
          }));

          setWishlistItems(mappedWishlist);
          setCartItems(cartData);
        } else {
          // Guest user
          const wishlistIds =
            JSON.parse(localStorage.getItem("wishlist")) || [];
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];

          const productsResponse = await api.get("/api/products");
          const allProducts = productsResponse.data.data.products || [];

          const filteredWishlist = allProducts
            .filter((p) => wishlistIds.includes(p.id))
            .map((p) => ({
              id: p.id,
              title: p.name,
              description: p.description,
              price: p.salePrice || p.price,
              oldPrice: p.isOnSale ? p.originalPrice : null,
              shop: p.vendorName,
              image: p.imageUrl || "/image 4.png",
              rating: p.averageRating,
              isOnSale: p.isOnSale,
              isInWishlist: true,
              stock: p.stockQuantity,
            }));

          setWishlistItems(filteredWishlist);
          setCartItems(localCart);
        }
      } catch (err) {
        console.error("Error fetching wishlist/cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Recalculate stockLeft whenever cart or wishlist changes
  useEffect(() => {
    if (wishlistItems.length === 0) {
      setDisplayWishlist([]);
      return;
    }

    const updated = wishlistItems.map((p) => {
      const qtyInCart =
        cartItems.find((c) => c.productId === p.id)?.quantity || 0;

      return { ...p, stockLeft: Math.max(p.stock - qtyInCart, 0) };
    });

    setDisplayWishlist(updated);
  }, [cartItems, wishlistItems]);

  // ✅ Toggle wishlist item
  const handleToggleWishlist = async (productId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (token) {
      try {
        const target = wishlistItems.find((p) => p.id === productId);
        if (target?.isInWishlist) {
          await api.delete(`/api/wishlist/${productId}`);
          setWishlistItems((prev) => prev.filter((p) => p.id !== productId));
        } else {
          await api.post(`/api/wishlist/${productId}`);
          setWishlistItems((prev) => [
            ...prev,
            { ...target, isInWishlist: true },
          ]);
        }
      } catch (err) {
        console.error("Error toggling wishlist:", err);
      }
    } else {
      // Guest logic
      const updated = wishlistItems.map((p) =>
        p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
      );
      const updatedIds = updated.filter((p) => p.isInWishlist).map((p) => p.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedIds));
      setWishlistItems(updated);
    }
  };

  // ✅ Add to cart
  const handleAddToCart = async (productId, quantity = 1, variant = null) => {
    const product = wishlistItems.find((p) => p.id === productId);
    const alreadyInCart =
      cartItems.find((c) => c.productId === productId)?.quantity || 0;

    if (alreadyInCart >= product.stock) {
      alert("الكمية المطلوبة أكبر من المخزون / Out of stock");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (token) {
      try {
        await api.post("/api/cart/add", { productId, quantity, variant });
        setCartItems((prev) => {
          const existingItem = prev.find(
            (item) => item.productId === productId
          );
          if (existingItem) {
            return prev.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            return [...prev, { productId, quantity, variant }];
          }
        });
      } catch (err) {
        console.error("Add to cart failed:", err);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingIndex = localCart.findIndex(
        (c) => c.productId === productId && c.variant === variant
      );

      if (existingIndex > -1) {
        localCart[existingIndex].quantity += quantity;
      } else {
        localCart.push({ productId, quantity, variant });
      }

      localStorage.setItem("cart", JSON.stringify(localCart));
      setCartItems(localCart);
    }
  };

  // ✅ Loading view
  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-[#683800] font-semibold text-lg">
          جاري تحميل قائمة المفضلة...
        </p>
      </div>
    );

  // ✅ UI rendering
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
        className={`flex flex-col w-full max-w-[1200px] gap-8 mx-auto items-start mt-4`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {isMobile ? (
          <div className="relative flex items-center justify-center w-full">
            <IconButton
              onClick={() => navigate(-1)}
              edge="start"
              className={`!p-2 absolute ${isArabic ? "right-3" : "left-2"}`}
            >
              <img
                src="/breadcrumb-arrow.svg"
                alt="breadcrumb arrow"
                className={`w-6 h-6 ${isArabic ? "rotate-180" : ""}`}
              />
            </IconButton>
            <h4 className="text-center text-xl font-medium text-[#1A1713] font-[cairo] mx-auto">
              {t("sidebar.favorites")}
            </h4>
          </div>
        ) : (
          <ProfileBreadcrumb />
        )}

        <div className="flex items-start justify-between gap-6 w-full">
          {/* {!isMobile && <ProfileSideBar />} */}

          <main
            className={`flex flex-col w-full max-w-[894px] gap-10 ${
              isMobile && "mt-5"
            }`}
          >
            {!isMobile && (
              <h2 className="font-[cairo] font-semibold text-[32px] text-[#1a1713]">
                {t("wishlist.title")}
              </h2>
            )}

            {displayWishlist.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <p className="text-[#1a1713] text-lg font-medium font-[cairo]">
                  {isArabic
                    ? "لا توجد منتجات في المفضلة حاليًا"
                    : "No products in your wishlist currently"}
                </p>
                <Button
                  className="mt-6 w-[50%] font-[cairo] text-[#ffffff] hover:bg-[#835f40] bg-[#835f40]"
                  onClick={() => navigate("/home")}
                >
                  {isArabic ? "تصفح المنتجات" : "Browse Products"}
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
                {displayWishlist.map((item) => (
                  <GlobalProductCard
                    key={item.id}
                    {...item}
                    stock={item.stockLeft} // remaining stock
                    disabled={item.stockLeft === 0} // disable if no stock
                    isRTL={isArabic} // pass RTL info
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};
