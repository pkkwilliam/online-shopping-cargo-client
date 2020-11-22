import React from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

export default function FooterView(props) {
  return (
    <div style={styles.rootContainer}>
      <P style={{ fontSize: 11 }}>擎思科技有限公司 X 龐志空運速遞有限公司</P>
      <P style={{ fontSize: 11 }}>歡迎合作 微信: PICKTB</P>
    </div>
  );
}

const styles = {
  rootContainer: {
    alignItems: "center",
    boxShadow: styleSchema.shadow,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 5,
    paddingTop: 5,
  },
};
