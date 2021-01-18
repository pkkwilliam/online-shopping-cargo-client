import React from "react";
import MenuView from "./menu.view";
import {
  BoxSeam,
  CalculatorFill,
  Eyeglasses,
  GearWide,
  KeyFill,
  PersonFill,
  Shop,
  TextareaT,
  UpcScan,
} from "react-bootstrap-icons";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

export default function Menu(props) {
  const { onClickMenuItem, userToken } = props;
  return (
    <MenuView
      menuItems={generateMenuItemsData(MENU_ITEMS, userToken)}
      onClick={onClickMenuItem}
      userToken={userToken}
    />
  );
}

function generateMenuItemsData(menuItems, userToken) {
  return menuItems.map((item) => {
    if (item.disabledWhenUserTokenPresent && userToken) {
      item = { ...item, disabled: true };
    }
    return item;
  });
}

const styles = {
  icon: {
    fontSize: 26,
  },
};

export const ADDRESS_GENERATOR = {
  backgroundColor: "",
  children: <TextareaT style={styles.icon} />,
  disabledWhenUserTokenPresent: false,
  label: "地址生成",
  url: "#addressGenerator",
};
const CALCULATOR = {
  backgroundColor: "",
  children: <CalculatorFill style={styles.icon} />,
  disabledWhenUserTokenPresent: false,
  label: "費用計算",
  url: "#costCalculator",
};
const INSTALL = {
  backgroundColor: "",
  children: <GearWide style={styles.icon} />,
  disabledWhenUserTokenPresent: false,
  disabled: true,
  label: "安裝App",
  url: "#install",
};
export const LOGIN = {
  backgroundColor: "",
  children: <KeyFill style={styles.icon} />,
  disabledWhenUserTokenPresent: true,
  label: "登入",
  url: "#login",
};
const MY_PARCEL = {
  backgroundColor: "",
  children: <BoxSeam style={styles.icon} />,
  disabledWhenUserTokenPresent: false,
  label: "我的包裹",
  url: "#myParcel",
};
const PICKUP_QR_CODE = {
  backgroundColor: styleSchema.color.primaryLight,
  children: <UpcScan style={styles.icon} />,
  disabledWhenUserTokenPresent: false,
  label: "取件",
  url: "#myPickupQRCode",
};
const SHOP_LANDING_PAGE = {
  backgroundColor: "",
  children: <Shop style={styles.icon} />,
  disabledWhenUserTokenPresent: false,
  label: "商戶加入",
  url: "#shopLandingPage",
};
const TUTORIAL = {
  backgroundColor: "",
  children: <Eyeglasses style={styles.icon} />,
  disabledWhenUserTokenPresent: false,
  label: "如何使用",
  url: "#tutorial",
};
const USER_PROFILE = {
  backgroundColor: "",
  children: <PersonFill style={styles.icon} />,
  disabledWhenUserTokenPresent: false,
  label: "賬戶",
  url: "#userProfile",
};

const MENU_ITEMS = [
  LOGIN,
  MY_PARCEL,
  PICKUP_QR_CODE,
  USER_PROFILE,
  TUTORIAL,
  CALCULATOR,
  INSTALL,
  ADDRESS_GENERATOR,
];
