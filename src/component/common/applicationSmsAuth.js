import React from "react";
import SmsAuth from "online-shopping-cargo-parent/dist/smsAuth/smsAuth";
import ClientApplicationComponent from "../clientApplicationComponent";
import SuceedIcon from "../common/suceedIcon";
export default class ApplicationSmsAuth extends ClientApplicationComponent {
  render() {
    const { onSuceed } = this.props;
    return this.userToken ? (
      <SuceedLoggedInSection />
    ) : (
      <SmsAuthSection
        onSuceed={onSuceed}
        serviceExecutor={this.serviceExecutor}
      />
    );
  }
}

function SmsAuthSection({ onSuceed, serviceExecutor }) {
  return (
    <SmsAuth
      onSuceed={() => {
        if (onSuceed) {
          this.forceUpdate();
          onSuceed();
        } else {
          window.history.back();
        }
      }}
      serviceExecutor={serviceExecutor}
    />
  );
}

function SuceedLoggedInSection() {
  return <SuceedIcon>登入成功</SuceedIcon>;
}
