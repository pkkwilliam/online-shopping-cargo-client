import React from "react";

import ClientApplicationComponent from "../clientApplicationComponent";
import Login from "../login/login";
export default class ApplicationSmsAuth extends ClientApplicationComponent {
  render() {
    return <Login />;
  }
}
