import React from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import EyeCatch from "../eyeCatch/eyeCatch";
import Header from "../header/header";
import FooterView from "../footer/footer.view";
import { GITHUB_CONTENT_URL } from "online-shopping-cargo-parent/dist/service";
import {
  MY_PARCEL,
  PICKUP_QR_CODE,
  USER_PROFILE,
  TUTORIAL,
  MATCH_BAD_PARCEL,
  CALCULATOR,
  ADDRESS_GENERATOR,
  SHIP_TO_HOME_LANDING_PAGE,
} from "../../routes";
import Advertisement from "../advertisement";

const Accouncement = React.lazy(() => import("../announcement/announcement"));
const InstallApp = React.lazy(() => import("../installApp/installApp"));
const Menu = React.lazy(() => import("../menu/menu"));
const RegisterPromp = React.lazy(() =>
  import("../registerPromp/registerPromp")
);

export default class LandingPageView extends ApplicationComponentView {
  render() {
    const { app, userToken } = this.props;
    return (
      <this.Wrapper>
        {/* <RegisterPromp /> */}
        <Header>
          <img
            alt={"header_icon"}
            src={`${GITHUB_CONTENT_URL}/assert/logo.png`}
            style={{ height: 45 }}
          />
        </Header>
        <EyeCatch />
        <div style={{ padding: 10, marginBottom: 40 }}>
          <DownloadApp isApp={app} />
          <div>
            <Menu
              app={app}
              menuItems={getMenuItems(app, userToken)}
              userToken={userToken}
            />
          </div>
          <Advertisement />
          <div style={{ marginTop: 20 }}>
            <Accouncement />
          </div>
        </div>
        <FooterView />
      </this.Wrapper>
    );
  }
}

function DownloadApp({ isApp }) {
  if (!isApp) {
    return (
      <div style={{ marginBottom: 15 }}>
        <InstallApp />
      </div>
    );
  } else {
    return null;
  }
}

function getMenuItems(app, userToken) {
  return [
    USER_PROFILE,
    PICKUP_QR_CODE,
    SHIP_TO_HOME_LANDING_PAGE,
    MY_PARCEL,
    TUTORIAL,
    CALCULATOR,
    MATCH_BAD_PARCEL,
    ADDRESS_GENERATOR,
  ];
}
