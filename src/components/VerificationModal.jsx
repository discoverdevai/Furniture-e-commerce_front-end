import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

export const VerificationModal = ({ isOpen, onClose, email }) => {
  const { t, i18n } = useTranslation();
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  const isRTL = i18n.language === "ar";

  // Encrypt email function (simple masking for now)
  const encryptEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    if (!domain) return email;

    // Keep first 2 characters, mask the rest
    const visiblePart = localPart.slice(0, 2);
    const maskedPart = "*".repeat(Math.max(0, localPart.length - 2));

    return `${visiblePart}${maskedPart}@${domain}`;
  };

  // Timer effect
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

  // Reset timer when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(60);
      setCanResend(false);
      setVerificationCode(["", "", "", ""]);
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

    // If all 4 digits are filled -> call handleVerify automatically
    if (newCode.every((digit) => digit !== "")) {
      console.log("Code entered:", newCode.join(""));
      setTimeout(() => {
        handleVerify(newCode.join(""));
      }, 2000);
      console.log("handleVerify called");
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setVerificationCode(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    // TODO: Add API call to resend verification code
    console.log("Resending verification code to:", email);
  };

  const handleVerify = (number) => {
    console.log("handleVerify function triggered");
    const code = verificationCode.join("");
    console.log("Verifying code:", code.length);
    console.log(number);
    if (number.length === 4) {
      console.log("Code is 4 digits, proceeding with verification");
      // TODO: Replace with actual API call to verify code
      // For now, we'll simulate a successful verification
      console.log("Verifying code:", code, "for email:", email);

      // Show success alert
      Swal.fire({
        title: t("accountCreatedTitle"),
        text: t("accountCreatedText"),
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
          // Close the modal
          onClose();
          // Navigate to sign in page
          window.location.href = "/";
        }
      });
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
          {/* Title */}
          <DialogHeader className="text-center">
            <DialogTitle
              className={`text-2xl lg:text-3xl font-semibold text-[#1a1713] font-['Cairo',Helvetica] ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("verificationCode")}
            </DialogTitle>
          </DialogHeader>

          {/* Description */}
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

          {/* Verification Code Inputs */}
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
                className={`w-16 h-16 lg:w-20 lg:h-20 text-center text-2xl font-bold border-2 border-[#c3c3c3] rounded-[10px] focus:border-[#835f40] focus:outline-none transition-colors font-['Cairo',Helvetica]`}
                dir="ltr"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="text-center">
            <p
              className={`text-sm lg:text-base text-[#666] font-['Cairo',Helvetica] ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("resendTimer")} {formatTime(timeLeft)} {t("seconds")}
            </p>
          </div>

          {/* Resend Button */}
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
