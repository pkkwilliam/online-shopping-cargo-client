import React from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import {
  BoxArrowInDown,
  BoxSeam,
  CalculatorFill,
  Check2Circle,
  Eyeglasses,
  KeyFill,
  PersonCheck,
  PersonFill,
  Shop,
  TextareaT,
  UpcScan,
} from "react-bootstrap-icons";

export const AllowedBy = React.lazy(() =>
  import("./component/thirdPersonPickup/allowedBy")
);
export const AddressGenerator = React.lazy(() =>
  import("./component/addressGenerator/addressGenerator")
);
export const ApplicationSmsAuth = React.lazy(() =>
  import("./component/common/applicationSmsAuth")
);
export const CostCalculator = React.lazy(() =>
  import("./component/costCalculator/costCalculator.view")
);
export const LandingPage = React.lazy(() =>
  import("./component/landingPage/landingPage")
);

export const PickupQRCode = React.lazy(() =>
  import("./component/pickupQRCode/pickupQRCode")
);
export const SaveToDesktop = React.lazy(() =>
  import("./component/saveToDesktop/saveToDesktop")
);
export const ShopList = React.lazy(() =>
  import("./component/shopList/shopList")
);
export const ThirdPersonPickup = React.lazy(() =>
  import("./component/thirdPersonPickup/thirdPersonPickup")
);
export const Tracking = React.lazy(() =>
  import("./component/tracking/tracking")
);
export const Tutorial = React.lazy(() =>
  import("./component/tutorial/tutorial")
);
export const UserProfile = React.lazy(() =>
  import("./component/userProfile/userProfile")
);

export const styles = {
  icon: {
    fontSize: 26,
  },
};

export const ADDRESS_GENERATOR = {
  icon: <TextareaT style={styles.icon} />,
  component: <AddressGenerator />,
  disabledWhenUserTokenPresent: false,
  label: "收貨地址",
  sectionContainer: true,
  url: "/addressGenerator",
};
export const ALLOWED_BY = {
  icon: <Check2Circle style={styles.icon} />,
  component: <AllowedBy />,
  disabledWhenUserTokenPresent: false,
  hideCard: true,
  label: "代他人取件",
  sectionContainer: true,
  url: "/allowedBy",
};
export const CALCULATOR = {
  icon: <CalculatorFill style={styles.icon} />,
  component: <CostCalculator />,
  disabledWhenUserTokenPresent: false,
  hideCard: true,
  label: "運費計算",
  sectionContainer: true,
  url: "/costCalculator",
};
export const LANDING_PAGE = {
  icon: <KeyFill style={styles.icon} />,
  component: <LandingPage />,
  disabledWhenUserTokenPresent: true,
  label: "landing",
  sectionContainer: false,
  url: "/",
};
export const LOGIN = {
  icon: <KeyFill style={styles.icon} />,
  component: <ApplicationSmsAuth />,
  disabledWhenUserTokenPresent: true,
  label: "登入",
  sectionContainer: true,
  url: "/login",
};
export const MY_PARCEL = {
  icon: <BoxSeam style={styles.icon} />,
  component: <Tracking />,
  disabledWhenUserTokenPresent: false,
  label: "我的包裹",
  sectionContainer: true,
  url: "/myParcel",
};
export const PICKUP_QR_CODE = {
  backgroundColor: styleSchema.color.primaryLight,
  icon: <UpcScan style={styles.icon} />,
  component: <PickupQRCode />,
  disabledWhenUserTokenPresent: false,
  hideBackground: true,
  hideCard: true,
  label: "取件",
  sectionContainer: true,
  url: "/myPickupQRCode",
};
export const SAVE_TO_DESKTOP = {
  buttonBackgroundColor: "#006EE6",
  icon: <BoxArrowInDown style={{ ...styles.icon, marginBottom: 2 }} />,
  component: <SaveToDesktop />,
  label: "安裝App",
  sectionContainer: false,
  url: "/saveToDesktop",
};
export const SHOP_LIST = {
  icon: <Shop style={styles.icon} />,
  component: <ShopList />,
  disabledWhenUserTokenPresent: false,
  hideCard: true,
  label: "附近門店",
  sectionContainer: true,
  url: "/shopList",
};
export const TUTORIAL = {
  buttonBackgroundColor: "#2DB85C",
  icon: <Eyeglasses style={styles.icon} />,
  component: <Tutorial />,
  disabledWhenUserTokenPresent: false,
  hideCard: true,
  label: "如何使用",
  sectionContainer: true,
  url: "/tutorial",
};
export const THIRD_PERSON = {
  component: <ThirdPersonPickup />,
  icon: <PersonCheck style={styles.icon} />,
  disabledWhenUserTokenPresent: false,
  hideCard: true,
  label: "管理代收件人",
  sectionContainer: true,
  url: "/thirdPersonPickup",
};
export const USER_PROFILE = {
  icon: <PersonFill style={styles.icon} />,
  component: <UserProfile />,
  disabledWhenUserTokenPresent: false,
  hideCard: true,
  label: "賬戶",
  sectionContainer: true,
  url: "/userProfile",
};

export default [
  LOGIN,
  THIRD_PERSON,
  ALLOWED_BY,
  MY_PARCEL,
  PICKUP_QR_CODE,
  USER_PROFILE,
  TUTORIAL,
  CALCULATOR,
  SAVE_TO_DESKTOP,
  SHOP_LIST,
  ADDRESS_GENERATOR,
  LANDING_PAGE,
];
