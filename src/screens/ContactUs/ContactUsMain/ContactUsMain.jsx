import React from "react";
import { useTranslation } from "react-i18next";
import { AppNavbar } from "../../../components/Layout/Navbar";

export const ContactUsMain = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const contactInfo = t("contactUs.contactInfo", { returnObjects: true });
  const formFields = t("contactUs.formFields", { returnObjects: true });

  return (
    <section className="relative w-full min-h-[1129px] md:h-[1250px] lg:h-[1129px] bg-[#fefefe] overflow-hidden">
      <div className="w-full pt-3 z-10 relative">
        <div className="max-w-[1440px] mx-auto">
          <AppNavbar />
        </div>
      </div>
      {/* Background images */}
      <img
        className="absolute top-0 left-0 w-full md:h-[1250px] h-[1129px] object-cover"
        alt="background"
        src="/contactUs-img2.png"
      />
      <img
        className="absolute top-0 left-0 w-full h-[570px] object-cover"
        alt="background overlay"
        src="/contactUs-img.png"
      />

      {/* Main content */}
      <div
        className={`flex  flex-col lg:flex-row items-stretch justify-center absolute top-[180px] md:top-[280px] lg:top-[426px] left-0 right-0 px-[48px] md:px-[80px] lg:px-[120px] ${
          isArabic ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Contact Info Card */}
        <div className="order-1 lg:order-1 w-full lg:w-[408px] bg-[#ffffff80] rounded-t-[16px] lg:rounded-l-[24px] shadow-[0px_4px_12px_#0000001f] p-6 flex flex-col gap-3 lg:gap-6">
          <div className="flex flex-col gap-6 justify-start">
            <h3 className=" text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] font-medium lg:font-semibold font-[Cairo] text-[#1a1713]">
              {t("contactUs.keepInTouchTitle")}
            </h3>
            <p className="text-[14px] sm:text-[15px] lg:text-[16px] font-[Cairo] font-normal lg:font-medium text-[#1a1713] leading-[150%]">
              {t("contactUs.keepInTouchDesc")}
            </p>

            <div className={`flex flex-col gap-3 items-start `}>
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-row items-center gap-3 `}
                >
                  <img src={item.icon} alt="icon" className="w-6 h-6" />
                  <span className="text-[#1a1713]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start gap-3">
            <h5 className="text-[16px] font-semibold font-[Cairo] text-[#1a1713]">
              {t("contactUs.followUs")}
            </h5>
            <div className="flex gap-4 end">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10  flex items-center justify-center  transition-all hover:scale-110"
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
                className="w-10 h-10 flex items-center justify-center  transition-all hover:scale-110"
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
                className="w-10 h-10  flex items-center justify-center  transition-all hover:scale-110"
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

        {/* Form Card */}
        <div className="order-2 lg:order-2 w-full lg:w-[792px] bg-[#ffffff80] rounded-b-[16px] lg:rounded-r-[24px] shadow-[0px_4px_12px_#0000001f] px-[16px] py-[24px] flex flex-col justify-center">
          <h3
            className={`text-[20px] sm:text-[22px] lg:text-[24px] leading-[100%] font-medium lg:font-semibold font-[Cairo] text-[#1a1713] mb-6 lg:mb-10 ${
              isArabic ? "text-right" : "text-left"
            }`}
          >
            {t("contactUs.sendUs")}
          </h3>

          <form
            className={`flex flex-col gap-6 ${
              isArabic ? "items-end text-right" : "items-start text-left"
            }`}
          >
            {formFields.map((field) => (
              <div key={field.id} className="flex flex-col gap-3 w-full">
                <label
                  htmlFor={field.id}
                  className="text-[#1a1713] text-[16px] md:text-[18px] lg:text-[20px] leading-[100%] font-[Cairo] font-normal lg:font-medium"
                >
                  {field.label}
                </label>

                {field.type === "input" ? (
                  <input
                    id={field.id}
                    placeholder={field.placeholder}
                    className={`h-14 px-4 py-2 rounded-[10px] border text-[12px] md:text-[14px] lg:text-[14px] leading-[100%] font-normal font-[Cairo] border-[#aaaaaa] text-[#292929] focus:outline-none ${
                      isArabic
                        ? "text-right placeholder:text-right"
                        : "text-left placeholder:text-left"
                    }  bg-[#ffffff00] placeholder:text-[#292929]`}
                  />
                ) : (
                  <textarea
                    id={field.id}
                    placeholder={field.placeholder}
                    className={`h-[163px] p-4 rounded-[10px] border text-[14px] leading-[100%] font-normal font-[Cairo] border-[#aaaaaa] text-[#292929] resize-none focus:outline-none ${
                      isArabic
                        ? "text-right placeholder:text-right"
                        : "text-left placeholder:text-left"
                    } bg-[#ffffff00] placeholder:text-[#292929]`}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="h-14 w-full rounded-[10px] bg-gradient-to-l from-[#805B3C] to-[#D3BAA4] text-white font-medium hover:opacity-90 transition"
            >
              {t("contactUs.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
