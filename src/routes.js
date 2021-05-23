import React from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import {
  BoxArrowInDown,
  BoxSeam,
  CalculatorFill,
  ClipboardCheck,
  Check2Circle,
  Eyeglasses,
  Key,
  KeyFill,
  PersonCheck,
  PersonFill,
  Signpost2,
  Shop,
  TextareaT,
  UpcScan,
} from "react-bootstrap-icons";

// icons https://icons.getbootstrap.com/
export const EditAddress = React.lazy(() =>
  import("./component/editAddress/editAddress")
);
export const Address = React.lazy(() => import("./component/address/address"));
export const AllowedBy = React.lazy(() =>
  import("./component/thirdPersonPickup/allowedBy")
);
export const AddressGenerator = React.lazy(() =>
  import("./component/addressGenerator/addressGenerator")
);
export const ApplicationSmsAuth = React.lazy(() =>
  import("./component/common/applicationSmsAuth")
);
export const ChangePassword = React.lazy(() =>
  import("./component/changePassword/changePassword")
);
export const CostCalculator = React.lazy(() =>
  import("./component/costCalculator/costCalculator.view")
);
export const LandingPage = React.lazy(() =>
  import("./component/landingPage/landingPage")
);
export const MatchBadParcel = React.lazy(() =>
  import("./component/matchBadParcel/matchBadParcel")
);
export const PickupQRCode = React.lazy(() =>
  import("./component/pickupQRCode/pickupQRCode")
);
export const Register = React.lazy(() =>
  import("./component/register/register")
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
  labelIcon: {
    fontWeight: 600,
    margin: 0,
  },
};

export const ADDRESS = {
  icon: <Signpost2 style={styles.icon} />,
  component: <Address />,
  disabledWhenUserTokenPresent: false,
  hideCard: true,
  label: "送貨上門地址",
  sectionContainer: true,
  url: "/address",
};
export const ADDRESS_GENERATOR = {
  icon: <TextareaT style={styles.icon} />,
  component: <AddressGenerator />,
  disabledWhenUserTokenPresent: false,
  hideBackground: true,
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
export const CHANGE_PASSWORD = {
  icon: <Key style={styles.icon} />,
  component: <ChangePassword />,
  disabledWhenUserTokenPresent: false,
  hideCard: true,
  label: "更改密碼",
  sectionContainer: true,
  url: "/changePassword",
};
export const EDIT_ADDRESS = {
  icon: <Signpost2 style={styles.icon} />,
  component: <EditAddress />,
  disabledWhenUserTokenPresent: false,
  hideCard: true,
  label: "地址",
  sectionContainer: true,
  url: "/editAddress",
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
export const MATCH_BAD_PARCEL = {
  icon: <p style={{ ...styles.icon, ...styles.labelIcon }}>領</p>,
  component: <MatchBadParcel />,
  disabledWhenUserTokenPresent: false,
  label: "包裹認領",
  sectionContainer: true,
  url: "/matchBadParcel",
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
export const REGISTER = {
  icon: <ClipboardCheck style={styles.icon} />,
  component: <Register />,
  disabledWhenUserTokenPresent: false,
  hideCard: true,
  label: "注冊",
  sectionContainer: true,
  url: "/register",
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
  ADDRESS,
  EDIT_ADDRESS,
  LOGIN,
  THIRD_PERSON,
  ALLOWED_BY,
  MY_PARCEL,
  PICKUP_QR_CODE,
  USER_PROFILE,
  TUTORIAL,
  CALCULATOR,
  MATCH_BAD_PARCEL,
  SAVE_TO_DESKTOP,
  SHOP_LIST,
  ADDRESS_GENERATOR,
  CHANGE_PASSWORD,
  REGISTER,
  LANDING_PAGE,
];
