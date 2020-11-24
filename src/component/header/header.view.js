import React from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import headerLogo from "online-shopping-cargo-parent/dist/assert/header_logo.svg";

export default function HeaderView(props) {
  return (
    <div style={styles.rootContainer}>
      <img alt={"header_icon"} src={headerLogo} style={{ height: 45 }} />
    </div>
  );
}

const styles = {
  rootContainer: {
    backgroundColor: styleSchema.color.white,
    boxShadow: styleSchema.shadowLight,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    position: "fixed",
    width: "100%",
  },
};
