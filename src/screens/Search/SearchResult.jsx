import React, { useEffect, useState } from "react";
import { GlobalProductCard } from "../../components/ui/GlobalProductCard";
import { Button } from "../../components/ui/button";
import api from "../../Api/Axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AppNavbar } from "../../components/Layout/Navbar";
import { FooterSection } from "../../components/Layout/FooterSection";

export const SearchResult = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const query = params.get("q");
  const categoryParam = params.get("c"); // 🔹 added

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      setLoading(true);

      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;

      try {
        const response = await api.get(`/api/search?q=${query}`);
        if (response.data.success) {
          const searchProducts = response.data.data?.products || [];

          // 🔹 map to consistent product structure
          const mappedProducts = searchProducts.map((item) => ({
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
            categoryName: item.categoryName, // 🔹 required for filtering
            isInWishlist: false,
          }));

          // 🔹 Filter by category if param exists
          let filteredProducts = mappedProducts;
          if (categoryParam) {
            const selectedCategories = categoryParam
              .split(",")
              .map((c) => c.trim().toLowerCase());

            filteredProducts = mappedProducts.filter((item) =>
              selectedCategories.includes(item.categoryName?.toLowerCase())
            );
          }

          // 🟢 Sync wishlist for logged-in users
          if (token) {
            const wishlistResponse = await api.get("/api/wishlist");
            const wishlistIds =
              wishlistResponse.data?.data?.map((w) => w.productId) || [];

            const syncedProducts = filteredProducts.map((p) => ({
              ...p,
              isInWishlist: wishlistIds.includes(p.id),
            }));
            setProducts(syncedProducts);
          } else {
            // 🔵 Guest users: sync with localStorage wishlist
            const storedWishlist =
              JSON.parse(localStorage.getItem("wishlist")) || [];
            const syncedProducts = filteredProducts.map((p) => ({
              ...p,
              isInWishlist: storedWishlist.includes(p.id),
            }));
            setProducts(syncedProducts);
          }
        }
      } catch (error) {
        console.error("❌ Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, categoryParam]); // 🔹 Added categoryParam to dependency array

  // 💖 Toggle wishlist
  const handleToggleWishlist = async (productId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (token) {
      try {
        const product = products.find((p) => p.id === productId);
        if (product.isInWishlist) {
          await api.delete(`/api/wishlist/${productId}`);
        } else {
          await api.post(`/api/wishlist/${productId}`);
        }
        setProducts((prev) =>
          prev.map((p) =>
            p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
          )
        );
      } catch (error) {
        console.error("❌ Wishlist toggle failed:", error);
      }
    } else {
      setProducts((prev) => {
        const updated = prev.map((p) =>
          p.id === productId ? { ...p, isInWishlist: !p.isInWishlist } : p
        );
        const updatedWishlistIds = updated
          .filter((p) => p.isInWishlist)
          .map((p) => p.id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlistIds));
        return updated;
      });
    }
  };

  // 🛒 Add to cart
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
      const productData = products.find((p) => p.id === productId);
      const localCartItem = { ...cartItem, product: productData };

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

  // 🌀 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-[#683800] font-semibold text-lg">
          جاري تحميل نتائج البحث...
        </p>
      </div>
    );
  }

  // 🚫 Empty results
  if (!products.length) {
    return (
      <div className="flex flex-col justify-center items-center py-0">
        <AppNavbar />
        <img src="/search-empty-svgrepo-com.svg" alt="No results" className="w-40 mb-4" />
        <p className="text-[#683800] text-lg font-semibold">
          لا توجد نتائج مطابقة للبحث "{query}"
        </p>
        <FooterSection />
      </div>
    );
  }

  // ✅ Render product cards
  return (
    <>
      <section style={{ backgroundImage: "url('/image 37.png')" }}>
        <AppNavbar />
        <div className="pt-12 px-12 lg:px-32">
          <div className="w-full flex items-center justify-between pb-4">
            <h1 className="text-[#1a1713] text-[20px] sm:text-[24px] font-bold">
              نتائج البحث عن "{query}"
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
                العودة للرئيسية
              </span>
              <img
                className="w-6 h-6"
                alt="arrow"
                src="/line-arrow-right.svg"
              />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 py-6">
            {products.map((product) => (
              <GlobalProductCard
                key={product.id}
                {...product}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
        <FooterSection />
      </section>
    </>
  );
};
