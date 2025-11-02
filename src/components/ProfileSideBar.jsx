import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
/* import { LogoutConfirmModal } from "./LogoutConfirmModal";
 */
export const ProfileSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const menuItems = [
    { label: t("sidebar.profile"), path: "/profile" },
    { label: t("sidebar.changePassword"), path: "/profile/change-password" },
    { label: t("sidebar.orders"), path: "/profile/orders" },
    { label: t("sidebar.favorites"), path: "/profile/favorites" },
    { label: t("sidebar.savedAddresses"), path: "/profile/saved-addresses" },
  ];

  const handleLogoutClick = () => setIsLogoutModalOpen(true);
  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    console.log("User logged out");
  };

  return (
    <aside
      className="w-full max-w-[282px] min-h-[492px] bg-[#f3efec] rounded-[10px] overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <nav className="flex flex-col w-full items-start gap-[120px] py-3">
        <div
          className={`flex flex-col w-full ${
            isArabic ? "items-start text-start" : "items-start"
          }`}
        >
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex h-10 items-center justify-start gap-2 px-3 py-2 w-full ${
                  isActive ? "border-r-4 border-[#835f40]" : ""
                }`}
              >
                <div
                  className={`font-medium text-[16px] ${
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
          <div className="text-[#1a1713] font-medium">
            {t("sidebar.logout")}
          </div>
        </button>
      </nav>

      {/*  <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      /> */}
    </aside>
  );
};
