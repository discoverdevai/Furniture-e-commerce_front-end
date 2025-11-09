import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Separator } from "../../../../components/ui/separator";
import { ProfileSideBar } from "../../../../components/ProfileSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { AppNavbar } from "../../../../components/Layout/Navbar";
import { useMediaQuery } from "@mui/material";
import { ProfileBreadcrumb } from "../../../../components/ProfileBreadcrumb";
import api from "../../../../Api/Axios";
import Swal from "sweetalert2";

export const BuyerProfileMainSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");

  //Define state for user data
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/api/user/me");
        const data = response.data.data;
        setProfileData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only letters for first and last name (Arabic + English)
    if (name === "firstName" || name === "lastName") {
      const lettersOnly = value.replace(/[^A-Za-z\u0600-\u06FF\s]/g, "");
      setProfileData((prev) => ({
        ...prev,
        [name]: lettersOnly,
      }));
    }
    // Allow only digits and limit to 10 for phone
    else if (name === "phoneNumber") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setProfileData((prev) => ({
        ...prev,
        [name]: digitsOnly,
      }));
    }
    // Other fields (like email)
    else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!profileData.firstName.trim()) {
      newErrors.firstName = t("firstNameRequired");
    }

    if (!profileData.lastName.trim()) {
      newErrors.lastName = t("lastNameRequired");
    }

    if (!profileData.phoneNumber.trim()) {
      newErrors.phoneNumber = t("phoneRequired");
    } else if (profileData.phoneNumber.length !== 10) {
      newErrors.phoneNumber = t("phoneInvalid");
    }

    if (!profileData.email.trim()) {
      newErrors.email = t("emailRequired");
    } else if (!validateEmail(profileData.email)) {
      newErrors.email = t("emailInvalid");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [profileData, t]);

  const handleSave = async (e) => {
    e.preventDefault();
    setTouchedFields({
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
    });
    if (!validateForm()) return; // stop if invalid
    try {
      const response = await api.put("/api/user/me", profileData);
      Swal.fire({
        icon: "success",
        title: t("profile.updated"),
        text: t("profile.successMessage"),
        customClass: {
          title: "font-['Cairo',Helvetica] text-center",
          htmlContainer: "font-['Cairo',Helvetica] text-center",
          confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
        },
        timer: 2000,
        showConfirmButton: false,
      });
      console.log("Updated profile:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: t("profile.error"),
        text: t("profile.errorMessage"),
        customClass: {
          title: "font-['Cairo',Helvetica] text-center",
          htmlContainer: "font-['Cairo',Helvetica] text-center",
          confirmButton: "font-['Cairo',Helvetica] text-lg py-3 px-8",
        },
      });
    }
  };

  return (
    <section
      className="bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
    >
      <div className="w-full pt-3">
        <div className="max-w-[1440px] mx-auto ">
          <AppNavbar />
        </div>
      </div>
      <div
        className={`flex flex-col w-full  max-w-[1200px] gap-8 mx-auto items-start mt-4`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Breadcrumb */}
        {!isMobile && <ProfileBreadcrumb />}

        <div className={`flex items-start justify-between gap-6 w-full `}>
          {!isMobile && <ProfileSideBar />}
          <main className="flex flex-col w-full max-w-[894px] gap-10 px-4 sm:px-6 md:px-8 lg:px-0">
            {!isMobile && (
              <h2 className="font-[cairo] font-semibold text-[32px] text-[#1a1713]">
                {t("profile.title")}
              </h2>
            )}

            <form className="flex flex-col gap-6 w-full " onSubmit={handleSave}>
              <div className="flex flex-col gap-6 w-full">
                <div className="flex items-center justify-between gap-6 w-full">
                  <div className="flex flex-col gap-3 flex-1">
                    <Label className="text-[16px] md:text-[18px] lg:text-[20px] font-[cairo] font-medium">
                      {t("profile.firstName")}
                    </Label>
                    <Input
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("firstName")}
                      placeholder={t("firstNamePlaceholder")}
                      className={`h-14 font-[cairo] bg-transparent border-[1px] rounded-lg ${
                        errors.firstName && touchedFields.firstName
                          ? "border-red-500"
                          : "border-[#C4C4C4]"
                      } ${isArabic ? "text-right" : "text-left"}`}
                    />
                    {errors.firstName && touchedFields.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <Label className="text-[16px] md:text-[18px] lg:text-[20px] font-[cairo] font-medium">
                      {t("profile.lastName")}
                    </Label>
                    <Input
                      name="lastName"
                      inputMode="text"
                      value={profileData.lastName}
                      onChange={handleChange}
                      onBlur={() => handleBlur("lastName")}
                      placeholder={t("lastNamePlaceholder")}
                      className={`h-14 font-[cairo] bg-transparent border-[1px] rounded-lg ${
                        errors.lastName && touchedFields.lastName
                          ? "border-red-500"
                          : "border-[#C4C4C4]"
                      } ${isArabic ? "text-right" : "text-left"}`}
                    />
                    {errors.lastName && touchedFields.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <Label className="text-[16px] md:text-[18px] lg:text-[20px] font-[cairo] font-medium">
                    {t("profile.email")}
                  </Label>
                  <Input
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder={t("emailPlaceholder")}
                    className={`h-14 font-[cairo] bg-transparent border-[1px] rounded-lg ${
                      errors.email && touchedFields.email
                        ? "border-red-500"
                        : "border-[#C4C4C4]"
                    } ${isArabic ? "text-right" : "text-left"}`}
                  />
                  {errors.email && touchedFields.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <Label className="text-[16px] md:text-[18px] lg:text-[20px] font-[cairo] font-medium">
                    {t("profile.phone")}
                  </Label>

                  {/* wrapper */}
                  <div
                    className={`flex ${
                      isArabic ? "flex-row-reverse" : "flex-row"
                    } h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border  ${
                      errors.phoneNumber && touchedFields.phoneNumber
                        ? "border-red-500"
                        : "border-[#c3c3c3]"
                    }`}
                  >
                    {/* right fixed part (stays right always) */}
                    <div
                      className={`flex ${
                        isArabic ? "flex-row" : "flex-row-reverse"
                      }  w-14 items-center justify-between`}
                    >
                      <Separator
                        orientation="vertical"
                        className="h-10 w-px bg-[#c3c3c3]"
                      />
                      <div className="text-[#4f4f4f]">+966</div>
                    </div>

                    {/* input part */}
                    <Input
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleChange}
                      onBlur={() => handleBlur("phoneNumber")}
                      className="flex-1 text-[#1a1713] font-[cairo] text-left bg-[#ffffff00] border-[1px] border-[#C4C4C4]"
                      placeholder={t("phoneNumberPlaceholder")}
                      dir="ltr"
                      inputMode="numeric"
                    />
                  </div>
                  {errors.phoneNumber && touchedFields.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className={`h-14 w-full rounded-[10px] ${
                  isArabic
                    ? "bg-gradient-to-l from-[#805b3c] to-[#d3baa4]"
                    : "bg-gradient-to-r from-[#805b3c] to-[#d3baa4]"
                } text-white text-[16px] lg:text-[18px] font-bold font-[cairo] hover:opacity-90`}
              >
                {t("profile.save")}
              </Button>
            </form>
          </main>
        </div>
      </div>
    </section>
  );
};
