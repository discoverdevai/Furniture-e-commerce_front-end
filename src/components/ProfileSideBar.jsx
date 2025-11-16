import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogoutConfirmModal } from "../components/LogoutConfirmModal";
import Swal from "sweetalert2";

export const ProfileSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const menuItems = [
    { label: t("sidebar.profile"), path: "/profile" },
    { label: t("sidebar.changePassword"), path: "/profile/change-password" },
    { label: t("sidebar.orders"), path: "/profile/orders" }, // previous-orders the path with the screen must displayed in profile orders
    { label: t("sidebar.favorites"), path: "/profile/favorites" },
    { label: t("sidebar.savedAddresses"), path: "/profile/saved-addresses" },
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
        title: "تم تسجيل الخروج بنجاح",
        text: "لقد تم تسجيل خروجك من الحساب.",
        confirmButtonColor: "#805B3C",
        confirmButtonText: "حسناً",
        customClass: {
          title: "font-['Cairo',Helvetica] text-center",
          htmlContainer: "font-['Cairo',Helvetica] text-center",
          confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
        },
      }).then(() => {
        // 5️⃣ Navigate to login page after alert
        navigate("/signIn");
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
        navigate("/signIn");
      });
    }
  };

  return (
    <aside
      className="w-full max-w-[282px] min-h-[542px] bg-[#f3efec] rounded-[10px] overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <nav className="flex flex-col w-full items-start gap-[120px] py-3">
        <div
          className={`flex flex-col w-full gap-3 ${
            isArabic ? "items-start " : "items-start"
          }`}
        >
          {menuItems.map((item, index) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/profile" &&
                location.pathname.startsWith(item.path));
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex h-10 items-center justify-start gap-2 px-3 py-2 w-full ${
                  isActive
                    ? `${
                        isArabic ? "border-r-4" : "border-l-4"
                      } border-[#835f40]`
                    : ""
                }`}
              >
                <div
                  className={`font-medium text-[18px] leading-[100%] font-[cairo] ${
                    isActive ? "text-[#835f40]" : "text-[#1a1713]"
                  }`}
                >
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleLogoutClick}
          className="flex h-10 items-center justify-start gap-2 px-3 py-2 w-full"
        >
          <div className="text-[#1a1713] font-medium text-[18px] leading-[100%] font-[cairo]">
            {t("sidebar.logout")}
          </div>
        </button>
      </nav>

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </aside>
  );
};
