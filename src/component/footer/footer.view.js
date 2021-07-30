import React from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

export default function FooterView(props) {
  return (
    <div style={styles.rootContainer}>
      <P style={{ fontSize: 11 }}>
        平台技術由
        <a href="https://bitcode.mo">源代碼科技</a>
        提供
      </P>
      <P style={{ fontSize: 11 }}>微信客服: PickTB</P>
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
