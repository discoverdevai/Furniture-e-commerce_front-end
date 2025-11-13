import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/CartCard";
import { Input } from "../../../../components/ui/CartInput";
import { Separator } from "../../../../components/ui/CartSeparator";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../../../Api/Axios";

export const CartSection = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;

  // 🧮 Helper: Recalculate totals (for localStorage case)
  const calculateTotals = (items) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.15;
    const shipping = 0;
    const total = subtotal + tax + shipping;
    return { subtotal, tax, shipping, total };
  };

 


  // 📦 Fetch Cart Items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (token) {
          // Logged-in user → Fetch from backend
          const response = await api.get("/api/cart/items");
          if (response.data.success) {
            const { data } = response.data;
            const extractedItems = data.items.map((item) => ({
              id: item.id,
              productId: item.productId,
              name: item.productName,
              image: item.productImage || "/image 4.png",
              quantity: item.quantity,
              price: item.unitPrice,
              total: item.totalPrice,
              inStock: item.inStock,
              availableStock: item.availableStock,
              vendorName: item.vendor?.businessName || "غير معروف",
            }));
            setCartItems(extractedItems);
            setTotals({
              subtotal: data.subtotal,
              tax: data.taxAmount,
              shipping: data.shippingAmount,
              total: data.totalAmount,
            });
          }
        } else {
          // Guest user → from localStorage
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];
          if (localCart.length === 0) {
            setCartItems([]);
            setTotals({ subtotal: 0, tax: 0, shipping: 0, total: 0 });
            return;
          }

          const extractedItems = localCart.map((item) => ({
            id: item.productId,
            productId: item.productId,
            name: item.product?.title || "منتج غير معروف",
            image: item.product?.image || "/image 4.png",
            quantity: item.quantity,
            price: item.product?.price || item.product?.oldPrice || 0,
            total:
              (item.product?.price || item.product?.oldPrice || 0) *
              item.quantity,
            vendorName: item.product?.shop || "غير معروف",
            stock: item.product?.stock || 1,
          }));

          setCartItems(extractedItems);
          setTotals(calculateTotals(extractedItems));
        }
      } catch (error) {
        console.error("❌ Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handlePayNow = () => {
  if (!token) {
    Swal.fire({
      title: "تنبيه",
      text: "يجب تسجيل الدخول أولاً للمتابعة",
      icon: "warning",
      confirmButtonText: "تسجيل الدخول",
      showCancelButton: true,
      cancelButtonText: "إلغاء",
      customClass: {
        popup: "rounded-[15px] p-6",
        title: "font-['Cairo',Helvetica] text-center",
        htmlContainer: "font-['Cairo',Helvetica] text-center",
        confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
        cancelButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
    return; // stop further execution
  }

  // Prevent clicking while still loading or empty cart
  if (!totals || cartItems.length === 0) return;

  const orderData = {
    items: cartItems,
    totals,
  };

  // Save temporarily in localStorage or navigate state
  localStorage.setItem("orderData", JSON.stringify(orderData));

  navigate("/order-screen", { state: orderData });
};

  // ➕ Increase quantity
  const handleIncrease = async (item) => {
    if (token) {
      try {
        const newQuantity = item.quantity + 1;
        const response = await api.put(`/api/cart/items/${item.id}`, {
          quantity: newQuantity,
        });
        if (response.data.success) {
          setCartItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? { ...i, quantity: newQuantity, total: i.price * newQuantity }
                : i
            )
          );
        }
      } catch (error) {
        console.error("❌ Failed to increase quantity:", error);
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updated = cart.map((p) => {
        if (p.productId === item.id) {
          const newQuantity = p.quantity + 1;
          return { ...p, quantity: newQuantity };
        }
        return p;
      });
      localStorage.setItem("cart", JSON.stringify(updated));

      const updatedItems = updated.map((p) => ({
        id: p.productId,
        productId: p.productId,
        name: p.product?.title || "منتج غير معروف",
        image: p.product?.image || "/image 4.png",
        quantity: p.quantity,
        price: p.product?.price || p.product?.oldPrice || 0,
        total: (p.product?.price || p.product?.oldPrice || 0) * p.quantity,
        vendorName: p.product?.shop || "غير معروف",
        stock: p.product?.stock || 1,
      }));
      setCartItems(updatedItems);
      setTotals(calculateTotals(updatedItems));
    }
  };
  // ➖ Decrease quantity
  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;

    if (token) {
      try {
        const newQuantity = item.quantity - 1;
        const response = await api.put(`/api/cart/items/${item.id}`, {
          quantity: newQuantity,
        });
        if (response.data.success) {
          setCartItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? { ...i, quantity: newQuantity, total: i.price * newQuantity }
                : i
            )
          );
        }
      } catch (error) {
        console.error("❌ Failed to decrease quantity:", error);
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updated = cart.map((p) => {
        if (p.productId === item.id && p.quantity > 1) {
          return { ...p, quantity: p.quantity - 1 };
        }
        return p;
      });
      localStorage.setItem("cart", JSON.stringify(updated));

      const updatedItems = updated.map((p) => ({
        id: p.productId,
        productId: p.productId,
        name: p.product?.title || "منتج غير معروف",
        image: p.product?.image || "/image 4.png",
        quantity: p.quantity,
        price: p.product?.price || p.product?.oldPrice || 0,
        total: (p.product?.price || p.product?.oldPrice || 0) * p.quantity,
        vendorName: p.product?.shop || "غير معروف",
        stock: p.product?.stock || 1,
      }));
      setCartItems(updatedItems);
      setTotals(calculateTotals(updatedItems));
    }
  };
  // 🗑️ Delete item
  const handleDelete = async (item) => {
    Swal.fire({
      title: t("cartAlerts.deleteAlert.title"),
      text: t("cartAlerts.deleteAlert.text"),
      imageUrl: "/delete-icon-alert.svg",
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "Delete confirmation",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("cartAlerts.deleteAlert.confirmButton"),
      cancelButtonText: t("cartAlerts.deleteAlert.cancelButton"),
      background: "#fff",
      customClass: {
        popup: isRTL
          ? "swal-rtl rounded-[15px] p-6"
          : "swal-ltr rounded-[15px] p-6",
        title: `font-['Cairo',Helvetica] text-center`,
        htmlContainer: `font-['Cairo',Helvetica] text-center`,
        confirmButton:
          "font-['Cairo',Helvetica] text-lg py-3 px-0 w-[150px] text-center mx-1",
        cancelButton:
          "font-['Cairo',Helvetica] text-lg py-3 px-0 w-[150px] text-center mx-1",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (token) {
            const response = await api.delete(`/api/cart/items/${item.id}`);
            if (response.data.success) {
              const updatedItems = cartItems.filter((i) => i.id !== item.id);
              setCartItems(updatedItems);
              setTotals(calculateTotals(updatedItems));
              Swal.fire({
                title: t("cartAlerts.deleteAlert.successTitle"),
                text: t("cartAlerts.deleteAlert.successText"),
                icon: "success",
                toast: true,
                position: "center",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                /* confirmButtonText: t("cartAlerts.deleteAlert.okButton"), */
                customClass: {
                  popup: isRTL
                    ? "swal-rtl rounded-[15px] p-6"
                    : "swal-ltr rounded-[15px] p-6",
                  title: `font-['Cairo',Helvetica] text-center`,
                  htmlContainer: `font-['Cairo',Helvetica] text-center`,
                  confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
                },
              });
            }
          } else {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const updated = cart.filter((p) => p.productId !== item.id);
            localStorage.setItem("cart", JSON.stringify(updated));

            const updatedItems = updated.map((p) => ({
              id: p.productId,
              productId: p.productId,
              name: p.product?.title || "منتج غير معروف",
              image: p.product?.image || "/image 4.png",
              quantity: p.quantity,
              price: p.product?.price || p.product?.oldPrice || 0,
              total:
                (p.product?.price || p.product?.oldPrice || 0) * p.quantity,
              vendorName: p.product?.shop || "غير معروف",
              stock: p.product?.stock || 1,
            }));

            setCartItems(updatedItems);
            setTotals(calculateTotals(updatedItems));
            Swal.fire({
              title: t("cartAlerts.deleteAlert.successTitle"),
              text: t("cartAlerts.deleteAlert.successText"),
              icon: "success",
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              /* confirmButtonText: t("cartAlerts.deleteAlert.okButton"), */
              customClass: {
                popup: isRTL
                  ? "swal-rtl rounded-[15px] p-6"
                  : "swal-ltr rounded-[15px] p-6",
                title: `font-['Cairo',Helvetica] text-center`,
                htmlContainer: `font-['Cairo',Helvetica] text-center`,
                confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
              },
            });
          }
        } catch (error) {
          console.error("❌ Failed to delete item:", error);
          Swal.fire({
            title: t("cartAlerts.deleteAlert.errorTitle"),
            text: t("cartAlerts.deleteAlert.errorText"),
            icon: "error",
            confirmButtonText: t("cartAlerts.deleteAlert.okButton"),
            customClass: {
              popup: isRTL
                ? "swal-rtl rounded-[15px] p-6"
                : "swal-ltr rounded-[15px] p-6",
              title: `font-['Cairo',Helvetica] text-center`,
              htmlContainer: `font-['Cairo',Helvetica] text-center`,
              confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
            },
          });
        }
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-[#683800] font-semibold text-lg !font-[cairo]">
          جاري تحميل سلة المشتريات...
        </p>
      </div>
    );

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <img src={"/empty-cart.svg"} alt="Empty Cart" className="w-48 mb-6" />
        <p className="text-[#683800] font-semibold text-lg font-[cairo]">
          سلة المشتريات فارغة
        </p>
        <Button
          className="mt-6 w-[50%] font-[cairo] text-[#ffffff] hover:bg-[#835p40] bg-[#835f40]"
          onClick={() => navigate("/home")}
        >
          العودة للتسوق
        </Button>
      </div>
    );

  return (
    <div className="mx-auto flex flex-col w-full max-w-[1200px] items-start gap-8">
      <h2 className="self-stretch text-black text-[32px] font-semibold font-[cairo] mx-3">
        السلة
      </h2>

      <div className="flex items-start justify-start gap-6 w-full flex-wrap lg:flex-nowrap">
        {/* 🛒 Cart Items List */}
        <div className="flex flex-col flex-1 gap-6">
          {cartItems.map((item) => {
            const isMinusDisabled = item.quantity <= 1;
            const isPlusDisabled = token
              ? item.quantity >= item.availableStock
              : item.quantity >= (item.stock || 1);
            return (
              <Card
                key={item.id}
                className="flex-1 min-w-0 rounded-[10px] border border-solid border-[#c3c3c3]"
              >
                <CardContent className="flex items-center justify-start gap-6 p-4">
                  <div className="flex w-full items-start justify-between gap-6 flex-wrap md:flex-nowrap">
                    <img
                      className="w-[214px] h-[206px] rounded-[10px] object-cover flex-shrink-0"
                      alt={item.name}
                      src={item.image}
                    />

                    <div className="flex flex-col items-start gap-4 flex-1 min-w-0">
                      <div className="flex flex-col items-start gap-6 w-full">
                        <div className="flex flex-col items-start gap-4 w-full">
                          <div className="flex flex-col items-start justify-center gap-4 w-full">
                            {/* 🏷️ Product Name */}
                            <h2 className="text-[#1a1713] text-xl font-semibold">
                              {item.name}
                            </h2>

                            {/* 💰 Price */}
                            <div className="text-2xl text-[#835f40] font-semibold">
                              {item.price}{" "}
                              <span className="text-base">ر.س</span>
                            </div>
                            <div className="inline-flex items-center justify-center gap-2">
                              <h4 className="font-[cairo] text-xl text-[#000000]">
                                اللون :
                              </h4>
                              <div className="w-[22px] h-[22px] bg-[#b3afad] rounded-[50px] border-[1px] border-solid border-[#1a1713]" />
                            </div>
                          </div>
                        </div>

                        {/* 🔢 Quantity Controls */}
                        <div className="flex flex-col items-start gap-3 w-full">
                          <h4 className="text-black text-[20px] font-medium font-[cairo]">
                            العدد
                          </h4>

                          <div className="flex items-center justify-center gap-10 w-full h-12 p-2 rounded-[10px] border border-solid border-[#c3c3c3]">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0 hover:bg-transparent"
                              onClick={() => handleIncrease(item)}
                              disabled={isPlusDisabled}
                            >
                              <PlusIcon className="w-6 h-6 text-[#4f4f4f]" />
                            </Button>

                            <div className="text-[#4f4f4f] text-lg text-center">
                              {item.quantity}
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0 hover:bg-transparent"
                              onClick={() => handleDecrease(item)}
                              disabled={isMinusDisabled}
                            >
                              <MinusIcon className="w-6 h-6 text-[#4f4f4f]" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* 🗑️ Delete Button */}
                      <Button
                        variant="ghost"
                        className="inline-flex items-center justify-center gap-2 h-auto p-0 hover:bg-transparent"
                        onClick={() => handleDelete(item)}
                      >
                        <img src="/trash.svg" alt="trash" className="w-6 h-6" />
                        <h4 className="text-[#1a1713] text-xl font-medium font-[cairo]">
                          حذف
                        </h4>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 💳 Order Summary */}
        <Card className="w-full lg:w-96 bg-[#f2f2f2] rounded-[10px] border-0">
          <CardContent className="flex flex-col items-center justify-center gap-6 p-4">
            <div className="flex flex-row flex-grow w-full border border-[#A67C52]/80 rounded-[10px_0_0_10px] overflow-hidden ">
              {/* Input */}
              <Input
                type="text"
                placeholder="ادخل كود الخصم"
                className="flex-1 px-4 py-3 text-[#757474] placeholder:text-[#757474] focus:outline-none bg-[#f2f2f2] text-right font-[cairo] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              {/* Button */}
              <Button className="bg-gradient-to-l from-[#805b3c] to-[#d3baa4] text-white w-[151px] font-[cairo] font-semibold px-6 py-3 hover:opacity-90 transition-all duration-300 rounded-none">
                تفعيل
              </Button>
            </div>

            {totals && (
              <>
                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="flex justify-between w-full font-[cairo]">
                    <span>المجموع الفرعي :</span>
                    <span>{totals.subtotal.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between w-full font-[cairo]">
                    <span>الضريبة :</span>
                    <span>{totals.tax.toFixed(2)} ر.س</span>
                  </div>
                  <div className="flex justify-between w-full font-[cairo]">
                    <span>الشحن :</span>
                    <span>{totals.shipping.toFixed(2)} ر.س</span>
                  </div>
                </div>

                <Separator className="w-full h-px bg-[#c3c3c3]" />

                <div className="flex justify-between w-full text-[#835f40] font-semibold font-[cairo]">
                  <span>الإجمالي :</span>
                  <span>{totals.total.toFixed(2)} ر.س</span>
                </div>
              </>
            )}

            <Button  onClick={() => handlePayNow()} className="h-14 w-full rounded-[10px] bg-gradient-to-l from-[#805b3c] to-[#d3baa4] hover:opacity-90 p-2">
              <span className="text-white font-medium font-[cairo] ">
                الدفع الآن
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
