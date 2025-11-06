import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import api from "../Api/Axios";

export const AddAddressModal = ({ isOpen, onClose, onSave }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [region, setRegion] = useState(""); // country
  const [street, setStreet] = useState(""); // city
  const [building, setBuilding] = useState(""); //street

  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = userData?.token;

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    // Prepare API payload
    const payload = {
      street: building, // modal building input -> API street
      city: street, // modal street input -> API city
      state: street, // leave empty
      zipCode: "00000", // leave empty
      country: region, // modal region input -> API country
      landmark: "بجانب المترو", // leave empty
      type: "HOME",
      isDefault: true,
    };

    try {
      setLoading(true);
      const response = await api.post(`/api/user/addresses`, payload);
      console.log("Response:", response.data);
      // Call parent onSave with the returned address
      if (response.data) {
        onSave(response.data);
        // Reset modal inputs
        setRegion("");
        setStreet("");
        setBuilding("");
        onClose();
      }
    } catch (error) {
      console.log("Error:", error.response.data);
      console.error("Error adding address:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div
        className="relative bg-white rounded-[10px] p-6 shadow-lg"
        style={{ width: "707px", height: "520px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-8 ${
            isArabic ? "left-8" : "right-8"
          } text-[#4f4f4f] hover:text-[#1a1713]`}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h3
          className={`font-[cairo] text-[24px] font-semibold text-[#1a1713] ${
            isArabic ? "text-right" : "text-left"
          } mb-[24px]`}
        >
          {t("addresses.addNew")}
        </h3>

        {/* Form */}
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Region */}
          <div className="flex flex-col items-end gap-3">
            <Label
              className={`self-stretch text-[#1a1713] font-[cairo] text-[16px] ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("addresses.regionLabel")}
            </Label>
            <Input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder={t("addresses.regionPlaceholder")}
              className={`h-14 px-4 py-2 rounded-[10px] border border-[#c3c3c3] text-[#4f4f4f] font-[cairo] text-[14px] ${
                isArabic ? "text-right" : "text-left"
              }`}
              required
            />
          </div>

          {/* Street */}
          <div className="flex flex-col items-end gap-3">
            <Label
              className={`self-stretch text-[#1a1713] font-[cairo] text-[16px] ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("addresses.streetLabel")}
            </Label>
            <Input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder={t("addresses.streetPlaceholder")}
              className={`h-14 px-4 py-2 rounded-[10px] border border-[#c3c3c3] text-[#4f4f4f] font-[cairo] text-[14px] ${
                isArabic ? "text-right" : "text-left"
              }`}
              required
            />
          </div>

          {/* Building */}
          <div className="flex flex-col items-end gap-3">
            <Label
              className={`self-stretch text-[#1a1713] font-[cairo] text-[16px] ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("addresses.buildingLabel")}
            </Label>
            <Input
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              placeholder={t("addresses.buildingPlaceholder")}
              className={`h-14 px-4 py-2 rounded-[10px] border border-[#c3c3c3] text-[#4f4f4f] font-[cairo] text-[14px] ${
                isArabic ? "text-right" : "text-left"
              }`}
              required
            />
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            className="mt-auto h-14 w-full rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] text-white font-[cairo] text-[16px] hover:opacity-90"
          >
            {t("addresses.saveButton")}
          </Button>
        </form>
      </div>
    </div>
  );
};
