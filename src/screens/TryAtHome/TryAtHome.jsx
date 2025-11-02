import React from "react";
import { RatePopup } from "../../components/Common/Popups/RatePopup";
import { DeletePopup } from "../../components/Common/Popups/DeletePopup";
import { ReorderPopup } from "../../components/Common/Popups/ReorderPopup";
import { ConfirmRate } from "../../components/Common/Popups/ConfirmRate";
import { ConfirmationPopup } from "../../components/Common/Popups/ConfirmationPopup";
export const TryAtHome = () => {
  return (
    <>
      <RatePopup />
      <DeletePopup />
      <ReorderPopup />
      <ConfirmRate />
      <ConfirmationPopup />
    </>
  );
};
