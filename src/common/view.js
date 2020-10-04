import React from "react";

export default function View(props) {
  return (
    <div style={{ display: "flex", ...props.style }}>{props.children}</div>
  );
}
