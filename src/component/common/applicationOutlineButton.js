import React from "react";
import Button from "react-bootstrap/esm/Button";

export default function ApplicationOutlineButton(props) {
  const { children, size = "sm", style, variant = "primary" } = props;
  return (
    <Button
      size={size}
      {...props}
      style={{ borderRadius: 30, ...style }}
      variant={`outline-${variant}`}
    >
      {children}
    </Button>
  );
}
