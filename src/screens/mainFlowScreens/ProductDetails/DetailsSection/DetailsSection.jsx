import React, { useEffect, useState, useCallback } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button"; // ← import Button
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../components/ui/BreadCrumbs";
import { useTranslation } from "react-i18next";
import api from "../../../../Api/Axios";
import { MobileCategorySection } from "../MobileCategorySection/MobileCategorySection";
import Swal from "sweetalert2";

const specificationsMap = (product, isArabic) => [
  {
    icon: "/fabric.svg",
    label: isArabic ? "الخامة :" : "Material:",
    value: product.material || "-",
  },
  {
    icon: "/sizes.svg",
    label: isArabic ? "الأبعاد :" : "Dimensions:",
    value: product.dimensions || "-",
  },
  {
    icon: "/capacity.svg",
    label: isArabic ? "الوزن :" : "Weight:",
    value: product.weight ? `${product.weight} ${isArabic ? "كغ" : "kg"}` : "-",
  },
];

export const DetailsSection = ({ productId, storeName }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [qtyInCart, setQtyInCart] = useState(0);
  const [stockLeft, setStockLeft] = useState(0);
  const [selectedQty, setSelectedQty] = useState(1);

  // 1️⃣ fetchCart
  const fetchCart = useCallback(async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;
    if (token) {
      try {
        const res = await api.get("/api/cart/items");
        setCartItems(res.data?.data?.items || []);
      } catch {
        console.error("Failed to load cart");
      }
    } else {
      setCartItems(JSON.parse(localStorage.getItem("cart")) || []);
    }
  }, []);

  // 2️⃣ load product + wishlist
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/products/${productId}`, {
          params: { vendorName: storeName },
        });
        if (!res.data.success) {
          if (mounted) setProduct(null);
          return;
        }
        const p = res.data.data;
        const mapped = { ...p, isInWishlist: false };

        // sync wishlist
        const userData = JSON.parse(localStorage.getItem("userData"));
        const token = userData?.token;
        if (token) {
          const w = await api.get("/api/wishlist");
          const ids = w.data?.data?.map((x) => x.productId) || [];
          mapped.isInWishlist = ids.includes(p.id);
        } else {
          const ls = JSON.parse(localStorage.getItem("wishlist")) || [];
          mapped.isInWishlist = ls.includes(p.id);
        }

        if (mounted) setProduct(mapped);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [productId, storeName]);

  // 3️⃣ once product loads → fetch cart
  useEffect(() => {
    if (product) fetchCart();
  }, [product, fetchCart]);

  // 4️⃣ derive qtyInCart & stockLeft
  useEffect(() => {
    if (!product) return;
    const inCart =
      cartItems.find((c) => c.productId === product.id)?.quantity || 0;
    const left = Math.max(product.stockQuantity - inCart, 0);
    setQtyInCart(inCart);
    setStockLeft(left);
    setSelectedQty((q) => Math.max(1, Math.min(q, left)));
  }, [cartItems, product]);

  // 5️⃣ toggle wishlist
  const handleToggleWishlist = async () => {
    if (!product) return;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (token) {
      try {
        if (product.isInWishlist) {
          await api.delete(`/api/wishlist/${product.id}`);
        } else {
          await api.post(`/api/wishlist/${product.id}`);
        }
        setProduct((p) => ({ ...p, isInWishlist: !p.isInWishlist }));
      } catch {
        console.error("Wishlist toggle failed");
      }
    } else {
      setProduct((p) => {
        const nextIsInWishlist = !p.isInWishlist;
        const ls = JSON.parse(localStorage.getItem("wishlist")) || [];
        let newLs;

        if (nextIsInWishlist) {
          // only add if not already present
          newLs = ls.includes(p.id) ? ls : [...ls, p.id];
        } else {
          newLs = ls.filter((id) => id !== p.id);
        }

        localStorage.setItem("wishlist", JSON.stringify(newLs));
        return { ...p, isInWishlist: nextIsInWishlist };
      });
    }
  };

  // 6️⃣ add to cart
  const handleAddToCart = async () => {
    if (!product) return;
    if (selectedQty > stockLeft) {
      return Swal.fire({
        icon: "warning",
        title: isArabic ? "نفدت الكمية" : "Out of stock",
        toast: true,
        position: "top",
        timer: 1200,
      });
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = userData?.token;

    if (token) {
      try {
        await api.post("/api/cart/add", {
          productId: product.id,
          quantity: selectedQty,
        });
        await fetchCart();
        Swal.fire({
          icon: "success",
          title: isArabic ? "تمت الإضافة إلى السلة" : "Added to cart",
          toast: true,
          position: "top",
          timer: 1200,
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: isArabic ? "حدث خطأ" : "Something went wrong",
          toast: true,
          position: "top",
          timer: 1200,
        });
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const idx = localCart.findIndex((c) => c.productId === product.id);
      if (idx > -1) {
        localCart[idx].quantity += selectedQty;
      } else {
        localCart.push({
          productId: product.id,
          quantity: selectedQty,
          product,
        });
      }
      localStorage.setItem("cart", JSON.stringify(localCart));
      setCartItems(localCart);
      Swal.fire({
        icon: "success",
        title: isArabic ? "تمت الإضافة إلى السلة" : "Added to cart",
        toast: true,
        position: "top",
        timer: 1200,
      });
    }
  };

  if (loading)
    return (
      <p className="text-center py-20">
        {isArabic ? "جاري التحميل..." : "Loading..."}
      </p>
    );
  if (!product)
    return (
      <p className="text-center py-20">
        {isArabic ? "المنتج غير موجود" : "Product not found"}
      </p>
    );

  const specs = specificationsMap(product, isArabic);
  const breadcrumbItems = [
    {
      label: isArabic ? "المتاجر" : "Stores",
      href: "/stores",
      isActive: false,
      color: "text-[#a16a35]",
    },
    {
      label: storeName,
      href: `/store/${storeName}`,
      isActive: false,
      color: "text-[#a16a35]",
    },
    {
      label: isArabic ? "تفاصيل المنتج" : "Product Details",
      href: "#",
      isActive: true,
      color: "text-[#4f4f4f]",
    },
  ];

  return (
    <>
      <div className="block md:hidden mx-auto">
        <MobileCategorySection />
      </div>
      <div
        className="flex flex-col w-full max-w-[1200px] mx-auto gap-6"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {/* Breadcrumb */}
        <nav
          className="inline-flex items-center gap-2 mb-4"
          aria-label="Breadcrumb"
        >
          <Breadcrumb>
            <BreadcrumbList className="flex items-center gap-2">
              {breadcrumbItems.map((item, i) => (
                <React.Fragment key={i}>
                  <BreadcrumbItem>
                    {item.isActive ? (
                      <BreadcrumbPage
                        className={`font-h5-regular ${item.color}`}
                      >
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={item.href}
                        className={`font-h5-regular ${item.color}`}
                      >
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {i < breadcrumbItems.length - 1 && (
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
        </nav>

        {/* Main */}
        <div className="flex flex-col md:flex-row items-start gap-6 w-full">
          {/* Images */}
          <div className="flex flex-col md:flex-row-reverse gap-6 w-full">
            {/* Thumbnails */}
            <div
              className="flex flex-row md:flex-col gap-3 mt-4 md:mt-0 w-full md:w-auto justify-center
               order-2 md:order-1"
            >
              <img
                className="w-1/3 md:w-[180px] h-[163px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                alt="Product thumbnail 1"
                src="/product-details1.png"
              />
              <img
                className="w-1/3 md:w-[180px] h-[163px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                alt="Product thumbnail 2"
                src="/product-details2.png"
              />
              <img
                className="w-1/3 md:w-[180px] h-[163px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                alt="Product thumbnail 3"
                src="/product-details3.png"
              />
            </div>

            {/* Main image */}
            <img
              className="w-full md:w-[384px] h-[210px] md:h-[513px] object-cover rounded-3xl order-1 md:order-2"
              alt={product.name}
              src={product.imageUrl || "/product-details-main-img.png"}
            />
          </div>

          {/* Details */}
          <section className="flex flex-col w-full md:max-w-[588px] gap-6">
            {/* Title + Wishlist Button */}
            <div className="flex justify-between items-center w-full">
              <h1 className="text-[32px] font-[600] text-[#1a1713]">
                {product.name}
              </h1>
              <Button
                onClick={handleToggleWishlist}
                variant="ghost"
                size="icon"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-[#ffffff33] rounded-full hover:bg-[#ffffff4d]"
              >
                <img
                  src={
                    product.isInWishlist ? "/heart-red.svg" : "/heart-empty.svg"
                  }
                  alt="wishlist"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </Button>
            </div>

            <p className="text-[#4f4f4f]">{product.description}</p>

            {/* Specs & Price */}
            <div className="flex flex-col sm:flex-row justify-between gap-6 w-full">
              <div className="flex flex-col gap-4 w-full sm:w-1/2">
                <h3 className="font-h4-medium inline-flex items-center gap-2">
                  <img
                    className="w-4 h-4"
                    alt="spec icon"
                    src="/specification.svg"
                  />
                  {isArabic ? "المواصفات" : "Specifications"}
                </h3>
                {specs.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <img
                      className={`object-cover ${
                        idx === 1 ? "w-6 h-6" : "w-4 h-4"
                      }`}
                      alt={s.label}
                      src={s.icon}
                    />
                    <p className="font-h5-regular">{s.label}</p>
                    <p className="font-h5-regular">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <div className="inline-flex items-center gap-4">
                  {product.isOnSale && (
                    <Badge
                      variant="outline"
                      className="h-6 px-2 py-2 rounded-[10px] border-[#008318] bg-transparent"
                    >
                      <span className="text-[#003f0b] text-xs">
                        {isArabic ? "خصم 10%" : "10% OFF"}
                      </span>
                    </Badge>
                  )}

                  <p className="font-bold text-[#835f40] text-sm sm:text-lg">
                    {product.isOnSale
                      ? product.salePrice
                      : product.originalPrice}{" "}
                    <span className="font-medium">
                      {isArabic ? "ر.س" : "SAR"}
                    </span>
                  </p>
                  {product.isOnSale && (
                    <p className="text-[#1a1713] text-[10px] sm:text-xs line-through">
                      {product.originalPrice} {isArabic ? "ر.س" : "SAR"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col gap-6 w-full">
              <label className="font-h4-medium">
                {isArabic ? "العدد" : "Quantity"}
              </label>
              <div className="flex h-12 items-center rounded-[10px] border border-[#c3c3c3]">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedQty((q) => Math.max(q - 1, 1))}
                  disabled={selectedQty <= 1}
                >
                  <MinusIcon className="w-6 h-6" />
                </Button>
                <span className="flex-1 text-center text-[#835f40]">
                  {selectedQty}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setSelectedQty((q) => Math.min(q + 1, stockLeft))
                  }
                  disabled={selectedQty >= stockLeft}
                >
                  <PlusIcon className="w-6 h-6" />
                </Button>
              </div>

              <Button
                className="w-full h-14 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90"
                onClick={handleAddToCart}
                disabled={stockLeft === 0}
              >
                <span className="text-white">
                  {isArabic ? "اضف إلى السلة" : "Add to cart"}
                </span>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
