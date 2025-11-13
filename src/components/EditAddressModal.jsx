import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import { useMediaQuery } from "@mui/material";

export const EditAddressModal = ({ isOpen, onClose, onSave, initialData }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");

  const [region, setRegion] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [id, setId] = useState(null);

  // when modal opens or data changes
  useEffect(() => {
    if (initialData) {
      console.log(initialData);
      setRegion(initialData.region || "");

      setStreet(initialData.street || "");
      setBuilding(initialData.building || "");
      setId(initialData.id || null);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    // send id + data to parent
    onSave({ id, region, street, building });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div
        className={`relative bg-white p-6 shadow-lg ${
          isMobile ? "rounded-t-[30px]" : "rounded-[10px]"
        }`}
        style={{
          width: isMobile ? "100%" : "707px",
          height: isMobile ? "auto" : "520px",
          bottom: isMobile ? 0 : "auto",
          position: isMobile ? "absolute" : "static",
          transition: "all 0.3s ease-in-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 ${
            isArabic ? "left-4" : "right-4"
          } text-[#4f4f4f] hover:text-[#1a1713]`}
        >
          <X className="w-6 h-6" />
        </button>

        <h3
          className={`font-[cairo] text-[24px] font-semibold text-[#1a1713] mb-[24px] ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {t("addresses.editTitle")}
        </h3>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Region */}
          <div className="flex flex-col items-end gap-3">
            <Label
              className={`self-stretch text-[#1a1713] font-medium font-[cairo] text-[20px] ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("addresses.regionLabel")}
            </Label>
            <Input
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder={t("addresses.regionPlaceholder")}
              className={`h-12 px-4 py-2 rounded-[10px] border border-[#c4c4c4] text-[#4f4f4f] font-[cairo] text-[14px] ${
                isArabic ? "text-right" : "text-left"
              }`}
              required
            />
          </div>

          {/* Street */}
          <div className="flex flex-col items-end gap-3">
            <Label
              className={`self-stretch text-[#1a1713] font-medium font-[cairo] text-[20px] ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("addresses.streetLabel")}
            </Label>
            <Input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder={t("addresses.streetPlaceholder")}
              className={`h-12 px-4 py-2 rounded-[10px] border border-[#c4c4c4] text-[#4f4f4f] font-[cairo] text-[14px] ${
                isArabic ? "text-right" : "text-left"
              }`}
              required
            />
          </div>

          {/* Building */}
          <div className="flex flex-col items-end gap-3">
            <Label
              className={`self-stretch text-[#1a1713] font-medium font-[cairo] text-[20px] ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("addresses.buildingLabel")}
            </Label>
            <Input
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              placeholder={t("addresses.buildingPlaceholder")}
              className={`h-12 px-4 py-2 rounded-[10px] border border-[#c4c4c4] text-[#4f4f4f] font-[cairo] text-[14px] ${
                isArabic ? "text-right" : "text-left"
              }`}
              required
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] text-white font-[cairo] text-[16px] hover:opacity-90"
          >
            {t("addresses.editButton")}
          </Button>
        </form>
      </div>
    </div>
  );
};
