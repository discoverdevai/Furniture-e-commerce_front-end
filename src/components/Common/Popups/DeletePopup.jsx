import React from "react";
import { RatePopupButton } from "../../ui/RatePopupButton";
import { Dialog, DialogContent } from "@mui/material";
import api from "../../../Api/Axios";
import Swal from "sweetalert2";

export const DeletePopup = ({ open, onClose, orderNumber }) => {
  const handleCancelOrder = async () => {
    try {
      const response = await api.put(`/api/buyer/orders/cancel/${orderNumber}`, {
        reason: "Ordered by mistake",
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "تم الإلغاء",
          text: "تم إلغاء الطلب بنجاح",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "فشل الإلغاء",
          text: response.data.message,
        });
      }
      onClose(); // close dialog
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: error.response.data.message||"تعذر إلغاء الطلب، حاول مرة أخرى",
      });
      console.error("Cancel order error:", error.response.data.message);
    }
  };

  const handleClick = async () => {
    await handleCancelOrder();
    onClose()
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent className="flex flex-col items-center gap-6 py-6 px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 w-full">
          <img
            className="w-[250px] h-[250px] sm:w-[359px] sm:h-[350px] object-contain"
            alt="Delete"
            src="/delete-popup-icon.png"
          />
          <h3 className="text-[#1a1713] text-center text-lg sm:text-xl font-semibold px-2">
            هل انت متأكد من الغاء طلبك؟
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row justify-between w-full gap-4 mt-4">
          <RatePopupButton
            variant="outline"
            className="flex-1 h-14 items-center justify-center gap-2 p-2 rounded-[10px] border border-solid border-[#c3c3c3] bg-transparent hover:bg-transparent"
            onClick={onClose}
          >
            رجوع
          </RatePopupButton>

          <RatePopupButton
            variant="destructive"
            className="flex-1 h-14 items-center justify-center gap-2 p-2 bg-[#b90000] rounded-[10px] hover:bg-[#b90000]/90"
            onClick={handleClick}
          >
            إلغاء
          </RatePopupButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
