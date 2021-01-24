import React, { useState } from "react";
import { GITHUB_CONTENT_URL } from "online-shopping-cargo-parent/dist/service";
import AddressGenerator from "../addressGenerator/addressGenerator";
import BackgroundCard from "../common/backgroundCard";
import SuceedIcon from "../common/suceedIcon";
import ApplicationSmsAuth from "../common/applicationSmsAuth";

export default function Tutorial(props) {
  const { userToken } = props;
  return (
    <div>
      <LoginSection userToken={userToken} />
      <GenerateAddressSection />
      <AddAddressToEcommerce />
      <MessageNotificationSection />
    </div>
  );
}

function AddAddressToEcommerce() {
  return (
    <TutorialCard header="第三步: 添加地址到淘寶">
      <TutorialImage src="/assert/add_address_1.png" />
      <TutorialImage src="/assert/add_address_2.png" />
    </TutorialCard>
  );
}

function GenerateAddressSection() {
  return (
    <TutorialCard header="第二步: 生成收貨地址">
      <AddressGenerator />
    </TutorialCard>
  );
}

function LoginSection({ userToken }) {
  const [loggedIn, setLoggedIn] = useState(userToken);
  let Content;
  if (loggedIn) {
    Content = <SuceedLoggedIn />;
  } else {
    Content = (
      <ApplicationSmsAuth
        onSuceed={() => {
          setLoggedIn(true);
        }}
      />
    );
  }
  return <TutorialCard header="第一步: 登入">{Content}</TutorialCard>;
}

function SuceedLoggedIn() {
  return <SuceedIcon>登入成功</SuceedIcon>;
}

function MessageNotificationSection() {
  return (
    <TutorialCard header="第四步: 短信通知提取包裹">
      <TutorialImage src="/assert/message_notification_1.png" />
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
