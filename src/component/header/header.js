import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import Button from "react-bootstrap/esm/Button";

const HEADER_URL =
  "https://raw.githubusercontent.com/pkkwilliam/github.io-contents/master/oscm/assert/logo.png";

export default function HeaderView(props) {
  return (
    <View style={styles.rootContainer}>
      <img alt={"header_icon"} src={HEADER_URL} style={{ height: 45 }} />
      <Button
        onClick={props.onClickSwitchLandingPage}
        size="sm"
        variant="outline"
        style={{ color: "white" }}
      >
        {props.switchLandingPageText}
      </Button>
    </View>
  );
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
    zIndex: 1,
  },
};
