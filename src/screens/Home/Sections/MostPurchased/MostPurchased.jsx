import React, { useEffect, useState } from "react";
import { GlobalProductCard } from "../../../../components/ui/GlobalProductCard";
import { Button } from "../../../../components/ui/button";
import api from "../../../../Api/Axios";
import { useNavigate } from "react-router-dom";

const MostPurchased = () => {
  const [offers, setOffers] = useState([]);
  const [cartItems, setCartItems] = useState([]); // ✅ Added cart state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      }
    };
    fetchProductsAndWishlist();
  }, []);

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
        setCartItems((prev) => [...prev, cartItem]);
      } catch (error) {
        console.error("Error adding to cart:", error);
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
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-[#683800] font-semibold text-lg">
          جاري تحميل العروض...
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
          {offers.map((offer) => (
            <GlobalProductCard
              key={offer.id}
              {...offer}
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
