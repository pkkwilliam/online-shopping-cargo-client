import H1 from "../../common/text/h1";
import React from "react";
import { styleSchema } from "../../common/styleSchema";
import headerLogo from "../../common/assert/header_icon.png";

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
    boxShadow: styleSchema.shadow,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    position: "fixed",
    width: "100%",
  },
};
