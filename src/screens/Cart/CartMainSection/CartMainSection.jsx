import React, { useEffect, useState } from "react";
import api from "../../../Api/Axios";
import { Button } from "../../../components/ui/button";
import { useTranslation } from "react-i18next";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppNavbar } from "../../../components/Layout/Navbar";

export const CartMainSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;

      try {
        if (token) {
          // 🟢 Logged-in user → Fetch from backend
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
          // 🔵 Guest user → Fetch from localStorage
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];

          if (localCart.length === 0) {
            setCartItems([]);
            setTotals({
              subtotal: 0,
              tax: 0,
              shipping: 0,
              total: 0,
            });
            return;
          }

          // Extract product data from local cart
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
          }));

          // Calculate totals
          const subtotal = extractedItems.reduce(
            (sum, item) => sum + item.total,
            0
          );
          const tax = subtotal * 0.15;
          const shipping = 0;
          const total = subtotal + tax + shipping;

          setCartItems(extractedItems);
          setTotals({ subtotal, tax, shipping, total });
        }
      } catch (error) {
        console.error("❌ Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-[#683800] font-semibold text-lg">
          جاري تحميل سلة المشتريات...
        </p>
      </div>
    );

  if (cartItems.length === 0)
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
        <div className="flex flex-col items-center justify-center py-20">
          <img src={"/empty-cart.svg"} alt="Empty Cart" className="w-48 mb-6" />
          <p className="text-[#683800] font-semibold text-lg">
            سلة المشتريات فارغة
          </p>
          <Button
            className="mt-6 w-[50%] font-[cairo] text-[#ffffff] hover:bg-[#835p40] bg-[#835f40]"
            onClick={() => navigate("/home")}
          >
            العودة للتسوق
          </Button>
        </div>
      </section>
    );

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
      <section className="bg-[#f9f5f0] py-12 px-6 lg:px-24">
        <h1 className="text-[#1a1713] text-[22px] sm:text-[28px] font-bold mb-8 text-center">
          سلة المشتريات
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left - Cart Items */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start justify-between border-b pb-6 last:border-b-0"
              >
                <div className="flex items-center gap-5 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-xl bg-[#f3f3f3]"
                  />
                  <div className="flex flex-col text-right">
                    <h2 className="font-semibold text-[#1a1713] text-lg">
                      {item.name}
                    </h2>
                    <p className="text-[#683800] text-sm">{item.vendorName}</p>
                    <p className="text-[#1a1713] font-medium mt-2">
                      {item.price} ر.س
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:flex-col sm:justify-center sm:items-end gap-4 mt-4 sm:mt-0">
                  {/* Quantity */}
                  <div className="flex items-center gap-3 border rounded-full px-3 py-1 bg-[#faf9f7]">
                    <button
                      disabled={item.quantity <= 1}
                      className="text-[#683800] font-bold"
                    >
                      -
                    </button>
                    <span className="text-[#1a1713] font-medium">
                      {item.quantity}
                    </span>
                    <button className="text-[#683800] font-bold">+</button>
                  </div>

                  {/* Remove */}
                  <button className="flex items-center gap-2 text-[#a15b00] hover:text-[#7c4400]">
                    <Trash2 size={18} />
                    <span className="text-sm">إزالة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Summary */}
          <div className="lg:w-1/3 bg-white rounded-2xl shadow-md p-6 h-fit">
            <h2 className="text-[#1a1713] font-bold text-xl mb-6">
              ملخص الطلب
            </h2>

            <div className="space-y-3 text-[#1a1713]">
              <div className="flex justify-between">
                <span>المجموع الفرعي</span>
                <span>{totals?.subtotal?.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>الضريبة</span>
                <span>{totals?.tax?.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن</span>
                <span>{totals?.shipping?.toFixed(2)} ر.س</span>
              </div>

              <hr className="my-4 border-[#e4dcd3]" />

              <div className="flex justify-between font-bold text-lg text-[#683800]">
                <span>الإجمالي</span>
                <span>{totals?.total?.toFixed(2)} ر.س</span>
              </div>
            </div>

            <Button
              className="mt-6 w-full bg-[#683800] text-white text-lg rounded-full py-3 hover:bg-[#4e2900]"
              onClick={() => console.log("Proceed to checkout")}
            >
              إتمام الشراء
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};
