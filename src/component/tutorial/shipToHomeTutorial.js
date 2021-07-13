import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import {
  GenerateAddressSection,
  LoginSection,
  TutorialCard,
  TutorialImage,
} from "./tutorial";

export default class ShipToHomeTutorial extends UserProfileComponent {
  render() {
    const shipToHomeShop = getShopByShopNumber(this.appState.shop.shops, 1000);
    return (
      <>
        <LoginSection />
        <GenerateAddressSection shopSelected={shipToHomeShop} />
        <AddAddressToEcommerce />
        <MessageNotificationSection />
      </>
    );
  }
}

export function AddAddressToEcommerce() {
  return (
    <TutorialCard header="第三步: 添加地址到淘寶">
      <TutorialImage src="/assert/add_address_ship_to_home.png" />
    </TutorialCard>
  );
}

export function MessageNotificationSection() {
  return (
    <TutorialCard header="第四步: 合併包裹提交送貨上門定單">
      <TutorialImage src="/assert/ship_to_home_1.png" />
      <TutorialImage
        src="/assert/ship_to_home_2.png"
        style={{ marginTop: 15 }}
      />
    </TutorialCard>
  );
}

function getShopByShopNumber(shops, shopNumber) {
  for (let i = 0; i < shops.length; i++) {
    if (shops[i].shopNumber === shopNumber) {
      return shops[i];
    }
  }
}
