import React from "react";
import Input  from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

import "./input.css"

const CustomInput = withStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      padding: "10px 14px",
      fontSize: "14px",
      backgroundColor: "white"
    }
  }
})(Input );

export default function MaterialInput({
  onChange,
  name,
  value,
  label,
  placeholder,
  required
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <CustomInput
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        variant="outlined"
        style={{
          backgroundColor: "eee",
          width: "auto"
        }}
      />
    </div>
  );
}
