import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";
import { ProfileSideBar } from "../../../../components/ProfileSideBar";
import { AppNavbar } from "../../../../components/Layout/Navbar";
import { useMediaQuery } from "@mui/material";
import { ProfileBreadcrumb } from "../../../../components/ProfileBreadcrumb";
import api from "../../../../Api/Axios";
import Swal from "sweetalert2";

export const BuyerChangePasswordMainSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");
  // State for inputs
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Toggle visibility for each
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validation states
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const validatePassword = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const hasMinLength = password.length >= 12;
    return hasLowerCase && hasUpperCase && hasSymbols && hasMinLength;
  };
  const handleFieldBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  const validateForm = () => {
    const newErrors = {};

    if (!currentPassword.trim()) {
      newErrors.currentPassword = t("passwordRequired");
    } else if (!validatePassword(currentPassword)) {
      newErrors.currentPassword = t("passwordInvalid");
    }

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
      currentPassword.trim() &&
      newPassword.trim() &&
      confirmPassword.trim() &&
      validatePassword(currentPassword) &&
      validatePassword(newPassword) &&
      newPassword === confirmPassword
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouchedFields({
      currentPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await api.post("api/user/me/change-password", {
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      if (response.data.success) {
        // Success alert
        Swal.fire({
          icon: "success",
          title: t("changePassword.successTitle"),
          text: t("changePassword.successMessage"),
          confirmButtonText: t("ok"),
        });

        // Reset form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTouchedFields({});
      }
      // API returned a failure message
    } catch (error) {
      if (error.response && error.response.data) {
        const message = error.response.data.message;

        let alertMessage = message;
        if (message === "Current password is incorrect") {
          alertMessage = t("changePassword.incorrectCurrent");
        } else if (
          message === "New password must be different from current password"
        ) {
          alertMessage = t("changePassword.sameAsCurrent");
        }
        Swal.fire({
          icon: "error",
          title: t("changePassword.errorTitle"),
          text: alertMessage,
          confirmButtonText: t("ok"),
        });
      } else {
        // Fallback for network/server errors
        Swal.fire({
          icon: "error",
          title: t("changePassword.errorTitle"),
          text: t("changePassword.genericError"),
          confirmButtonText: t("ok"),
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (Object.keys(touchedFields).length > 0) validateForm();
  }, [i18n.language]);

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
      <div
        className={`flex flex-col w-full max-w-[1200px] mx-auto items-start gap-8 mt-4`}
      >
        {!isMobile && <ProfileBreadcrumb />}

        <div className={`flex items-start justify-start gap-6 w-full`}>
          {!isMobile && <ProfileSideBar />}{" "}
          <main
            className={`flex flex-col w-full max-w-[894px] items-start gap-10`}
          >
            <h2 className="text-[#1a1713] font-semibold font-[cairo] text-[32px]">
              {t("changePassword.title")}
            </h2>

            <form
              className="flex flex-col items-start gap-6 w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-start gap-6 w-full">
                {/* Current password */}
                <div className="flex flex-col items-end gap-3 w-full">
                  <Label className="self-stretch text-[20px] font-medium font-[cairo] text-[#1a1713]">
                    {t("changePassword.currentPassword")}
                  </Label>

                  <div className="relative w-full">
                    <Input
                      type={showCurrent ? "text" : "password"}
                      placeholder={t("changePassword.enterCurrent")}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      onBlur={() => handleFieldBlur("currentPassword")}
                      className={`h-14 px-4 py-2 rounded-[10px] font-[cairo] border ${
                        errors.currentPassword && touchedFields.currentPassword
                          ? "border-red-500"
                          : "border-[#C4C4C4]"
                      } ${isArabic ? "text-right" : "text-left"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className={`absolute ${
                        isArabic ? "left-4" : "right-4 "
                      } top-1/2 -translate-y-1/2`}
                    >
                      {showCurrent ? (
                        <EyeOffIcon className="w-6 h-6 text-[#4f4f4f]" />
                      ) : (
                        <EyeIcon className="w-6 h-6 text-[#4f4f4f]" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && touchedFields.currentPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New password */}
                <div className="flex flex-col items-end gap-3 w-full">
                  <Label className="self-stretch text-[20px] font-medium font-[cairo] text-[#1a1713]">
                    {t("changePassword.newPassword")}
                  </Label>

                  <div className="relative w-full">
                    <Input
                      type={showNew ? "text" : "password"}
                      placeholder={t("changePassword.enterNew")}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onBlur={() => handleFieldBlur("newPassword")}
                      className={`h-14 px-4 py-2 rounded-[10px] font-[cairo] border ${
                        errors.newPassword && touchedFields.newPassword
                          ? "border-red-500"
                          : "border-[#C4C4C4]"
                      } ${isArabic ? "text-right" : "text-left"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className={`absolute ${
                        isArabic ? "left-4" : "right-4 "
                      } top-1/2 -translate-y-1/2`}
                    >
                      {showNew ? (
                        <EyeOffIcon className="w-6 h-6 text-[#4f4f4f]" />
                      ) : (
                        <EyeIcon className="w-6 h-6 text-[#4f4f4f]" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && touchedFields.newPassword && (
                    <p className="text-red-500 text-sm">{errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm new password */}
                <div className="flex flex-col items-end gap-3 w-full">
                  <Label className="self-stretch text-[20px] font-medium font-[cairo] text-[#1a1713]">
                    {t("changePassword.confirmPassword")}
                  </Label>

                  <div className="relative w-full">
                    <Input
                      type={showConfirm ? "text" : "password"}
                      placeholder={t("changePassword.enterAgain")}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => handleFieldBlur("confirmPassword")}
                      className={`h-14 px-4 py-2 rounded-[10px] font-[cairo] border ${
                        errors.confirmPassword && touchedFields.confirmPassword
                          ? "border-red-500"
                          : "border-[#C4C4C4]"
                      } ${isArabic ? "text-right" : "text-left"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className={`absolute ${
                        isArabic ? "left-4" : "right-4 "
                      } top-1/2 -translate-y-1/2`}
                    >
                      {showConfirm ? (
                        <EyeOffIcon className="w-6 h-6 text-[#4f4f4f]" />
                      ) : (
                        <EyeIcon className="w-6 h-6 text-[#4f4f4f]" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && touchedFields.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className={`h-14 w-full rounded-[10px] transition-all duration-200 border-0 
                             ${
                               !isFormValid() || isSubmitting
                                 ? "bg-gray-400 cursor-not-allowed"
                                 : isArabic
                                 ? "bg-gradient-to-l from-[#805b3c] to-[#d3baa4]"
                                 : "bg-gradient-to-r from-[#805b3c] to-[#d3baa4]"
                             } 
                     text-white text-[18px] font-bold font-[cairo] hover:opacity-90`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t("changePassword.save")}...</span>
                  </div>
                ) : (
                  t("changePassword.save")
                )}
              </Button>
            </form>
          </main>
        </div>
      </div>
    </section>
  );
};
