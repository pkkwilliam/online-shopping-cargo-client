import React from "react";

export default function TextButton(props) {
  return (
    <p
      onClick={props.onClick}
      style={{ color: "#007bff", margin: 0, fontSize: 12, ...props.style }}
    >
      {props.children}
    </p>
  );
}
