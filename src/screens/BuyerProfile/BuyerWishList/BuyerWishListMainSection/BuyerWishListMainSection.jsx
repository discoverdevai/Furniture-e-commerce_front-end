import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
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
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;

      try {
        if (token) {
          // 🟢 Logged-in user → Fetch wishlist from backend
          const response = await api.get("/api/wishlist");
          const wishlistData = response.data.data || [];

          const mapped = wishlistData.map((item) => ({
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
          }));

          setWishlistItems(mapped);
        } else {
          // 🔵 Guest user → Fetch all products and filter by wishlist IDs
          const wishlistIds =
            JSON.parse(localStorage.getItem("wishlist")) || [];
          if (wishlistIds.length === 0) {
            setWishlistItems([]);
            return;
          }

          const productsResponse = await api.get("/api/products");
          const allProducts = productsResponse.data.data.products || [];
          console.log("All Products:", allProducts);

          const filtered = allProducts
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
            }));

          setWishlistItems(filtered);
        }
      } catch (error) {
        console.error("❌ Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, []);

  // ---------------------------------------------------------------------------------
  // 💖 Toggle Wishlist Logic (Both Modes)
  // ---------------------------------------------------------------------------------
  const handleToggleWishlist = async (productId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (token) {
      try {
        const product = wishlistItems.find((p) => p.id === productId);

        if (product.isInWishlist) {
          // DELETE from backend
          await api.delete(`/api/wishlist/${productId}`);
          setWishlistItems((prev) => prev.filter((p) => p.id !== productId));
        } else {
          // ADD to backend
          await api.post(`/api/wishlist/${productId}`);
          setWishlistItems((prev) =>
            prev.map((p) =>
              p.id === productId ? { ...p, isInWishlist: true } : p
            )
          );
        }
      } catch (error) {
        console.error("❌ Wishlist toggle failed:", error);
      }
    } else {
      // 🔵 Guest mode
      setWishlistItems((prev) => {
        const updated = prev.map((p) =>
          p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
        );
        const updatedWishlistIds = updated
          .filter((p) => p.isInWishlist)
          .map((p) => p.id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlistIds));
        return updated.filter((p) => p.isInWishlist); // remove unhearted products
      });
    }
  };

  // ---------------------------------------------------------------------------------
  // 🛒 Add to Cart Logic (Both Modes)
  // ---------------------------------------------------------------------------------
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
      const productData = wishlistItems.find((p) => p.id === productId);

      const localCartItem = {
        ...cartItem,
        product: productData,
      };

      const existingIndex = existingCart.findIndex(
        (item) => item.productId === productId && item.variant === variant
      );

      if (existingIndex > -1) {
        existingCart[existingIndex].quantity += quantity;
      } else {
        existingCart.push(localCartItem);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      setCartItems(existingCart);
    }
  };

  // ---------------------------------------------------------------------------------
  // 🧾 Render Section
  // ---------------------------------------------------------------------------------
  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-[#683800] font-semibold text-lg">
          جاري تحميل قائمة المفضلة...
        </p>
      </div>
    );

  return (
    <section
      className="bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
    >
      <div className="w-full pt-3">
        <div className="max-w-[1440px] mx-auto ">
          <AppNavbar />
        </div>
      </div>

      <div
        className={`flex flex-col w-full max-w-[1200px] gap-8 mx-auto items-start mt-4`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {!isMobile && <ProfileBreadcrumb />}

        <div className={`flex items-start justify-between gap-6 w-full`}>
          {!isMobile && <ProfileSideBar />}

          <main className="flex flex-col w-full max-w-[894px] gap-10">
            <h2 className="font-[cairo] font-semibold text-[32px] text-[#1a1713]">
              {t("wishlist.title")}
            </h2>

            {wishlistItems.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <p className="text-[#1a1713] text-lg font-medium">
                  لا توجد منتجات في المفضلة حاليًا
                </p>
                <Button
                  className="mt-6 w-[50%] font-[cairo] text-[#ffffff] hover:bg-[#835p40] bg-[#835f40]"
                  onClick={() => navigate("/home")}
                >
                  تصفح المنتجات
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {wishlistItems.map((item) => (
                  <GlobalProductCard
                    key={item.id}
                    {...item}
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
