import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Trash2 } from "lucide-react";
import { ProfileSideBar } from "../../../../components/ProfileSideBar";
import { AppNavbar } from "../../../../components/Layout/Navbar";
import { ProfileBreadcrumb } from "../../../../components/ProfileBreadcrumb";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EditAddressModal } from "../../../../components/EditAddressModal";
import { AddAddressModal } from "../../../../components/AddAddressModal";
import api from "../../../../Api/Axios";
import { IconButton } from "@mui/material";

import Swal from "sweetalert2";

export const BuyerAddressMainSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/user/addresses`);
      setAddresses(response.data.data); // assuming response.data is an array of addresses
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleEditClick = (address) => {
    console.log(address);
    setEditingAddress(address);
    setIsEditModalOpen(true);
    console.log(editingAddress);
  };

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveAddress = async (updatedData) => {
    if (editingAddress) {
      try {
        const payload = {
          street: updatedData.street, // building field maps to street in backend
          city: updatedData.building,
          state: " any thing",
          zipCode: "00000",
          country: updatedData.region,
          landmark: "بجانب المترو",
          type: "HOME",
          isDefault: false,
        };

        await api.put(`/api/user/addresses/${editingAddress.id}`, payload);

        // Update frontend state
        setAddresses((prev) =>
          prev.map((addr) =>
            addr.id === editingAddress.id ? { ...addr, ...updatedData } : addr
          )
        );

        Swal.fire({
          icon: "success",
          title: "تم التعديل بنجاح",
          text: "Address updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error updating address:", error);
        Swal.fire({
          icon: "error",
          title: "خطأ",
          text: "Failed to update address",
        });
      } finally {
        setIsEditModalOpen(false);
        setEditingAddress(null);
      }
    }
  };

  const handleAddAddress = (newAddressFromAPI) => {
    setAddresses((prev) => [...prev, newAddressFromAPI]);
    fetchAddresses();
    setIsAddModalOpen(false);
  };

  const handleDeleteAddress = async (id) => {
    try {
      await api.delete(`/api/user/addresses/${id}`);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error.response?.data || error);
    }
  };
  const handleBackClick = () => {
    navigate(-1);
  };

  const formatAddress = (address) => {
    return `${address.city}  ${address.street}   ${address.country}`;
  };

  return (
    <section
      className="bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(/blogs-header-bg.png)` }}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="w-full pt-3">
        <div className="max-w-[1440px] mx-auto">
          <AppNavbar />
        </div>
      </div>
      <div className="flex flex-col w-full max-w-[1200px] mx-auto items-start gap-8 mt-4">
        {isMobile ? (
          <div
            className={`relative flex items-center justify-center w-full  ${
              isArabic ? "" : ""
            }`}
          >
            {/* Back Button */}
            <IconButton
              onClick={handleBackClick}
              edge="start"
              className={`!p-2 absolute ${isArabic ? "right-2" : "left-2"} `}
            >
              <img
                src="/breadcrumb-arrow.svg"
                alt="breadcrumb arrow"
                className={`w-6 h-6 ${isArabic ? "rotate-180" : ""}`}
                style={{ filter: "brightness(0) saturate(100%)" }}
              />
            </IconButton>

            {/* Title */}
            <h4 className="text-center text-xl font-medium text-[#1A1713] font-[cairo] mx-auto">
              {t("sidebar.savedAddresses")}
            </h4>
          </div>
        ) : (
          <ProfileBreadcrumb />
        )}

        <div
          className={`flex flex-row items-start justify-between gap-6 w-full`}
        >
          {!isMobile && <ProfileSideBar />}{" "}
          <main
            className={`flex flex-col w-full max-w-[894px] gap-10 items-start px-4 sm:px-6 md:px-8 lg:px-0 ${
              isMobile && "mt-4"
            }`}
          >
            {!isMobile && (
              <h2 className="font-[cairo] text-[32px] font-semibold text-[#1a1713]">
                {t("addresses.title")}
              </h2>
            )}

            <div className="flex flex-col items-start gap-6 w-full">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="flex flex-col items-end gap-3 w-full"
                >
                  <div className="relative w-full">
                    <Input
                      value={formatAddress(address)}
                      readOnly
                      className={`h-14 px-4 py-2  rounded-[10px] font-[cairo] text-[14px] bg-[#ffffff00] border-[1px] border-[#C4C4C4] text-${
                        isArabic ? "right" : "left"
                      } bg-white`}
                    />

                    <div
                      className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-2 ${
                        isArabic ? "left-4" : "right-4 "
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleEditClick(address)}
                        className="hover:text-[#835f40] transition-colors"
                      >
                        <img
                          src="/Edit-icon.svg"
                          alt="Edit"
                          className="w-6 h-6"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAddress(address.id)}
                        className="hover:text-[#e91e63] transition-colors"
                      >
                        <Trash2 className="w-6 h-6 text-[#4f4f4f]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-grow items-center justify-start gap-6 w-full">
              <Button
                type="button"
                variant="outline"
                onClick={handleAddClick}
                className="h-14 w-full md:w-3/5 lg:w-3/5 mx-auto  font-[cairo] rounded-[10px] border border-[#835f40] bg-transparent text-[#835f40] hover:bg-[#835f40] hover:text-white"
              >
                {t("addresses.addNew")}
              </Button>
            </div>
          </main>
        </div>
      </div>

      <EditAddressModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          fetchAddresses();
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
        initialData={
          editingAddress
            ? {
                region: editingAddress.country,
                street: editingAddress.street,
                building: editingAddress.city,
                id: editingAddress.id,
              }
            : undefined
        }
      />

      <AddAddressModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddAddress}
      />
    </section>
  );
};
