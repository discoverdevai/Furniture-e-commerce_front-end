import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
} from "lucide-react";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalValue } from "../../Store/Store";
import { useNavigate } from "react-router-dom";

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
import { VerificationModal } from "../../components/VerificationModal";
import api from "../../Api/Axios";
import Swal from "sweetalert2";
import { Select } from "@heroui/react";

export const SignIn = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const isRTL = i18n.language === "ar";

  // Re-validate when language changes to update error messages
  React.useEffect(() => {
    if (Object.keys(touchedFields).length > 0) {
      validateForm();
    }
  }, [i18n.language]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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

    /*  if (!phoneNumber.trim()) {
      newErrors.phoneNumber = t("phoneRequired");
    } else if (phoneNumber.length !== 10) {
      newErrors.phoneNumber = t("phoneInvalid");
    } */

    if (!password.trim()) {
      newErrors.password = t("passwordRequired");
    } else if (!validatePassword(password)) {
      newErrors.password = t("passwordInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      phoneNumber.trim() &&
      phoneNumber.length === 10 &&
      password.trim() &&
      validatePassword(password)
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    setTouchedFields({
      phoneNumber: true,
      password: true,
    });

    if (validateForm()) {
      try {
        const response = await api.post("api/auth/login-buyer", {
          username: phoneNumber,
          password: password,
        });

        const { email } = response.data;
        setUserEmail(email);
        setShowVerificationModal(true);

        localStorage.removeItem("signIn_phoneNumber");
      } catch (error) {
        console.error(
          "❌ Login failed:",
          error.response?.data || error.message
        );

        Swal.fire({
          title: t("errorTitle") || "Login Failed",
          text:
            error.response?.data?.message ||
            t("invalidCredentials") ||
            "Wrong credentials. Please try again.",
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
        setIsSubmitting(false);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      console.log("Validation errors:", errors);
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };
  const navigateToForgotPassword = () => {
    dispatch(
      setGlobalValue({ key: "usernamefromphonenumber", value: phoneNumber })
    );
    
    // Save phone number for forgot password page
/*     localStorage.setItem("forgotPassword_phoneNumber", phoneNumber);
 */    navigate("/forgot-password");
  };

  return (
    <div className="bg-[#fefefe] w-full min-h-screen relative overflow-hidden">
      <LanguageToggle />

      <div
        className={`flex flex-col lg:flex-row w-full max-w-[1360px] mx-auto items-center justify-between gap-4 p-4 lg:p-10 min-h-screen ${
          isRTL ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* Image Section */}
        <div
          className={`w-full sm:w-full md:w-full lg:w-[668px] flex justify-center ${
            isRTL
              ? "lg:justify-end order-1 lg:order-2"
              : "lg:justify-start order-1 lg:order-2"
          }`}
        >
          <div className="relative w-full max-w-[500px] lg:max-w-[668px]">
            <img
              className="w-full h-[400px] sm:h-[500px] sm:w-full md:h-[600px] md:w-full lg:h-[750px]  rounded-[30px] lg:rounded-[50px] object-cover"
              alt="Interior design"
              src="/rectangle-1.png"
            />

            {/* Testimonial Card - Positioned relative to image */}

            <Card className="absolute  bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 border-0 ">
              <CardContent className="flex flex-col items-center justify-center gap-4 lg:gap-6 p-8 lg:p-10 bg-white/75 backdrop-blur-sm rounded-[15px] lg:rounded-[20px] shadow-sm border-0 h-[145px] sm:min-h-[160px]  md:min-h-[180px] lg:min-h-[200px] ">
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

                  <div
                    className={`flex flex-row-reverse w-full items-center justify-between `}
                  >
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
                          className="flex w-8 h-8 lg:w-12 lg:h-12 items-center justify-center 
               rounded-full bg-white/75 hover:bg-white/90 transition"
                        >
                          <HiOutlineArrowRight className="w-6 h-6 lg:w-6 lg:h-6 text-[#904803]" />
                        </Button>
                      </div>

                      <div className="p-[1px] rounded-full bg-gradient-to-r from-[#805b3c] to-[#d3baa4]">
                        <Button
                          variant="outline"
                          size="icon"
                          className="flex w-8 h-8 lg:w-12 lg:h-12 items-center justify-center 
               rounded-full bg-white/75 hover:bg-white/90 transition"
                        >
                          <HiOutlineArrowLeft className="w-6 h-6 lg:w-6 lg:h-6 text-[#904803]" />
                        </Button>
                      </div>
                    </div>

                    {/* User Info */}

                    <div
                      className={`inline-flex flex-row-reverse items-center gap-2`}
                    >
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
              className={`text-2xl sm:text-3xl  lg:text-[40px] font-semibold text-[#1a1713] text-center leading-tight font-['Cairo',Helvetica]`}
            >
              {t("welcome")}
            </h1>

            <h2
              className={`text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#835f40] text-center leading-tight font-['Cairo',Helvetica]`}
            >
              {t("signIn")}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-6 w-full max-w-[503px]"
          >
            <div className="flex flex-col items-start gap-6 w-full">
              {/* Phone Number Field */}
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
                  {t("phoneNumber")}
                </Label>

                <div
                  className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] ${
                    errors.phoneNumber && touchedFields.phoneNumber
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isRTL ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div className="w-px h-8 bg-[#c3c3c3]"></div>
                    <span className="text-[#292929] text-sm font-['Cairo',Helvetica]">
                      +966
                    </span>
                  </div>
                  <Input
                    type="text"
                    value={phoneNumber}
                    /* inputMode="numeric"
                    pattern="[0-9]*" */
                    onChange={(e) => {
                      const onlyDigits = e.target.value;
                      /* .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                      setPhoneNumber(onlyDigits); */
                      setPhoneNumber(e.target.value);
                    }}
                    onBlur={() => {
                      handleFieldBlur("phoneNumber");
                      // ✅ Save to Redux only when user finishes typing
                      dispatch(
                        setGlobalValue({
                          key: "usernamefromphonenumber",
                          value: phoneNumber,
                        })
                      );
                    }}
                    className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
                {errors.phoneNumber && touchedFields.phoneNumber && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Password Field */}
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
                  {t("password")}
                </Label>

                <div
                  className={`flex h-12 lg:h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-solid border-[#c3c3c3] ${
                    errors.password && touchedFields.password
                      ? "border-red-500"
                      : "border-[#c3c3c3]"
                  } ${isRTL ? "flex-row" : "flex-row-reverse"}`}
                >
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => handleFieldBlur("password")}
                    className={`flex-1 border-0 bg-transparent p-0 focus-visible:ring-0 text-[#292929] font-['Cairo',Helvetica] placeholder:text-[#999] ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                    ) : (
                      <EyeIcon className="w-5 h-5 lg:w-6 lg:h-6 text-[#666]" />
                    )}
                  </button>
                </div>
                {errors.password && touchedFields.password && (
                  <p
                    className={`text-red-500 text-sm mt-1 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {errors.password}
                  </p>
                )}

                {phoneNumber.trim() ? (
                  <button
                    type="button"
                    onClick={navigateToForgotPassword}
                    className={`text-sm text-[#835f40] hover:text-[#6b4a32] underline transition-colors font-['Cairo',Helvetica] ${
                      isRTL
                        ? "self-end w-full text-right"
                        : "self-start w-full text-left"
                    }`}
                  >
                    {t("forgotPassword")}
                  </button>
                ) : (
                  <span
                    className={`text-sm text-gray-400 cursor-not-allowed font-['Cairo',Helvetica] ${
                      isRTL
                        ? "self-end w-full text-right"
                        : "self-start w-full text-left"
                    }`}
                  >
                    {t("forgotPassword")}
                  </span>
                )}
              </div>

              {/* Submit Button */}
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
                    <span>{t("signInButton")}...</span>
                  </div>
                ) : (
                  t("signInButton")
                )}
              </Button>

              {/* Sign Up Link */}
              <div
                className={`flex items-center gap-2 w-full justify-center text-sm font-['Cairo',Helvetica] `}
              >
                <span className="text-[#666]">{t("noAccount")}</span>
                <button
                  type="button"
                  onClick={navigateToRegister}
                  className="text-[#835f40] hover:text-[#6b4a32] underline font-medium transition-colors"
                >
                  {t("createAccount")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <VerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={userEmail}
        verificationType="login"
      />
    </div>
  );
};
