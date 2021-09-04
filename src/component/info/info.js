import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ClientApplicationComponent from "../clientApplicationComponent";
import { withRouter } from "react-router-dom";
import { LANDING_PAGE } from "../../routes";
import { Image } from "react-bootstrap";

class Info extends ClientApplicationComponent {
  render() {
    if (!this.routerParams) {
      setTimeout(() => {
        this.goTo(LANDING_PAGE);
      }, 1000);
    } else {
      const { baseUrl, description, imageUrl } = this.routerParams;
      return (
        <View style={{ flexDirection: "column" }}>
          <Image src={baseUrl + imageUrl} style={{ width: "100%" }} />
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            style={{ paddingTop: 10 }}
          />
        </View>
      );
    }
  }
}

export default withRouter(Info);
