import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

export default function Clickable(props) {
  const { children, style } = props;
  return (
    <View
      {...props}
      style={{ borderRadius: 8, boxShadow: styleSchema.shadow, ...style }}
    >
      {children}
    </View>
  );
}
