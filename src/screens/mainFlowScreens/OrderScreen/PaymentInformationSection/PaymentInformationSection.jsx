import React, { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select";
import { useTranslation } from "react-i18next";

const formFields = [
  { id: "name", label: "الاسم", placeholder: "ادخل الاسم", type: "text" },
  { id: "street", label: "اسم الشارع", placeholder: "ادخل اسم الشارع", type: "text" },
  { id: "building", label: "رقم المبنى", placeholder: "ادخل رقم المبنى", type: "text" },
];

export const PaymentInformationSection = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

  // Fetch payment methods from backend
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/products/payment-method`);
        if (response.data.success) {
          setPaymentMethods(response.data.data);
          // Set default selected
          setSelectedPayment(response.data.data[0] || "");
        } else {
          console.error("Failed to load payment methods:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, []);

  // Store selected payment in localStorage whenever it changes
  useEffect(() => {
    if (selectedPayment) {
      console.log("selPay" + selectedPayment.paymentName);
      
      localStorage.setItem("selectedPayment", JSON.stringify(selectedPayment));
    }
  }, [selectedPayment]);

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
              className="flex h-12 sm:h-14 w-full rounded-[10px] border border-[#c3c3c3] px-4 text-[#4f4f4f] text-sm sm:text-base text-right"
            />
          </div>
        ))}

        {/* Region Select */}
        <div className="flex flex-col items-start gap-3 w-full">
          <Label htmlFor="region" className="text-sm sm:text-base font-h4-medium text-[#1a1713]">المنطقة</Label>
          <Select>
            <SelectTrigger id="region" className="flex h-12 sm:h-14 items-center justify-start gap-2 px-4 rounded-[10px] border border-[#c3c3c3]">
              <SelectValue placeholder="اختر المدينة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="riyadh">الرياض</SelectItem>
              <SelectItem value="jeddah">جدة</SelectItem>
              <SelectItem value="dammam">الدمام</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="flex flex-col gap-6 w-full">
        <h2 className="font-h2-semiboald text-[#1a1713] text-lg sm:text-xl">طرق الدفع</h2>
        {paymentMethods.length === 0 ? (
          <p className="text-gray-500 text-sm">جاري تحميل طرق الدفع...</p>
        ) : (
          <RadioGroup
            value={selectedPayment.paymentName || ""}
            onValueChange={(val) => {
              const method = paymentMethods.find((m) => m.paymentName === val);
              setSelectedPayment(method);
            }}
            className="flex flex-col w-full gap-4"
          >
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-end gap-2 w-full">
                <Label htmlFor={method.paymentName} className="cursor-pointer text-sm sm:text-base text-[#1a1713]">
                  {method.paymentName}
                </Label>
                <RadioGroupItem
                  value={method.paymentName}
                  id={method.paymentName}
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
