import React from "react";

export default function BackgroundCard(props) {
  const { children, onClick, style } = props;
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
