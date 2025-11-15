import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { AppNavbar } from "../../../components/Layout/Navbar";
import { FooterSection } from "../../../components/Layout/FooterSection";
import { PaymentInformationSection } from "./PaymentInformationSection/PaymentInformationSection";
import { ProductDetailsSection } from "./ProductDetailsSection/ProductDetailsSection";
import api from "../../../Api/Axios";
import { ConfirmationPopup } from "../../../components/Common/Popups/ConfirmationPopup";

export const OrderScreen = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Load cart items and selected payment from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("orderData")) || {};
    setCartItems(storedCart.items || []);

    const payment = JSON.parse(localStorage.getItem("selectedPayment"));
    setSelectedPayment(payment);
  }, []);

  const handlePlaceOrder = async () => {
    if (!cartItems.length) {
      alert("سلة التسوق فارغة!");
      return;
    }

    if (!selectedPayment) {
      alert("يرجى اختيار طريقة الدفع");
      return;
    }

    const orderPayload = {
      shippingAddressId: 1, // Can be dynamic later
      billingAddressId: 1, // Can be dynamic later
      paymentMethodId: selectedPayment.id,
      orderItems: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity || 1,
      })),
    };

    try {
      const response = await api.post("/api/buyer/orders/place", orderPayload);

      if (response.data.success) {
        const orderNum = response.data.data.orderNumber;
        setOrderNumber(orderNum);
        setShowConfirmation(true); // Show confirmation popup

        // Clear cart/payment from localStorage
        localStorage.removeItem("orderData");
        localStorage.removeItem("selectedPayment");
        localStorage.setItem("orderNumber", orderNum);
      } else {
        alert(`فشل إرسال الطلب: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("حدث خطأ أثناء إرسال الطلب. حاول مرة أخرى.");
    }
  };

  const handleTrackOrder = () => {
    setShowConfirmation(false);
    navigate(`/order-tracking/${orderNumber}`); // Pass order number to tracking page
  };

  const handleContinueShopping = () => {
    setShowConfirmation(false);
    navigate("/home"); // Go back to home
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')" }}
    >
      <AppNavbar />

      {/* Main content */}
      <section className="mx-auto flex flex-col lg:flex-row gap-8 w-full pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20 mb-20">
        {/* Payment info */}
        <div className="w-full lg:w-2/3">
          <PaymentInformationSection />
        </div>

        {/* Product details */}
        <div className="w-full lg:w-1/3 mx-auto">
          <ProductDetailsSection />
        </div>
      </section>

      {/* Place order button */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20">
        <Button
          onClick={handlePlaceOrder}
          className="flex h-12 sm:h-14 items-center justify-center gap-2 p-2 w-full lg:w-2/3 rounded-[10px] 
                     bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:opacity-90 text-sm sm:text-base"
        >
          <span className="relative w-fit font-button-text text-[#fefefe] whitespace-nowrap">
            تأكيد الطلب
          </span>
        </Button>
      </div>

      <FooterSection />

      {/* Confirmation Popup */}
      {showConfirmation && (
        <ConfirmationPopup
          orderNumber={orderNumber}
          onTrackOrder={handleTrackOrder}
          onContinueShopping={handleContinueShopping}
        />
      )}
    </div>
  );
};
