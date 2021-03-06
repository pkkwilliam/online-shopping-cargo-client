import React from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

export default function FooterView(props) {
  return (
    <div style={styles.rootContainer}>
      <P style={{ fontSize: 11 }}>
        微信: PICKTB 電話1: 63530392 電話2: 28719871 Fax: 28719872
      </P>
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
    paddingBottom: 10,
    paddingTop: 10,
    position: "fixed",
    width: "100%",
  },
};
