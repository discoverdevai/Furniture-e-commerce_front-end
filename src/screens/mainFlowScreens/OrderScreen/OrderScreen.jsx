import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { AppNavbar } from "../../../components/Layout/Navbar";
import { FooterSection } from "../../../components/Layout/FooterSection";
import { PaymentInformationSection } from "./PaymentInformationSection/PaymentInformationSection";
import { ProductDetailsSection } from "./ProductDetailsSection/ProductDetailsSection";
import { useTranslation } from "react-i18next";
import api from "../../../Api/Axios";
import { ConfirmationModal } from "../../../components/Common/Popups/ConfirmationPopup";
import { useSelector } from "react-redux";

export const OrderScreen = () => {
  const selectedPayment = useSelector((state) => state.global.selectedPayment);
  const addressFromStore = useSelector((state) => state.global.address);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  console.log("address from store ", addressFromStore);

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("orderData")) || {};
    setCartItems(storedCart.items || []);
  }, []);

  // Fetch all user addresses once
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await api.get(`/api/user/addresses`);
        if (res.data.success) {
          setUserAddresses(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
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

    if (!addressFromStore || !addressFromStore.street) {
      alert("العنوان غير صالح");
      return;
    }

    let addressId;

    // Compare addressFromStore with fetched addresses
    const matchingAddress = userAddresses.find(
      (addr) => addr.street === addressFromStore.street
    );

    if (matchingAddress) {
      addressId = matchingAddress.id;
    } else {
      // Create new address
      try {
        const payload = {
          street: addressFromStore.street,
          city: addressFromStore.region,
          state: addressFromStore.region,
          zipCode: "00000",
          country: addressFromStore.region,
          landmark: "Near Metro Station",
          type: "HOME",
          isDefault: true,
        };
        const createRes = await api.post(`/api/user/addresses`, payload);
        if (createRes.data.success) {
          addressId = createRes.data.data.id;
        } else {
          alert(`فشل إنشاء العنوان: ${createRes.data.message}`);
          return;
        }
      } catch (error) {
        console.error("Error creating address:", error);
        alert("حدث خطأ أثناء إنشاء العنوان. حاول مرة أخرى.");
        return;
      }
    }

    // Place the order with the determined addressId
    const orderPayload = {
      shippingAddressId: addressId,
      billingAddressId: addressId,
      availablePaymentMethodId: selectedPayment.id,
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
        setShowConfirmation(true);

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
    navigate(`/order-tracking/${orderNumber}`);
  };

  const handleContinueShopping = () => {
    setShowConfirmation(false);
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image 36.png')" }}
    >
      <AppNavbar />

      <section className="mx-auto flex flex-col lg:flex-row gap-8 w-full pt-7 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-20 mb-20">
        <div className="w-full lg:w-2/3">
          <PaymentInformationSection />
        </div>
        <div className="w-full lg:w-1/3 mx-auto">
          <ProductDetailsSection />
        </div>
      </section>

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

      {showConfirmation && (
        <ConfirmationModal
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          orderNumber={orderNumber}
          onTrackOrder={handleTrackOrder}
          onContinueShopping={handleContinueShopping}
        />
      )}
    </div>
  );
};
