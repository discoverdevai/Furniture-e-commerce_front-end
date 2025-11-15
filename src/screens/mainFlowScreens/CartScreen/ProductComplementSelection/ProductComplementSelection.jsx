import React, { useState, useEffect, useCallback } from "react";
import { GlobalProductCard } from "../../../../components/ui/GlobalProductCard";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import api from "../../../../Api/Axios";
import { useNavigate } from "react-router-dom";

export const ProductComplementSelection = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayProducts, setDisplayProducts] = useState([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Fetch cart items (backend if logged in, else localStorage)
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

  // Fetch all products + wishlist state
  useEffect(() => {
    const fetchProductsAndWishlist = async () => {
      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      const token = userData.token;

      try {
        const res = await api.get("/api/products");
        if (!res.data.success) throw new Error();
        // If your API returns data.products:
        const list = Array.isArray(res.data.data.products)
          ? res.data.data.products
          : res.data.data;

        let prods = list.map((item) => ({
          id: item.id,
          title: item.name,
          description: item.description,
          price: item.salePrice,
          oldPrice: item.originalPrice,
          shop: item.vendorName,
          image: item.imageUrl || "/image 4.png",
          saleImage: "/004a6ad414299e763bb7bf9ba6361c15c394e6c8.gif",
          rating: item.averageRating ?? "—",
          isOnSale: item.isOnSale,
          stock: item.stockQuantity ?? Infinity,
          storeName: item.vendorName,
          isInWishlist: false,
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

        setProducts(prods);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      } finally {
        setLoading(false);
        fetchCart();
      }
    };

    fetchProductsAndWishlist();
  }, [fetchCart]);

  // Compute remaining stock
  useEffect(() => {
    if (!products.length) return;
    const withStock = products.map((p) => {
      const inCart = cartItems.find((c) => c.productId === p.id)?.quantity || 0;
      return { ...p, stockLeft: Math.max(p.stock - inCart, 0) };
    });
    setDisplayProducts(withStock);
  }, [products, cartItems]);

  // Toggle wishlist
  const handleToggleWishlist = async (productId) => {
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const token = userData.token;
    if (token) {
      try {
        const current = products.find((p) => p.id === productId).isInWishlist;
        if (current) await api.delete(`/api/wishlist/${productId}`);
        else await api.post(`/api/wishlist/${productId}`);
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

  // Add to cart
  const handleAddToCart = async (productId, quantity = 1, variant = null) => {
    const prod = products.find((p) => p.id === productId);
    const inCart =
      cartItems.find((c) => c.productId === productId)?.quantity || 0;
    if (inCart + quantity > prod.stock) {
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

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <Loader2 className="w-12 h-12 text-[#683800] animate-spin mb-3" />
        <p className="text-[#683800] font-semibold text-xl font-[cairo]">
          {isRTL ? "جاري تحميل المنتجات..." : "Loading products..."}
        </p>
      </div>
    );
  }

  return (
    <section className="pt-12 px-6 lg:px-32">
      <h1 className="text-[#1a1713] text-2xl font-bold mb-6 [font-family:'Cairo']">
        {isRTL ? "اختيار المنتجات المكمّلة" : "Product Complement Selection"}
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {displayProducts.map((prod) => (
          <GlobalProductCard
            key={prod.id}
            {...prod}
            stock={prod.stockLeft}
            disabled={prod.stockLeft === 0}
            isRTL={isRTL}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};
