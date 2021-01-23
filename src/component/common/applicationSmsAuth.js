import React from "react";
import SmsAuth from "online-shopping-cargo-parent/dist/smsAuth/smsAuth";

export default function ApplicationSmsAuth(props) {
  const { onSuceed } = props;
  return (
    <SmsAuth onSuceed={onSuceed ? onSuceed : () => window.location.reload()} />
  );
}
