import React from "react";
import FormControl from "react-bootstrap/esm/FormControl";

export default function ApplicationTextField(props) {
  const { placeholder, onChange, style } = props;
  return (
    <FormControl
      placeholder={placeholder}
      onChange={onChange}
      style={{ border: 0, boxShadow: "none", ...style }}
      {...props}
    />
  );
}
