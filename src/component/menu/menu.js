import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import MenuView from "./menu.view";

const ADDRESS_GENERATOR = {
  backgroundColor: "",
  children: null,
  label: "地址生成",
  url: "#addressGenerator",
};
const CALCULATOR = {
  backgroundColor: "",
  children: null,
  label: "費用計算",
  url: "#costCalculator",
};
const INSTALL = {
  backgroundColor: "",
  children: null,
  disabled: true,
  label: "安裝App",
  url: "#install",
};
const LOGIN = {
  backgroundColor: "",
  children: null,
  label: "登入  ",
  url: "#login",
};
const MY_PARCEL = {
  backgroundColor: "",
  children: null,
  label: "我的包裹",
  url: "#myParcel",
};
const PICKUP_QR_CODE = {
  backgroundColor: "",
  children: null,
  label: "取件",
  url: "#myPickupQRCode",
};
const SHOP_LANDING_PAGE = {
  backgroundColor: "",
  children: null,
  label: "商戶加入",
  url: "#shopLandingPage",
};
const USER_PROFILE = {
  backgroundColor: "",
  children: null,
  label: "賬戶",
  url: "#userProfile",
};

const MENU_ITEMS = [
  LOGIN,
  MY_PARCEL,
  PICKUP_QR_CODE,
  USER_PROFILE,
  SHOP_LANDING_PAGE,
  CALCULATOR,
  INSTALL,
  ADDRESS_GENERATOR,
];

export default class Menu extends ClientApplicationComponent {
  state = {
    ...this.state,
    display: "",
    userToken: "",
  };
  render() {
    return (
      <MenuView menuItems={MENU_ITEMS} onClick={this.props.onClickMenuItem} />
    );
  }
}
