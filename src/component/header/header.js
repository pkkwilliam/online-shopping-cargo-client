import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

export default function HeaderView(props) {
  return <View style={styles.rootContainer}>{props.children}</View>;
}

const styles = {
  rootContainer: {
    alignItems: "center",
    background: styleSchema.color.primaryLight,
    boxShadow: styleSchema.shadowLight,
    justifyContent: "space-between",
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    position: "fixed",
    width: "100%",
    zIndex: 16,
  },
};
