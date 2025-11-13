import { react, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@mui/material";
import { AppNavbar } from "../../../../components/Layout/Navbar";
import { LogoutConfirmModal } from "../../../../components/LogoutConfirmModal";
import Swal from "sweetalert2";

export const MobileProfileMainSection = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    {
      label: t("sidebar.profile"),
      path: "/profile",
      icon: "/Mobile-profile-icon.svg",
    },
    {
      label: t("sidebar.changePassword"),
      path: "/profile/change-password",
      icon: "/Mobile-key-icon.svg",
    },
    {
      label: t("sidebar.orders"),
      path: "/profile/orders",
      icon: "/Mobile-order-icon.svg",
    },
    {
      label: t("sidebar.favorites"),
      path: "/profile/favorites",
      icon: "/Mobile-heart-icon.svg",
    },
    {
      label: t("sidebar.savedAddresses"),
      path: "/profile/saved-addresses",
      icon: "/Mobile-address-icon.svg",
    },
  ];
  const handleLogoutClick = () => setIsLogoutModalOpen(true);
  const handleLogoutConfirm = () => {
    // 1️⃣ Close the modal
    setIsLogoutModalOpen(false);

    // 2️⃣ Check if user data exists
    const userData = localStorage.getItem("userData");
    if (userData) {
      // 3️⃣ Remove it from localStorage
      localStorage.removeItem("userData");

      // 4️⃣ Show success SweetAlert
      Swal.fire({
        icon: "success",
        title: isArabic ? "تم تسجيل الخروج بنجاح" : "Logged out successfully",
        text: isArabic
          ? "لقد تم تسجيل خروجك من الحساب."
          : "You have been successfully logged out.",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        position: "center",
        customClass: {
          title: "font-['Cairo',Helvetica] text-center",
          htmlContainer: "font-['Cairo',Helvetica] text-center",
          confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
        },
      }).then(() => {
        // 5️⃣ Navigate to login page after alert
        navigate("/");
      });
    } else {
      // Optional: handle case if userData is missing
      Swal.fire({
        icon: "info",
        title: "لم يتم العثور على جلسة مستخدم",
        text: "يرجى تسجيل الدخول أولاً.",
        confirmButtonText: "حسناً",
        customClass: {
          title: "font-['Cairo',Helvetica] text-center",
          htmlContainer: "font-['Cairo',Helvetica] text-center",
          confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
        },
      }).then(() => {
        navigate("/");
      });
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!isMobile) return null; // ✅ avoid rendering on desktop screens

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
      <div className="p-4 overflow-y-auto">
        {/* Header */}
        <div
          className={`relative flex items-center mb-6 ${
            isArabic ? "flex-row" : ""
          }`}
        >
          {/* Back Button */}
          <IconButton
            onClick={handleBackClick}
            edge="start"
            className={`!p-2 absolute  ${isArabic ? "right-2" : "left-2"} z-10`}
          >
            {/* Arrow separator */}
            <img
              src="/breadcrumb-arrow.svg"
              alt="breadcrumb arrow"
              className={`w-6 h-6 ${isArabic ? "rotate-180" : ""}`}
              style={{
                filter: "brightness(0) saturate(100%)",
              }}
            />
          </IconButton>

          {/* Title */}
          <span
            className={`absolute  text-center text-xl font-medium text-[#1A1713] font-[cairo]`}
            style={{
              width: "calc(100% - 32px)", // 52px padding on each side
            }}
          >
            {t("sidebar.MobileprofileTitle")}
          </span>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className="flex items-center p-4  rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center w-10 h-10 rounded-lg mr-3">
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
              </div>

              {/* Label */}
              <span className="text-base font-medium text-[#1A1713] font-[cairo] flex-1">
                {item.label}
              </span>

              {/* Arrow Icon */}
              {/* <div className={`transform ${isArabic ? "rotate-180" : ""}`}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.5 13L10.5 8L5.5 3"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div> */}
            </div>
          ))}
        </div>

        {/* Logout Button - Separate with different styling */}
        <div className="mt-6  pt-3">
          <div
            onClick={() => {
              // Add your logout logic here
              handleLogoutClick();
            }}
            className="flex items-center p-4  rounded-lg shadow-sm border border-gray-100 hover:bg-red-50 cursor-pointer transition-colors duration-200"
          >
            {/* Logout Icon Container */}
            <div className="flex items-center justify-center w-10 h-10  rounded-lg mr-3">
              <img
                src="/Mobile-logout-icon.svg"
                alt="Logout"
                className={`w-6 h-6 transition-transform duration-300 ${
                  isArabic ? "" : "rotate-180"
                }`}
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(35%) sepia(0%) saturate(0%) hue-rotate(176deg) brightness(93%) contrast(92%)",
                }}
              />
            </div>

            {/* Logout Label */}
            <span className="text-base font-medium text-red-600 flex-1">
              {t("sidebar.logout")}
            </span>
          </div>
        </div>
      </div>
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </section>
  );
};
