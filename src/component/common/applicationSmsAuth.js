import React, { useState } from "react";
import SmsAuth from "online-shopping-cargo-parent/dist/smsAuth/smsAuth";
import ApplicationTextButton from "online-shopping-cargo-parent/dist/applicationTextButton";
import View from "online-shopping-cargo-parent/dist/view";
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
  const [passwordLogin, setPasswordLogin] = useState(false);
  return (
    <>
      <TogglePasswordLogin
        passwordLogin={passwordLogin}
        setPasswordLogin={setPasswordLogin}
      />
      <SmsAuth
        passwordLogin={passwordLogin}
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
    </>
  );
}

function TogglePasswordLogin({ passwordLogin, setPasswordLogin }) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: 5,
      }}
    >
      <ApplicationTextButton onClick={() => setPasswordLogin(true)}>
        密碼登錄
      </ApplicationTextButton>
      <ApplicationTextButton onClick={() => setPasswordLogin(false)}>
        手機驗證
      </ApplicationTextButton>
    </View>
  );
}

function SuceedLoggedInSection() {
  return <SuceedIcon>登入成功</SuceedIcon>;
}
