import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const FooterSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === "ar";
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter email:", email);
    setEmail("");
  };
  const handleNavClick = (path) => {
    navigate(path);
  };

  const footerLinks = {
    importantLinks: [
      { label: t("footer_main"), path: "/home" },
      { label: t("footer_stores"), path: "/stores" },
      { label: t("footer_best_selling"), path: "/best-selling" },
      { label: t("footer_try_at_home"), path: "/try-at-home" },
      { label: t("footer_blogs"), path: "/blogs" },
    ],
    about: [
      { label: t("footer_who_we_are"), path: "/about-us" },
      { label: t("footer_contact"), path: "/contact-us" },
    ],
  };

  return (
    <footer
      className="bg-[url('/footer-bg-mobile.png')] md:bg-[url('/footer-bg.png')]
        bg-cover bg-center bg-no-repeat relative overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-12 relative">
        {/*         first edit
         */}{" "}
        <div className="max-w-6xl bg-[#F3EFEC] mx-auto rounded-3xl p-8 mb-12 ">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <h3
              className=" text-[#1A1713] text-left text-xl md:text-[24px] font-medium"
              style={{ fontFamily: "Cairo" }}
            >
              {t("footer_newsletter_title")}
            </h3>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full md:w-auto "
            >
              <div className="flex flex-row flex-grow border border-[#A67C52]/80 rounded-[10px] overflow-hidden  md:w-[450px] lg:w-[558px]">
                {/* Input */}
                <input
                  type="email"
                  placeholder={t("footer_newsletter_placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`flex-1 px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:outline-none bg-[#F3EFEC] ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                  style={{ fontFamily: "Cairo" }}
                />

                {/* Button */}
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#C2A182] to-[#7B5232] text-white w-[151px] font-bold px-6 py-3 hover:opacity-90 transition-all duration-300"
                  style={{ fontFamily: "Cairo" }}
                >
                  {t("footer_newsletter_button")}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/*         //second div
         */}{" "}
        <div className="grid grid-cols-1 md:grid-cols-[22%_16%_16%_18%] gap-12 mb-8 w-[100%] md:w-[85%] lg:w-[72%]">
          {/*logo & description*/}
          <div
            className={`space-y-2 text-center  ${
              isArabic ? "md:text-right" : "md:text-left"
            }`}
          >
            <div className="flex items-center gap-3 justify-center  md:justify-start">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center  ${
                  isArabic
                    ? "bg-[linear-gradient(270deg,#805B3C_0%,#D3BAA4_100%)]"
                    : "bg-[linear-gradient(90deg,#805B3C_0%,#D3BAA4_100%)]"
                }`}
              >
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-[#A67C52] font-bold text-2xl">
                {t("footer_logo_text")}
              </span>
            </div>
            <p className=" text-[14px] text-[#4F4F4F]">
              {t("footer_description")}
            </p>
            <div className="hidden md:block  mt-11">
              <h5
                className={`text-[#1A1713] font-medium text-lg mt-4 mb-4 text-center ${
                  isArabic ? "md:text-right" : "md:text-left"
                }`}
                style={{ fontFamily: "Cairo" }}
              >
                {t("footer_follow")}
              </h5>

              <div className="flex gap-3 justify-center md:justify-start">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center transition-all hover:scale-110"
                >
                  <img
                    src="/skill-icons_instagram.svg"
                    alt="language icon"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="https://wa.me/966551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10  flex items-center justify-center transition-all hover:scale-110"
                >
                  <img
                    src="/logos_whatsapp-icon.svg"
                    alt="language icon"
                    width={32}
                    height={32}
                  />{" "}
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10  flex items-center justify-center   transition-all hover:scale-110"
                >
                  <img
                    src="/logos_facebook.svg"
                    alt="language icon"
                    width={32}
                    height={32}
                  />
                </a>
              </div>
            </div>
          </div>
          {/*important links*/}
          <div
            className={`text-center  ${
              isArabic ? "md:text-right" : "md:text-left"
            }`}
          >
            <h3
              className="  text-[#1A1713] text-xl font-medium  mb-6"
              style={{ fontFamily: "Cairo" }}
            >
              {t("footer_important_links")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.importantLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-[#1A1713] font-medium text-[18px] hover:text-[#A67C52] transition-colors duration-200"
                    style={{ fontFamily: "Cairo" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/*about us*/}

          <div
            className={`text-center  ${
              isArabic ? "md:text-right" : "md:text-left"
            }`}
          >
            <h3
              className="text-[#1A1713] text-xl font-medium mb-6"
              style={{ fontFamily: "Cairo" }}
            >
              {t("footer_about")}
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.path)}
                    className="text-[#1A1713] font-medium text-[18px] hover:text-[#A67C52] transition-colors duration-200"
                    style={{ fontFamily: "Cairo" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/*contact us*/}
          <div
            className={`text-center  ${
              isArabic ? "md:text-right" : "md:text-left"
            }`}
          >
            <h4
              className="text-[#1A1713] text-xl font-medium mb-6"
              style={{ fontFamily: "Cairo" }}
            >
              {t("footer_contact_us")}
            </h4>
            <div className="space-y-4 ">
              <a
                href={`tel:${t("footer_phone")}`}
                className="flex  justify-center md:justify-start  gap-3 hover:text-[#A67C52] transition-colors duration-200"
              >
                <img
                  src="/call.svg"
                  alt="language icon"
                  width={24}
                  height={24}
                />

                <span
                  dir="ltr"
                  className={`whitespace-nowrap  text-[#1A1713] hover:text-[#A67C52] font-medium text-[18px] `}
                  style={{ fontFamily: "Cairo" }}
                >
                  {t("footer_phone")}
                </span>
              </a>
              <a
                href={`mailto:${t("footer_email")}`}
                className="flex  justify-center md:justify-start  gap-3 text-gray-600 hover:text-[#A67C52] transition-colors duration-200"
              >
                <img
                  src="/sms.svg"
                  alt="language icon"
                  width={24}
                  height={24}
                />
                <span
                  className="text-[#1A1713] hover:text-[#A67C52] font-medium text-[18px]"
                  style={{ fontFamily: "Cairo" }}
                >
                  {t("footer_email")}
                </span>
              </a>
            </div>
            <div className="block md:hidden mt-8">
              <h5
                className="text-[#1A1713] font-medium text-lg mb-4"
                style={{ fontFamily: "Cairo" }}
              >
                {t("footer_follow")}
              </h5>

              <div className="flex gap-3 justify-center md:justify-end">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="  transition-all hover:scale-110"
                >
                  <img
                    src="/logos_facebook.svg"
                    alt="language icon"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="https://wa.me/966551234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" transition-all hover:scale-110"
                >
                  <img
                    src="/logos_whatsapp-icon.svg"
                    alt="language icon"
                    width={32}
                    height={32}
                  />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all hover:scale-110"
                >
                  <img
                    src="/skill-icons_instagram.svg"
                    alt="language icon"
                    width={32}
                    height={32}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*after border*/}
        <div className="border-t border-gray-300 ">
          <div className="flex flex-col md:flex-row items-center justify-center my-auto gap-6">
            <h5
              dir={"ltr"}
              className={`text-[#1A1713] font-medium text-[16px] py-7`}
              style={{ fontFamily: "Cairo" }}
            >
              Furniture � 2025 {t("footer_copyright")}
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
};
