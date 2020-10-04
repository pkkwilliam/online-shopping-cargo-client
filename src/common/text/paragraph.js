import React from "react";

export default function P(props) {
  return (
    <p
      style={{
        fontSize: 14,
        margin: 0,
      }}
    >
      {props.children}
    </p>
  );
}
