import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import headerLogo from "online-shopping-cargo-parent/dist/assert/header_logo.svg";
import Button from "react-bootstrap/esm/Button";

export default function HeaderView(props) {
  return (
    <View style={styles.rootContainer}>
      <img alt={"header_icon"} src={headerLogo} style={{ height: 45 }} />
      <Button
        onClick={props.onClickSwitchLandingPage}
        size="sm"
        variant="outline-warning"
      >
        {props.switchLandingPageText}
      </Button>
    </View>
  );
}

const styles = {
  rootContainer: {
    alignItems: "center",
    backgroundColor: styleSchema.color.white,
    boxShadow: styleSchema.shadowLight,
    justifyContent: "space-between",
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    position: "fixed",
    width: "100%",
  },
};
