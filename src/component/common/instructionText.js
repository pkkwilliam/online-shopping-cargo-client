import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

export default function InstructionText(props) {
  const { children, style } = props;
  return (
    <P
      style={{
        color: styleSchema.color.primaryDark,
        fontSize: 16,
        fontWeight: 300,
        ...style,
      }}
    >
      {children}
    </P>
  );
}
