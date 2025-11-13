import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { useMediaQuery } from "@mui/material";

export const LogoutConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width: 900px)");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div
        className={`relative bg-white p-6 shadow-lg flex flex-col items-center gap-6 ${
          isMobile ? "rounded-t-[30px] p-1 pb-8 " : "rounded-[10px] px-6 py-10"
        }`}
        style={{
          width: isMobile ? "100%" : "707px",
          height: isMobile ? "auto" : "521px",
          bottom: isMobile ? 0 : "auto",
          position: isMobile ? "absolute" : "static",
          transition: "all 0.3s ease-in-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon from public directory */}
        <div className="flex items-center justify-center w-full">
          <img
            src="/logout-popup-icon.png"
            alt="Logout Icon"
            className="w-[272px] h-[272px] object-contain"
          />
        </div>

        {/* Title */}
        <h3
          className={`font-[cairo] font-semibold text-[#1a1713] text-[24px] text-center ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {t("logoutModal.title")}
        </h3>

        {/* Description */}
        <h5
          className={`font-[cairo] font-normal text-[#4f4f4f] text-[16px] text-center ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {t("logoutModal.description")}
        </h5>

        {/* Buttons */}
        <div className="flex justify-content-between items-center gap-4 w-full">
          <Button
            type="button"
            onClick={onConfirm}
            className="h-14 flex-1 rounded-[10px] bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] font-[cairo] font-bold text-[#fefefe] text-[18px] hover:opacity-90"
          >
            {t("logoutModal.yes")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-14 flex-1 rounded-[10px] border border-[#c3c3c3] bg-transparent font-[cairo] font-bold text-[#4f4f4f] text-[18px] hover:bg-[#f3efec]"
          >
            {t("logoutModal.no")}
          </Button>
        </div>
      </div>
    </div>
  );
};
