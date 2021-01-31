import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

export default function ShadowCard(props) {
  const { children, style } = props;
  return (
    <View
      style={{
        borderRadius: 15,
        boxShadow: styleSchema.shadow,
        justifyContent: "space-evenly",
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        width: "100%",
        ...style,
      }}
    >
      {children}
    </View>
  );
}
