import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import { ProfileSideBar } from "../../../components/ProfileSideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { AppNavbar } from "../../../components/Layout/Navbar";
import { FooterSection } from "../../../components/Layout/FooterSection";

export const BuyerProfile = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className={`flex flex-col w-full max-w-[1200px] gap-8 mx-auto ${
        isArabic ? "items-start" : "items-end"
      }`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <nav className="inline-flex items-center gap-2">
        <div className="font-h5-regular text-[#4f4f4f]">
          {t("profile.title")}
        </div>
      </nav>

      <div
        className={`flex items-start justify-between gap-6 w-full ${
          isArabic ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <ProfileSideBar />
        <main className="flex flex-col w-full max-w-[894px] gap-10">
          <h1 className="font-h2-semiboald text-[#1a1713]">
            {t("profile.title")}
          </h1>

          <form className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex items-center justify-between gap-6 w-full">
                <div className="flex flex-col gap-3 flex-1">
                  <Label>{t("profile.lastName")}</Label>
                  <Input defaultValue="خميس" className="text-right" />
                </div>

                <div className="flex flex-col gap-3 flex-1">
                  <Label>{t("profile.firstName")}</Label>
                  <Input defaultValue="آلاء" className="text-right" />
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <Label>{t("profile.email")}</Label>
                <Input
                  defaultValue="alaakhamis123@gmail.com"
                  className="text-right"
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <Label>{t("profile.phone")}</Label>
                <div className="flex h-14 items-center gap-2 px-4 py-2 w-full rounded-[10px] border border-[#c3c3c3]">
                  <div className="flex w-14 items-center justify-between">
                    <div className="text-[#4f4f4f]">+966</div>
                    <Separator
                      orientation="vertical"
                      className="h-10 w-px bg-[#c3c3c3]"
                    />
                  </div>
                  <div className="text-[#1a1713]">123 123 123 123</div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="h-14 w-full rounded-[10px] bg-gradient-to-l from-[#805b3c] to-[#d3baa4] text-white hover:opacity-90"
            >
              {t("profile.save")}
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
};
