import React from "react";
import { Dialog, DialogContent } from "@mui/material";
import { SearchDropdown } from "../../screens/Search/Search";

export const SearchModal = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
             display: "flex",
    alignItems: "center",
    justifyContent: "center",
          borderRadius: "24px",
          backgroundColor: "#fefefe",
          overflow: "hidden",
          
          
        },
      }}
    >
      <DialogContent sx={{ p: 0,overflow: "hidden", // ✅ remove scrollbar in content
 }}>
        <SearchDropdown />
      </DialogContent>
    </Dialog>
  );
};
