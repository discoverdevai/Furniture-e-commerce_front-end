import React, { useEffect, useState, useCallback } from "react";
import { GlobalProductCard } from "../../components/ui/GlobalProductCard";
import { Button } from "../../components/ui/button";
import Swal from "sweetalert2";
import api from "../../Api/Axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AppNavbar } from "../../components/Layout/Navbar";
import { FooterSection } from "../../components/Layout/FooterSection";
import { useTranslation } from "react-i18next";

export const SearchResult = () => {
  const [products, setProducts] = useState([]); // raw products + wishlist flag
  const [cartItems, setCartItems] = useState([]); // items in cart
  const [displayProducts, setDisplayProducts] = useState([]); // products w/ stockLeft
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  const categoryParam = params.get("c");

  // 1️⃣ fetchCart exactly like MostPurchased
  const fetchCart = useCallback(async () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const token = userData.token;
    if (token) {
      try {
        const res = await api.get("/api/cart/items");
        setCartItems(res.data?.data?.items || []);
      } catch (err) {
        console.error("❌ Could not fetch cart items:", err);
      }
    } else {
      const ls = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(ls);
    }
  }, []);

  // 2️⃣ Fetch search results + sync wishlist
  useEffect(() => {
    if (!query) return;
    setLoading(true);

    (async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData")) || {};
        const token = userData.token;
        const resp = await api.get(
          `/api/search?q=${encodeURIComponent(query)}`
        );
        if (!resp.data.success) return;

        // map to consistent shape
        let items =
          resp.data.data?.products.map((item) => ({
            id: item.id,
            title: item.name,
            description: item.description,
            price: item.salePrice,
            oldPrice: item.originalPrice,
            shop: item.vendorName,
            storeName: item.vendorName,
            image: item.imageUrl || "/image 4.png",
            saleImage: "/004a6ad414299e763bb7bf9ba6361c15c394e6c8.gif",
            rating: item.averageRating,
            isOnSale: item.isOnSale,
            stock: item.stockQuantity, // ← your API field for total stock
            categoryName: item.categoryName,
            isInWishlist: false, // will override next
          })) || [];

        // optional category filtering
        if (categoryParam) {
          const cats = categoryParam
            .split(",")
            .map((c) => c.trim().toLowerCase());
          items = items.filter(
            (p) =>
              p.categoryName?.toLowerCase &&
              cats.includes(p.categoryName.toLowerCase())
          );
        }

        // sync wishlist
        if (token) {
          const wl = await api.get("/api/wishlist");
          const wlIds = wl.data?.data?.map((w) => w.productId) || [];
          items = items.map((p) => ({
            ...p,
            isInWishlist: wlIds.includes(p.id),
          }));
        } else {
          const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
          items = items.map((p) => ({
            ...p,
            isInWishlist: stored.includes(p.id),
          }));
        }

        setProducts(items);
      } catch (err) {
        console.error("❌ Error fetching search results:", err);
      } finally {
        setLoading(false);
        fetchCart(); // after we have products, fetch cart so we can compute stockLeft
      }
    })();
  }, [query, categoryParam, fetchCart]);

  // 3️⃣ Compute stockLeft after both products & cartItems are updated
  useEffect(() => {
    if (!products.length) {
      setDisplayProducts([]);
      return;
    }
    const withStock = products.map((p) => {
      const inCartQty =
        cartItems.find((c) => c.productId === p.id)?.quantity || 0;
      return {
        ...p,
        stockLeft: Math.max(p.stock - inCartQty, 0),
      };
    });
    setDisplayProducts(withStock);
  }, [products, cartItems]);

  // 4️⃣ Toggle wishlist (fixed to use products/setProducts)
  const handleToggleWishlist = async (productId) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const token = userData.token;
    if (token) {
      try {
        const prod = products.find((p) => p.id === productId);
        if (prod.isInWishlist) {
          await api.delete(`/api/wishlist/${productId}`);
        } else {
          await api.post(`/api/wishlist/${productId}`);
        }
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
          )
        );
      } catch {
        console.error("❌ Wishlist toggle failed");
      }
    } else {
      setProducts((prev) => {
        const updated = prev.map((p) =>
          p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
        );
        const ids = updated.filter((p) => p.isInWishlist).map((p) => p.id);
        localStorage.setItem("wishlist", JSON.stringify(ids));
        return updated;
      });
    }
  };

  // 5️⃣ Add to cart (fixed to use products & fetchCart)
  const handleAddToCart = async (productId, quantity = 1, variant = null) => {
    const prod = products.find((p) => p.id === productId);
    const inCartQty =
      cartItems.find((c) => c.productId === productId)?.quantity || 0;
    if (inCartQty + quantity > prod.stock) {
      return Swal.fire({
        icon: "warning",
        title: isRTL ? "نفدت الكمية" : "Out of stock",
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

  // loading / empty states
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-[#683800] font-semibold text-lg">
          {isRTL ? "جاري تحميل نتائج البحث..." : "Loading search results..."}
        </p>
      </div>
    );
  }
  if (!displayProducts.length) {
    return (
      <div className="flex flex-col justify-center items-center py-0">
        <AppNavbar />
        <img
          src="/search-empty-svgrepo-com.svg"
          alt="No results"
          className="w-40 mb-4"
        />
        <p className="text-[#683800] text-lg font-semibold">
          {isRTL
            ? ` لا توجد نتائج مطابقة للبحث "${query}"`
            : `No matching results for "${query}"`}
        </p>
        <FooterSection />
      </div>
    );
  }

  // render
  return (
    <section style={{ backgroundImage: "url('/image 37.png')" }}>
      <AppNavbar />
      <div className="pt-12 px-12 lg:px-32">
        <div className="w-full flex items-center justify-between pb-4">
          <h1 className="text-[#1a1713] text-[20px] sm:text-[24px] font-bold">
            {isRTL
              ? `نتائج البحث عن "${query}"`
              : `Search results for "${query}"`}
          </h1>
          <Button
            variant="ghost"
            className="inline-flex items-center gap-3 h-auto p-0 hover:bg-transparent"
            onClick={() => {
              navigate("/home");
              window.scrollTo(0, 0);
            }}
          >
            <span className="text-[#683800] text-[16px] font-medium">
              {isRTL ? "العودة للصفحة الرئيسية" : "Back to Home"}
            </span>
            <img
              className={`w-6 h-6 ${isRTL ? "" : "rotate-180"}`}
              alt="arrow"
              src="/line-arrow-right.svg"
            />
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-8 py-6">
          {displayProducts.map((p) => (
            <GlobalProductCard
              key={p.id}
              {...p}
              stock={p.stockLeft}
              disabled={p.stockLeft === 0}
              isRTL={isRTL}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
      <FooterSection />
    </section>
  );
};
