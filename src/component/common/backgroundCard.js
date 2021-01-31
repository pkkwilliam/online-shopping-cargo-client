import React from "react";

export default function BackgroundCard(props) {
  const { children, style } = props;
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
