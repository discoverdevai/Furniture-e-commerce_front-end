import React, { useEffect, useState, useCallback } from "react";
import { GlobalProductCard } from "../../../../components/ui/GlobalProductCard";
import { Button } from "../../../../components/ui/button";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import api from "../../../../Api/Axios";
import { useNavigate } from "react-router-dom";

const MostPurchased = () => {
  const [offers, setOffers] = useState([]);
  const [cartItems, setCartItems] = useState([]); // ✅ Added cart state
  const [loading, setLoading] = useState(true);
  const [displayOffers, setDisplayOffers] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  //  Fetch the cart once (token = backend, guest = localStorage)
  git const fetchCart = useCallback(async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (token) {
      try {
        const res = await api.get("/api/cart/items");
        /* The backend returns an array of  
         { productId, quantity, variant, ... } */
        setCartItems(res.data?.data?.items || []);
      } catch (err) {
        console.error("❌  Could not fetch cart items:", err);
      }
    } else {
      const lsCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(lsCart);
    }
  }, []);

  //   fetch products AND wishlist but call fetchCart() afterwards

  useEffect(() => {
    const fetchProductsAndWishlist = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;
      try {
        const productsResponse = await api.get("/api/products/most-purchased");
        if (productsResponse.data.success) {
          if (!productsResponse.data.success) return;
          const products = productsResponse.data.data.map((item) => ({
            id: item.id,
            title: item.name,
            description: item.description,
            price: item.price,
            oldPrice: item.originalPrice,
            shop: item.vendorName,
            image: item.imageUrl || "/image 4.png",
            saleImage: "/004a6ad414299e763bb7bf9ba6361c15c394e6c8.gif",
            rating: item.averageRating,
            isOnSale: item.isOnSale,
            stock: item.stockQuantity,
            isInWishlist: false,
          }));
          // 2️⃣ Check login state
          if (token) {
            // 🟢 Logged-in flow → Fetch user wishlist
            const wishlistResponse = await api.get("/api/wishlist");

            const wishlistIds =
              wishlistResponse.data?.data?.map((w) => w.productId) || [];

            // Compare and mark wishlist products
            const syncedProducts = products.map((p) => ({
              ...p,
              isInWishlist: wishlistIds.includes(p.id),
            }));

            setOffers(syncedProducts);
          } else {
            // 🔵 Guest flow → sync from localStorage
            const storedWishlist =
              JSON.parse(localStorage.getItem("wishlist")) || [];

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
        fetchCart();
      }
    };
    fetchProductsAndWishlist();
  }, []);

  //  Calculate remaining stock for every product and store it in displayOffers */

  useEffect(() => {
    if (!offers.length) return;

    const withStockLeft = offers.map((p) => {
      const alreadyInCart =
        cartItems.find((c) => c.productId === p.id)?.quantity || 0;

      return {
        ...p,
        stockLeft: Math.max(p.stock - alreadyInCart, 0),
      };
    });

    setDisplayOffers(withStockLeft);
  }, [offers, cartItems]);

  // ---------------------------------------------------------------------------------
  // 💖 Toggle Wishlist Logic (Both Modes)
  // -----------------------------------------------------------------------------------
  const handleToggleWishlist = async (productId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;
    if (token) {
      // 🟢 Logged-in
      try {
        const product = offers.find((p) => p.id === productId);

        if (product.isInWishlist) {
          // DELETE
          await api.delete(`/api/wishlist/${productId}`);
        } else {
          // POST
          await api.post(`/api/wishlist/${productId}`);
        }

        // update UI instantly
        setOffers((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
          )
        );
      } catch (error) {
        console.error("❌ Wishlist toggle failed:", error);
      }
    } else {
      // 🔵 Guest Mode
      setOffers((prev) => {
        const updated = prev.map((p) =>
          p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
        );

        // update localStorage after toggle
        const updatedWishlistIds = updated
          .filter((p) => p.isInWishlist)
          .map((p) => p.id);

        localStorage.setItem("wishlist", JSON.stringify(updatedWishlistIds));

        return updated;
      });
    }
  };

  const handleAddToCart = async (productId, quantity = 1, variant = null) => {
    const prod = offers.find((p) => p.id === productId);
    const qtyInCart =
      cartItems.find((c) => c.productId === productId)?.quantity || 0;

    if (qtyInCart >= prod.stock) {
      // User tries to add more than available
      Swal.fire({
        icon: "warning",
        title: isRTL ? "نفدت الكمية" : "Out of stock",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;
    // Prepare the cart item object in the same structure used by the backend
    const cartItem = {
      productId: productId,
      quantity,
      variant,
    };

    if (token) {
      try {
        await api.post("/api/cart/add", cartItem);
        /* setCartItems((prev) => [...prev, cartItem]); */
        await fetchCart(); // Fetch the updated cart
        //alert
        Swal.fire({
          icon: "success",
          title: t("cartAlerts.success_title"),
          text: t("cartAlerts.added_successfully"),
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: "#ffffff",
          color: "#000000",
          iconColor: "#28a745",
          customClass: {
            title: "font-['Cairo',Helvetica] text-center",
            htmlContainer: "font-['Cairo',Helvetica] text-center",
            confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
          },
        });
      } catch (error) {
        console.error("Error adding to cart:", error);
        Swal.fire({
          icon: "error",
          title: t("cartAlerts.error"),
          text: t("cartAlerts.something_went_wrong"),
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: "#ffffff",
          color: "#000000",
          iconColor: "#dc3545",
          customClass: {
            title: "font-['Cairo',Helvetica] text-center",
            htmlContainer: "font-['Cairo',Helvetica] text-center",
            confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
          },
        });
      }
    } else {
      // No token — handle cart locally
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      // Find the product data from the offers array
      const productData = offers.find((p) => p.id === productId);
      console.log(productData);
      // Attach the product info for local usage

      const localCartItem = {
        ...cartItem,
        product: productData, // 🔥 full product object for later rendering
      };

      // Check if product already exists in local storage cart
      const existingIndex = existingCart.findIndex(
        (item) => item.productId === productId && item.variant === variant
      );

      if (existingIndex > -1) {
        // Update quantity
        existingCart[existingIndex].quantity += quantity;
      } else {
        // Add new product
        existingCart.push(localCartItem);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      setCartItems(existingCart);
      Swal.fire({
        icon: "success",
        title: t("cartAlerts.success_title"),
        text: t("cartAlerts.added_successfully"),
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        background: "#ffffff",
        color: "#000000",
        iconColor: "#28a745",
        customClass: {
          title: "font-['Cairo',Helvetica] text-center",
          htmlContainer: "font-['Cairo',Helvetica] text-center",
          confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
        },
      });
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <Loader2 className="w-12 h-12 text-[#683800] animate-spin mb-3 loader-glow" />
        <p className="text-[#683800] font-semibold text-xl font-[cairo] animate-pulse">
          {isRTL ? "جاري تحميل العروض..." : "Loading offers..."}
        </p>
      </div>
    );

  return (
    <section style={{ backgroundImage: "url('/image 37.png')" }}>
      <div className="pt-12 px-12 lg:px-32">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-4">
          <h1 className="text-[#1a1713] text-[20px] sm:text-[24px] font-bold">
            الأكثر مبيعا
          </h1>
          <Button
            variant="ghost"
            className="inline-flex items-center gap-3 h-auto p-0 hover:bg-transparent"
            onClick={() => {
              navigate("/best-selling");
              window.scrollTo(0, 0);
            }}
          >
            <span className="text-[#683800] text-[16px] font-medium">
              عرض المزيد
            </span>
            <img className="w-6 h-6" alt="arrow" src="/line-arrow-right.svg" />
          </Button>
        </div>

        {/* Product Cards */}
        <div className="flex flex-nowrap justify-start gap-8 py-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:flex-wrap sm:justify-center sm:overflow-visible">
          {displayOffers.map((offer) => (
            <GlobalProductCard
              key={offer.id}
              {...offer}
              stock={offer.stockLeft} // pass the remaining stock
              disabled={offer.stockLeft === 0}
              isRTL={isRTL}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPurchased;
