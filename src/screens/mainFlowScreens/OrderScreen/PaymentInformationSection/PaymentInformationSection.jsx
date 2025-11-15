import React, { useState, useEffect } from "react";
import api from "../../../../Api/Axios";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setGlobalValue } from "../../../../Store/Store";

const formFields = [
  { id: "name", label: "الاسم", placeholder: "ادخل الاسم", type: "text" },
  { id: "phone", label: "رقم الجوال", placeholder: "ادخل رقم الجوال", type: "text" },
  { id: "street", label: "اسم الشارع", placeholder: "ادخل اسم الشارع", type: "text" },
  { id: "building", label: "رقم المبنى", placeholder: "ادخل رقم المبنى", type: "text" },
  { id: "region", label: "المنطقة", placeholder: "ادخل المنطقة", type: "text" },
];

export const PaymentInformationSection = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    building: "",
    region: "",
  });

  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { i18n } = useTranslation();

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  // Fetch payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await api.get(`/api/payment-methods/available`);
        if (response.data.success) {
          setPaymentMethods(response.data.data);
          setSelectedPayment(response.data.data[0] || "");
          dispatch(setGlobalValue({ key: "selectedPayment", value: response.data.data[0] }));
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };
    fetchPaymentMethods();
  }, []);

  // Fetch user addresses
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData")) || {};

        const response = await api.get(`/api/user/addresses`);
        if (response.data.success && response.data.data.length > 0) {
          const firstAddress = response.data.data[0];
          dispatch(setGlobalValue({ key: "addressId", value: firstAddress.id }));

          const addressObj = {
            street: firstAddress.street,
            building: firstAddress.street.split(" ")[0],
            region: firstAddress.state,
          };

          setFormData({
            name: userData.username || "",
            phone: userData.phoneNumber || "",
            ...addressObj,
          });

          dispatch(setGlobalValue({ key: "address", value: addressObj }));
        } else {
          // No address, still set name and phone
          setFormData({
            name: userData.username || "",
            phone: userData.phoneNumber || "",
            street: "",
            building: "",
            region: "",
          });
          dispatch(setGlobalValue({ key: "address", value: {} }));
        }
      } catch (error) {
        console.error("Error fetching user addresses:", error);
      }
    };
    fetchUserData();
  }, []);

  // Store selected payment in localStorage
  useEffect(() => {
    if (selectedPayment) {
      localStorage.setItem("selectedPayment", JSON.stringify(selectedPayment));
    }
  }, [selectedPayment]);

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(newFormData);

    // Update address in Redux store whenever street/building/region changes
    if (["street", "building", "region"].includes(e.target.id)) {
      const addressObj = {
        street: newFormData.street,
        building: newFormData.building,
        region: newFormData.region,
      };
      dispatch(setGlobalValue({ key: "address", value: addressObj }));
    }
  };

  return (
    <section className="flex flex-col items-start gap-6 relative w-full font-cairo max-w-full px-4 sm:px-0">
      {/* Form Fields */}
      <div className="flex flex-col items-start gap-6 relative self-stretch w-full">
        {formFields.map((field) => (
          <div key={field.id} className="flex flex-col items-start gap-3 w-full">
            <Label htmlFor={field.id} className="text-[#1a1713] text-sm sm:text-base font-h4-medium">
              {field.label}
            </Label>
            <Input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.id]}
              onChange={handleChange}
              className="flex h-12 sm:h-14 w-full rounded-[10px] border border-[#c3c3c3] px-4 text-[#4f4f4f] text-sm sm:text-base text-right"
            />
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="flex flex-col gap-6 w-full">
        <h2 className="font-h2-semiboald text-[#1a1713] text-lg sm:text-xl">طرق الدفع</h2>
        {paymentMethods.length === 0 ? (
          <p className="text-gray-500 text-sm">جاري تحميل طرق الدفع...</p>
        ) : (
          <RadioGroup
            value={selectedPayment.name || ""}
            onValueChange={(val) => {
              const method = paymentMethods.find((m) => m.name === val);
              setSelectedPayment(method);
              dispatch(setGlobalValue({ key: "selectedPayment", value: method }));
            }}
            className="flex flex-col w-full gap-4"
          >
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-end gap-2 w-full">
                <Label htmlFor={method.name} className="cursor-pointer text-sm sm:text-base text-[#1a1713]">
                  {method.name}
                </Label>
                <RadioGroupItem
                  value={method.name}
                  id={method.name}
                  className="w-6 h-6 shrink-0"
                />
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
    </section>
  );
};
