import React from "react";
import { GITHUB_CONTENT_URL } from "online-shopping-cargo-parent/dist/service";
import AddressGenerator from "../addressGenerator/addressGenerator";
import BackgroundCard from "../common/backgroundCard";
import ApplicationSmsAuth from "../common/applicationSmsAuth";

export default function Tutorial(props) {
  return (
    <div>
      <LoginSection />
      <GenerateAddressSection />
      <AddAddressToEcommerce />
      <MessageNotificationSection />
    </div>
  );
}

function AddAddressToEcommerce() {
  return (
    <TutorialCard header="第三步: 添加地址到淘寶">
      <TutorialImage src="/assert/add_address_sw_1.png" />
    </TutorialCard>
  );
}

function GenerateAddressSection() {
  return (
    <TutorialCard header="第二步: 收貨地址">
      <AddressGenerator />
    </TutorialCard>
  );
}

function LoginSection() {
  return (
    <TutorialCard header="第一步: 登入">
      <ApplicationSmsAuth onSuceed={() => {}} />
    </TutorialCard>
  );
}

function MessageNotificationSection() {
  return (
    <TutorialCard header="第四步: App推送通知提取包裹">
      <TutorialImage src="/assert/push_notification_1.png" />
    </TutorialCard>
  );
}

function TutorialCard({ children, header }) {
  return (
    <BackgroundCard style={{ marginTop: 20 }}>
      <h5>{header}</h5>
      {children}
    </BackgroundCard>
  );
}

function TutorialImage({ src }) {
  return (
    <img
      alt="tutorial_image"
      src={GITHUB_CONTENT_URL + src}
      style={{ width: "100%" }}
    />
  );
}
