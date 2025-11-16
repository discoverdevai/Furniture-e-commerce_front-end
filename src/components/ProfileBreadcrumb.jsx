import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const ProfileBreadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // Define the same menu items (we can extract this into a shared file later)
  const menuItems = [
    { label: t("sidebar.profile"), path: "/profile" },
    { label: t("sidebar.changePassword"), path: "/profile/change-password" },
    { label: t("sidebar.orders"), path: "/previous-orders" },
    { label: t("sidebar.favorites"), path: "/profile/favorites" },
    { label: t("sidebar.savedAddresses"), path: "/profile/saved-addresses" },
  ];

  // Get current path
  const currentPath = location.pathname;

  // Find which menu item matches the current path
  const currentItem = menuItems.find((item) => item.path === currentPath);

  // RTL / LTR direction
  const arrow = isArabic ? "←" : "→";

  // If we are in the main profile screen
  if (currentPath === "/profile") {
    return (
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className="flex items-center text-[16px] font-[cairo] text-[#1a1713]"
      >
        {t("sidebar.profile")}
      </div>
    );
  }

  // Otherwise, show "Profile > current section"
  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="flex items-center gap-0.5 font-normal text-[16px] font-[cairo]"
    >
      {/* Clickable Profile link */}
      <button
        onClick={() => navigate("/profile")}
        className="text-[#835f40] hover:underline "
      >
        {t("sidebar.profile")}
      </button>

      {/* Arrow separator */}
      <img
        src="/breadcrumb-arrow.svg"
        alt="breadcrumb arrow"
        className={`w-6 h-6 ${isArabic ? "" : "rotate-180"} text-[#835f40]`}
        style={{
          filter:
            "invert(34%) sepia(22%) saturate(630%) hue-rotate(14deg) brightness(90%) contrast(88%)",
        }}
      />

      {/* Current page label */}
      <span className="text-[#4F4F4F] ">
        {currentItem ? currentItem.label : ""}
      </span>
    </div>
  );
};
