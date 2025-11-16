import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const PageTitleHandler = () => {
  const location = useLocation();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const path = location.pathname;

    // Define route → title mapping (keys used in i18n translations)
    const titles = {
      "/": t("titles.home"),
      "/home": t("titles.home"),
      "/offers": t("titles.offers"),
      "/blogs": t("titles.blogs"),
      "/stores": t("titles.stores"),
      "/try-at-home": t("titles.tryAtHome"),
      "/best-selling": t("titles.bestSelling"),
      "/about-us": t("titles.aboutUs"),
      "/contact-us": t("titles.contactUs"),
      "/search": t("titles.search"),
      "/search2": t("titles.mobileSearch"),
      "/recently-arrived": t("titles.recentlyArrived"),
      "/product-details": t("titles.productDetails"),
      "/profile": t("titles.profile"),
      "/profil  e/change-password": t("titles.changePassword"),
      "/previous-orders": t("titles.orders"),
      "/profile/saved-addresses": t("titles.savedAddresses"),
      "/profile/favorites": t("titles.wishlist"),
      "/cart": t("titles.cart"),
      "/register": t("titles.register"),
      "/forgot-password": t("titles.forgotPassword"),
      "/reset-password": t("titles.resetPassword"),
    };

    // Default title fallback
    document.title = titles[path] || t("titles.default");
  }, [location, i18n.language, t]);

  return null; // doesn’t render anything
};
