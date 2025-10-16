import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalValue } from "../../Store/Store";
import { ChevronRight as ChevronRightIcon, Mail } from "lucide-react";
import { RiMailSendLine } from "react-icons/ri";
import { LuMessageCircleMore } from "react-icons/lu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { LanguageToggle } from "../../components/LanguageToggle";
import { VerificationModal } from "../../components/VerificationModal";
import api from "../../Api/Axios";
import Swal from "sweetalert2";

export const ForgotPassword = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("sms");
  /* const [phoneNumber, setPhoneNumber] = useState(() => {
    const savedPhone = localStorage.getItem("forgotPassword_phoneNumber");
    return savedPhone;
  }); */
  const usernamefromphonenumber = useSelector(
    (state) => state.global.usernamefromphonenumber
  );

  const [email, setEmail] = useState("user@gmail.com");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRTL = i18n.language === "ar";

  const encryptPhoneNumber = (phone) => {
    if (!phone || phone.length !== 10) return phone;
    return `${phone.slice(0, 2)}********`;
  };

  const encryptEmail = (email) => {
    const [name, domain] = email.split("@");
    if (!name || !domain) return email;
    return `${name.slice(0, 2)}*****@${domain}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post("api/auth/send-otp", null, {
        params: {
          username: usernamefromphonenumber,
        },
      });

      setShowVerificationModal(true);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: t("errorTitle") || "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: t("ok"),
        confirmButtonColor: "#835f40",
        customClass: {
          popup: isRTL ? "swal-rtl" : "swal-ltr",
          title: `font-['Cairo',Helvetica] ${
            isRTL ? "text-right" : "text-left"
          }`,
          htmlContainer: `font-['Cairo',Helvetica] ${
            isRTL ? "text-right" : "text-left"
          }`,
          confirmButton: `font-['Cairo',Helvetica]`,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToSignIn = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#fefefe] w-full min-h-screen relative overflow-hidden">
      <LanguageToggle />

      <div
        className={`flex flex-col lg:flex-row w-full max-w-[1360px] mx-auto lg:items-center justify-between gap-4 p-4 lg:p-10 min-h-screen ${
          isRTL ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        <div
          className={`w-full lg:w-[668px] flex justify-center ${
            isRTL
              ? "lg:justify-end order-1 lg:order-2"
              : "lg:justify-start order-1 lg:order-2"
          }`}
        >
          <div className="relative w-full max-w-[500px] lg:max-w-[668px]">
            <img
              className="w-full h-[300px] sm:h-[400px] lg:h-[600px] xl:h-[850px] rounded-[30px] lg:rounded-[50px] object-cover"
              alt="Interior design"
              src="/rectangle-1.png"
            />

            <Card className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 border-0">
              <CardContent className="flex flex-col items-center justify-center gap-4 lg:gap-6 p-6 lg:p-8 bg-white/75 backdrop-blur-sm rounded-[15px] lg:rounded-[20px] shadow-sm border-0 min-h-[120px] lg:min-h-[185px]">
                <div
                  className={`flex flex-col w-full items-center justify-center gap-3 lg:gap-4 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <p
                    className={`text-[#1a1713] text-sm sm:text-base lg:text-2xl font-normal leading-relaxed font-['Cairo',Helvetica] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t("testimonial")}
                  </p>

                  <div
                    className={`flex w-full items-center justify-between ${
                      isRTL ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div className="flex items-center gap-2 lg:gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="flex w-6 h-6 lg:w-8 lg:h-8 items-center justify-center p-1 rounded-full bg-gradient-to-r from-[#805b3c] to-[#d3baa4] text-white hover:opacity-80 transition-opacity border-0"
                      >
                        <ChevronRightIcon className="w-2 h-2 lg:w-3 lg:h-3 rotate-180" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="flex w-6 h-6 lg:w-8 lg:h-8 items-center justify-center p-1 rounded-full bg-gradient-to-r from-[#805b3c] to-[#d3baa4] text-white hover:opacity-80 transition-opacity border-0"
                      >
                        <ChevronRightIcon className="w-2 h-2 lg:w-3 lg:h-3" />
                      </Button>
                    </div>

                    <div
                      className={`inline-flex items-center gap-2 ${
                        isRTL ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div
                        className={`flex flex-col gap-1 ${
                          isRTL ? "items-end" : "items-start"
                        }`}
                      >
                        <p
                          className={`font-medium text-[#3b3b3b] text-xs sm:text-sm lg:text-base leading-tight font-['Cairo',Helvetica] ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                        >
                          {t("userName")}
                        </p>

                        <p
                          className={`font-normal text-[#3b3b3b] text-[10px] sm:text-xs lg:text-sm leading-tight font-['Cairo',Helvetica] ${
                            isRTL ? "text-right" : "text-left"
                          }`}
                        >
                          {t("date")}
                        </p>
                      </div>

                      <Avatar className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12">
                        <AvatarImage src="/ellipse-13.png" alt="User avatar" />
                        <AvatarFallback>تق</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div
          className={`flex flex-col w-full lg:w-[668px] items-center gap-8 lg:gap-20 ${
            isRTL ? "order-1 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          <div className="flex flex-col w-full max-w-[503px] items-center gap-4 lg:gap-6">
            <h1
              className={`text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#835f40] text-center leading-tight font-['Cairo',Helvetica]`}
            >
              {t("forgotPasswordTitle")}
            </h1>

            <p
              className={`text-base sm:text-lg lg:text-[14.5px] font-normal text-[#666] text-center leading-relaxed font-['Cairo',Helvetica] max-w-md`}
            >
              {t("forgotPasswordDescription")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-6 w-full max-w-[503px]"
          >
            <div className="flex flex-col items-start gap-6 w-full">
              <div
                className={`flex flex-col gap-3 w-full ${
                  isRTL ? "items-end" : "items-start"
                }`}
              >
                <div
                  onClick={() => setSelectedMethod("sms")}
                  className={`flex h-12 lg:h-14 items-center gap-3 px-4 py-2 w-full rounded-[15px] border cursor-pointer transition-all duration-200 ${
                    selectedMethod === "sms"
                      ? "border-[#835f40] bg-gray-100"
                      : "border-[#c3c3c3] bg-white"
                  } ${isRTL ? "flex-row" : "flex-row"}`}
                >
                  <LuMessageCircleMore size={24} opacity={0.7} />
                  <span
                    className={`flex-1 text-[#292929] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`flex-column items-center gap-1 ${
                        isRTL ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      <div className="px-2">{t("viaSMS")}</div>
                      <span
                        className={`font-semibold  ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                        dir="ltr"
                      >
                        +966 {encryptPhoneNumber(usernamefromphonenumber)}
                      </span>
                    </div>
                  </span>
                </div>
              </div>

              <div
                className={`flex flex-col gap-3 w-full ${
                  isRTL ? "items-end" : "items-start"
                }`}
              >
                <div
                  onClick={() => setSelectedMethod("email")}
                  className={`flex h-12 lg:h-14 items-center gap-3 px-4 py-2 w-full rounded-[15px] border cursor-pointer transition-all duration-200 ${
                    selectedMethod === "email"
                      ? "border-[#835f40] bg-gray-100"
                      : "border-[#c3c3c3] bg-white"
                  } ${isRTL ? "flex-row" : "flex-row"}`}
                >
                  <RiMailSendLine size={24} opacity={0.7} />
                  <span
                    className={`flex-1 text-[#292929] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    <div className="flex-column items-center gap-1">
                      <div className="px-2">{t("viaEmail")}</div>
                      <span
                        className={`font-semibold ${
                          isRTL ? "text-left" : "text-left"
                        }`}
                      >
                        {encryptEmail(email)}
                      </span>
                    </div>
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-12 lg:h-14 text-white font-bold text-lg font-['Cairo',Helvetica] rounded-[10px] transition-all duration-200 border-0 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:bg-[linear-gradient(270deg,rgba(128,91,60,0.9)_0%,rgba(211,186,164,0.9)_100%)]"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t("sendButton")}...</span>
                  </div>
                ) : (
                  t("sendButton")
                )}
              </Button>

              <div
                className={`flex items-center gap-2 w-full justify-center  text-sm font-['Cairo',Helvetica] ${
                  isRTL ? "flex-row" : "flex-row"
                }`}
              >
                <span className="text-[#666]">{t("backToSignIn")}</span>
                <button
                  type="button"
                  onClick={navigateToSignIn}
                  className="text-[#835f40] hover:text-[#6b4a32] font-medium underline transition-colors"
                >
                  {t("signIn")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={email}
        verificationType="forgot-password"
      />

      <style jsx global>{`
        .swal-rtl {
          direction: rtl;
          text-align: right;
        }
        .swal-ltr {
          direction: ltr;
          text-align: left;
        }
      `}</style>
    </div>
  );
};
