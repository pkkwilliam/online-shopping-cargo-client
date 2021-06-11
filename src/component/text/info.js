import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

export default function Info({ children, style }) {
  return (
    <P
      style={{ fontSize: 12, color: styleSchema.color.secondaryDark, ...style }}
    >
      {children}
    </P>
  );
}
