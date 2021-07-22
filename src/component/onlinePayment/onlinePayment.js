import React from "react";
import { withRouter } from "react-router-dom";
import UserProfileComponent from "../common/userProfileComponent";

class OnlinePayment extends UserProfileComponent {
  render() {
    return <p>this is online payment</p>;
  }
}

export default withRouter(OnlinePayment);
