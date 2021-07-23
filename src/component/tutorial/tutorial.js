import React from "react";
import { GITHUB_CONTENT_URL } from "online-shopping-cargo-parent/dist/service";
import AddressGenerator from "../addressGenerator/addressGenerator";
import BackgroundCard from "../common/backgroundCard";
import ApplicationSmsAuth from "../common/applicationSmsAuth";
import SegmentTab from "../segmentTab";
import ShipToHomeTutorial from "./shipToHomeTutorial";
import StorePickupTutorial from "./storePickupTutorial";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";

export const SHIP_TO_HOME_TAB = "SHIP_TO_HOME_TAB";
export const STORE_PICKUP_TAB = "STORE_PICKUP_TAB";

class Tutorial extends UserProfileComponent {
  render() {
    const displayTab =
      this.routerParams && this.routerParams.displayTab
        ? this.routerParams.displayTab
        : STORE_PICKUP_TAB;
    return (
      <SegmentTab
        displayTab={displayTab}
        shipToHomeComponent={<ShipToHomeTutorial />}
        storePickupComponent={<StorePickupTutorial />}
      />
    );
  }
}

export function AddAddressToEcommerce() {
  return (
    <TutorialCard header="第三步: 添加地址到淘寶">
      <TutorialImage src="/assert/add_address_sw_1.png" />
    </TutorialCard>
  );
}

export function GenerateAddressSection({ shopSelected = undefined }) {
  return (
    <TutorialCard header="第二步: 收貨地址">
      <AddressGenerator shopSelected={shopSelected} />
    </TutorialCard>
  );
}

export function LoginSection() {
  return (
    <TutorialCard header="第一步: 登入">
      <ApplicationSmsAuth onSuceed={() => {}} />
    </TutorialCard>
  );
}

export function MessageNotificationSection() {
  return (
    <TutorialCard header="第四步: App推送通知提取包裹">
      <TutorialImage src="/assert/push_notification_1.png" />
    </TutorialCard>
  );
}

export function TutorialCard({ children, header }) {
  return (
    <BackgroundCard style={{ marginTop: 20 }}>
      <h5>{header}</h5>
      {children}
    </BackgroundCard>
  );
}

export function TutorialImage({ src, style }) {
  return (
    <img
      alt="tutorial_image"
      src={GITHUB_CONTENT_URL + src}
      style={{ width: "100%", ...style }}
    />
  );
}

export default withRouter(Tutorial);
