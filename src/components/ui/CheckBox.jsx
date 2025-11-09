import React, { useState } from "react";

const CheckBox = ({ id, label, defaultChecked, onCheckedChange }) => {
  const [checked, setChecked] = useState(defaultChecked || false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onCheckedChange) onCheckedChange(newChecked); // ✅ notify parent
  };

  const checkboxStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "6px",
    border: "2px solid #ccc",
    cursor: "pointer",
    appearance: "none",
    outline: "none",
    transition: "all 0.3s ease",
    background: checked
      ? "linear-gradient(135deg, #805B3C, #D3BAA4)"
      : "white",
  };

  return (
    <label
      htmlFor={id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={checkboxStyle}
      />
      {label && <span>{label}</span>}
    </label>
  );
};

export default CheckBox;
