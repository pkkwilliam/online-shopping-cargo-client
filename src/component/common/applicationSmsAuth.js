import React from "react";
import SmsAuth from "online-shopping-cargo-parent/dist/smsAuth/smsAuth";
import ClientApplicationComponent from "../clientApplicationComponent";

export default class ApplicationSmsAuth extends ClientApplicationComponent {
  render() {
    const { onSuceed } = this.props;
    return (
      <SmsAuth
        onSuceed={onSuceed ? onSuceed : () => window.location.reload()}
        serviceExecutor={this.serviceExecutor}
      />
    );
  }
}
