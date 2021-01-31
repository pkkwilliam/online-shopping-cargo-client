import React from "react";
import CheckCircleFill from "react-bootstrap-icons/dist/icons/check-circle-fill";
import View from "online-shopping-cargo-parent/dist/view";

export default function SuceedIcon(props) {
  const { children, style } = props;
  return (
    <View style={{ alignItems: "center", flexDirection: "column", ...style }}>
      <CheckCircleFill style={{ color: "#2db85c", fontSize: 38 }} />
      <h6 style={{ marginTop: 10 }}>{children}</h6>
    </View>
  );
}
