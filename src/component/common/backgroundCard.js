import React from "react";

export default function BackgroundCard(props) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
      }}
    >
      {props.children}
    </div>
  );
}
