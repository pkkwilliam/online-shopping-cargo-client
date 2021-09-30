import React from "react";
import { withRouter } from "react-router-dom";
import ClientApplicationComponent from "../clientApplicationComponent";
import RedPocketView from "./redPocket.view";

class RedPocket extends ClientApplicationComponent {
  render() {
    return <RedPocketView onCloseModal={this.onCloseError} {...this.state} />;
  }
}

export default withRouter(RedPocket);
