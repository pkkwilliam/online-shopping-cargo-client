import React from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

export default function FooterView(props) {
  return (
    <div style={styles.rootContainer}>
      <P style={{ fontSize: 11 }}>微信: PICKTB 電話: 28719871 Fax: 28719872</P>
    </div>
  );
}

const styles = {
  rootContainer: {
    alignItems: "center",
    background: styleSchema.color.background,
    bottom: 0,
    boxShadow: styleSchema.shadow,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 5,
    paddingTop: 5,
    position: "fixed",
    width: "100%",
  },
};
