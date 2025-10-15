import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { LanguageToggle } from "../../components/LanguageToggle";
import Swal from "sweetalert2";
import api from "../../Api/Axios";

export const ResetPassword = () => {
  const { t, i18n } = useTranslation();
  const username = useSelector((state) => state.global.phonenumber);
  const [phoneNumber, setPhoneNumber] = useState(() => {
    const savedPhone = localStorage.getItem("forgotPassword_phoneNumber");
    return savedPhone;
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRTL = i18n.language === "ar";

  // Re-validate when language changes to update error messages
  useEffect(() => {
    if (Object.keys(touchedFields).length > 0) {
      validateForm();
    }
  }, [i18n.language]);

  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasMinLength = password.length >= 12;

    return hasLowerCase && hasUpperCase && hasSymbols && hasMinLength;
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields((prev) => ({ ...prev, [fieldName]: true }));
    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newPassword.trim()) {
      newErrors.newPassword = t("passwordRequired");
    } else if (!validatePassword(newPassword)) {
      newErrors.newPassword = t("passwordInvalid");
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = t("confirmPasswordRequired");
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t("passwordsDoNotMatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      newPassword.trim() &&
      confirmPassword.trim() &&
      validatePassword(newPassword) &&
      newPassword === confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched to show validation errors
    setTouchedFields({
      newPassword: true,
      confirmPassword: true,
    });

    if (validateForm()) {
      try {
        // Call reset password API
        const response = await api.post("api/auth/reset-password", null, {
          params: {
            username: phoneNumber,
            newPassword: newPassword,
          },
        });

        setIsSubmitting(false);

        // Show success alert
        Swal.fire({
          title: t("passwordResetSuccessTitle"),
          text: t("passwordResetSuccessText"),
          icon: "success",
          confirmButtonText: t("ok"),
          confirmButtonColor: "#835f40",
          allowOutsideClick: false,
          allowEscapeKey: false,
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
        }).then((result) => {
          if (result.isConfirmed) {
            // Navigate to sign in page
            window.location.href = "/";
          }
        });
      } catch (error) {
        setIsSubmitting(false);
        console.error("Password reset error:", error);

        // Show error alert
        Swal.fire({
          title: t("error"),
          text: error.response?.data?.message || t("passwordResetError"),
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
      }
    } else {
      setIsSubmitting(false);
      console.log("Validation errors:", errors);
    }
  };

  const navigateToSignIn = () => {
    window.location.href = "/";
  };

  return (
    <div className="bg-[#fefefe] w-full min-h-screen relative overflow-hidden">
      <LanguageToggle />

      <div
        className={`flex flex-col lg:flex-row w-full max-w-[1360px] mx-auto items-center justify-between gap-8 p-4 lg:p-10 min-h-screen ${
          isRTL ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* Image Section */}
        <div
          className={`w-full lg:w-[668px] flex justify-center ${
            isRTL
              ? "lg:justify-end order-1 lg:order-2"
              : "lg:justify-start order-1 lg:order-2"
          }`}
        >
          <div className="relative w-full max-w-[500px] lg:max-w-[668px]">
            <img
              className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] rounded-[30px] lg:rounded-[50px] object-cover"
              alt="Interior design"
              src="/rectangle-1.png"
            />

            {/* Testimonial Card - Positioned relative to image */}
            <Card className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 border-0">
              <CardContent className="flex flex-col items-center justify-center gap-4 lg:gap-6 p-8 lg:p-10 bg-white/75 backdrop-blur-sm rounded-[15px] lg:rounded-[20px] shadow-sm border-0 h-[145px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px]">
                <div
                  className={`flex flex-col w-full items-center justify-center gap-3 lg:gap-4 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <p
                    className={`text-[#1a1713] text-sm sm:text-base md:text-lg lg:text-[21px] font-normal leading-relaxed font-['Cairo',Helvetica] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {t("testimonial")}
                  </p>

                  <div className="flex flex-row-reverse w-full items-center justify-between">
                    {/* Navigation Buttons */}
                    <div
                      className={`flex items-center gap-2.5 md:gap-4 lg:gap-6 ${
                        isRTL ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <div className="p-[1px] rounded-full bg-gradient-to-l from-[#805b3c] to-[#d3baa4]">
                        <Button
                          variant="outline"
                          size="icon"
                          className="flex w-8 h-8 lg:w-12 lg:h-12 items-center justify-center rounded-full bg-white/75 hover:bg-white/90 transition"
                        >
                          <HiOutlineArrowRight className="w-6 h-6 lg:w-6 lg:h-6 text-[#904803]" />
                        </Button>
                      </div>

                      <div className="p-[1px] rounded-full bg-gradient-to-r from-[#805b3c] to-[#d3baa4]">
                        <Button
                          variant="outline"
                          size="icon"
                          className="flex w-8 h-8 lg:w-12 lg:h-12 items-center justify-center rounded-full bg-white/75 hover:bg-white/90 transition"
                        >
                          <HiOutlineArrowLeft className="w-6 h-6 lg:w-6 lg:h-6 text-[#904803]" />
                        </Button>
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="inline-flex flex-row-reverse items-center gap-2">
                      <div
                        className={`flex flex-col gap-1 ${
                          isRTL ? "items-start" : "items-start"
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

                      <Avatar className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8">
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

        {/* Form Section */}
        <div
          className={`flex flex-col w-full lg:w-[668px] items-center gap-8 lg:gap-20 ${
            isRTL ? "order-1 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          <div className="flex flex-col w-full max-w-[503px] items-center gap-4 lg:gap-6">
            <h1
              className={`text-2xl sm:text-3xl lg:text-[32px] font-semibold text-[#835f40] text-center leading-tight font-['Cairo',Helvetica]`}
            >
              {t("resetPasswordTitle")}
            </h1>

            <p
              className={`text-base sm:text-lg lg:text-[14px] font-normal text-[#666] text-center leading-relaxed font-['Cairo',Helvetica] max-w-md`}
            >
              {t("resetPasswordDescription")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-6 w-full max-w-[503px]"
          >
            <div className="flex flex-col items-start gap-6 w-full">
              {/* New Password Field */}
              <div
                className={`flex flex-col gap-3 w-full ${
                  isRTL ? "items-end" : "items-start"
                }`}
              >
                <Label
                  className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                    isRTL ? "text-right w-full" : "text-left w-full"
                  }`}
                >
                  {t("newPassword")}
                </Label>

                <div
                  className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid ${
                    errors.newPassword && touchedFields.newPassword
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "flex-row" : "flex-row-reverse"}`}
                >
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder={t("newPasswordPlaceholder")}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={() => handleFieldBlur("newPassword")}
                    className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {showNewPassword ? (
                      <EyeOffIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                    ) : (
                      <EyeIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                    )}
                  </button>
                </div>
                {errors.newPassword && touchedFields.newPassword && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div
                className={`flex flex-col gap-3 w-full ${
                  isRTL ? "items-end" : "items-start"
                }`}
              >
                <Label
                  className={`font-medium text-[#1a1713] text-lg lg:text-[20px] font-['Cairo',Helvetica] ${
                    isRTL ? "text-right w-full" : "text-left w-full"
                  }`}
                >
                  {t("confirmPassword")}
                </Label>

                <div
                  className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid ${
                    errors.confirmPassword && touchedFields.confirmPassword
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "flex-row" : "flex-row-reverse"}`}
                >
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("confirmPasswordPlaceholder")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => handleFieldBlur("confirmPassword")}
                    className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                    ) : (
                      <EyeIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && touchedFields.confirmPassword && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`w-full h-12 lg:h-14 text-white font-bold text-lg font-['Cairo',Helvetica] rounded-[10px] transition-all duration-200 border-0 ${
                  !isFormValid() || isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[linear-gradient(270deg,rgba(128,91,60,1)_0%,rgba(211,186,164,1)_100%)] hover:bg-[linear-gradient(270deg,rgba(128,91,60,0.9)_0%,rgba(211,186,164,0.9)_100%)]"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t("savePasswordButton")}...</span>
                  </div>
                ) : (
                  t("savePasswordButton")
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

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
