import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import api from "../Api/Axios";

export const VerificationModal = ({
  isOpen,
  onClose,
  email,
  verificationType = "registration",
  onSuccess,
}) => {
  const { t, i18n } = useTranslation();
  const username = useSelector((state) => state.global.username);
  const usernamefromphonenumber = useSelector(
    (state) => state.global.usernamefromphonenumber
  );
  const [phoneNumber, setPhoneNumber] = useState(() => {
    const savedPhone = localStorage.getItem("forgotPassword_phoneNumber");
    return savedPhone;
  });
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  const isRTL = i18n.language === "ar";

  const encryptEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (!domain) return email;

    const visiblePart = localPart.slice(0, 2);
    const maskedPart = "*".repeat(Math.max(0, localPart.length - 2));

    return `${visiblePart}${maskedPart}@${domain}`;
  };

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [isOpen, timeLeft]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(60);
      setCanResend(false);
      setVerificationCode(["", "", "", ""]);
      setIsVerifying(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 50);
    }
  }, [isOpen]);

  const handleInputChange = (index, value) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < verificationCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      setTimeout(() => {
        handleVerify(newCode.join(""));
      }, 500);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    setTimeLeft(60);
    setCanResend(false);
    setVerificationCode(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    let params = {
      username:
        verificationType === "registration"
          ? username
          : usernamefromphonenumber,
    };
    try {
      const response = await api.post("api/auth/send-otp", null, { params });

      Swal.fire({
        title: t("otpResentTitle") || "OTP Sent!",
        text:
          t("otpResentMessage") ||
          "A new verification code has been sent to your email.",
        icon: "success",
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
    } catch (error) {
      Swal.fire({
        title: t("errorTitle") || "Error",
        text:
          error.response?.data?.message ||
          t("otpResendError") ||
          "Failed to resend the OTP. Please try again later.",
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
  };

  const handleVerify = async (code) => {
    if (code.length !== 4 || isVerifying) return;

    setIsVerifying(true);

    try {
      let endpoint = "";
      let params = {};
      if (verificationType === "registration") {
        params = {
          username: username,
          otp: code,
        };
        endpoint = "api/auth/verify-buyer-registration";
      } else if (verificationType === "login") {
        params = {
          username: phoneNumber,
          otp: code,
        };
        endpoint = "api/auth/login-buyer-verify";
      } else if (verificationType === "forgot-password") {
        params = {
          username: phoneNumber,
          otp: code,
        };
        endpoint = "api/auth/verify-otp";
      }

      if (!endpoint) {
        console.log("Endpoint not configured yet for:", verificationType);
        setIsVerifying(false);
        return;
      }
      console.log("Verifying with params:", params);

      const response = await api.post(endpoint, null, { params });

      if (verificationType === "registration") {
        Swal.fire({
          title: t("accountCreatedTitle") || "Account Created!",
          text:
            t("accountCreatedText") ||
            "Your account has been successfully created.",
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
            onClose();
            window.location.href = "/";
          }
        });
      } else if (verificationType === "login") {
        const { token, username: user, email: userEmail, role } = response.data;

        localStorage.setItem("authToken", token);
        localStorage.setItem("username", user);
        localStorage.setItem("email", userEmail);
        localStorage.setItem("role", role);

        Swal.fire({
          title: t("loginSuccessTitle") || "Login Successful!",
          text:
            t("loginSuccessText") || "You have been successfully logged in.",
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
            onClose();
            window.location.href = "/home";
          }
        });
      } else if (verificationType === "forgot-password") {
        Swal.fire({
          title: t("verificationSuccessTitle") || "Verification Successful!",
          text: t("verificationSuccessText") || "OTP verified successfully.",
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
            onClose();
            window.location.href = "/reset-password";
          }
        });
      }

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error("Verification error:", error);

      Swal.fire({
        title: t("errorTitle") || "Error",
        text:
          error.response?.data?.message ||
          t("wrongOtpError") ||
          "Wrong OTP code. Please try again.",
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

      setVerificationCode(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <Dialog onClose={onClose}>
      <DialogContent
        className={`w-[707px] h-[526px] max-w-[90vw] max-h-[90vh] p-8 bg-white rounded-[20px] ${
          isRTL ? "text-right" : "text-left"
        }`}
        style={{ width: "min(707px, 90vw)", height: "min(526px, 90vh)" }}
        onClose={onClose}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <DialogHeader className="text-center">
            <DialogTitle
              className={`text-2xl lg:text-3xl font-semibold text-[#1a1713] font-['Cairo',Helvetica] ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("verificationCode")}
            </DialogTitle>
          </DialogHeader>

          <div className="text-center max-w-md">
            <p
              className={`text-base lg:text-lg text-[#666] font-['Cairo',Helvetica] leading-relaxed ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("verificationDescription")}
            </p>
            <p
              className={`text-base lg:text-lg text-[#1a1713] font-medium font-['Cairo',Helvetica] mt-2 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {encryptEmail(email)}
            </p>
          </div>

          <div
            className="flex gap-4 justify-center items-center"
            style={{ direction: "ltr" }}
          >
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleInputChange(
                    index,
                    e.target.value.replace(/[^0-9]/g, "")
                  )
                }
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isVerifying}
                className={`w-16 h-16 lg:w-20 lg:h-20 text-center text-2xl font-bold border-2 border-[#c3c3c3] rounded-[10px] focus:border-[#835f40] focus:outline-none transition-colors font-['Cairo',Helvetica] ${
                  isVerifying ? "opacity-50 cursor-not-allowed" : ""
                }`}
                dir="ltr"
              />
            ))}
          </div>

          <div className="text-center">
            <p
              className={`text-sm lg:text-base text-[#666] font-['Cairo',Helvetica] ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("resendTimer")} {formatTime(timeLeft)} {t("seconds")}
            </p>
          </div>

          <div className="text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                className={`text-[#835f40] hover:text-[#6b4a32] font-medium transition-colors font-['Cairo',Helvetica] ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("resendCode")}
              </button>
            ) : (
              <p
                className={`text-[#999] font-['Cairo',Helvetica] ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("didntReceiveCode")} {t("resendCode")}
              </p>
            )}
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
      </DialogContent>
    </Dialog>
  );
};
