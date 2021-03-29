import React from "react";
import ApplicationComponent from "online-shopping-cargo-parent/dist/applicationComponent";
import RegisterView from "./register.view";

export default class Regsiter extends ApplicationComponent {
  render() {
    return <RegisterView onCloseModal={this.onCloseError} />;
  }
}
