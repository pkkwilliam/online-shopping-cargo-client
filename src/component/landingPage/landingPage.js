import React from "react";
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
  SAVE_TO_DESKTOP,
} from "../../routes";
import ClientApplicationComponent from "../clientApplicationComponent";
import { LINK_PUSH_NOTIFICATION_TOKEN } from "online-shopping-cargo-parent/dist/service";

const MENU_ITEMS = [
  SAVE_TO_DESKTOP,
  USER_PROFILE,
  PICKUP_QR_CODE,
  MY_PARCEL,
  TUTORIAL,
  CALCULATOR,
  MATCH_BAD_PARCEL,
  ADDRESS_GENERATOR,
];

const Accouncement = React.lazy(() => import("../announcement/announcement"));
const Menu = React.lazy(() => import("../menu/menu"));

export default class LandingPage extends ClientApplicationComponent {
  static linkedNotificationTokenServiceRequested = false;

  render() {
    this.linkedNotificationTokenService();
    return (
      <>
        <Header>
          <img
            alt={"header_icon"}
            src={`${GITHUB_CONTENT_URL}/assert/logo.png`}
            style={{ height: 45 }}
          />
        </Header>
        <EyeCatch />
        <div style={{ padding: 10, marginBottom: 40 }}>
          <div>
            <Menu menuItems={MENU_ITEMS} userToken={this.userToken} />
          </div>
          <div style={{ marginTop: 20 }}>
            <Accouncement />
          </div>
        </div>
        <FooterView />
      </>
    );
  }

  linkedNotificationTokenService() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.notificationToken = urlParams.get("notificationToken");
    if (
      !LandingPage.linkedNotificationTokenServiceRequested &&
      this.userToken &&
      this.notificationToken
    ) {
      this.serviceExecutor
        .execute(LINK_PUSH_NOTIFICATION_TOKEN(this.notificationToken))
        .then(
          () => (LandingPage.linkedNotificationTokenServiceRequested = true)
        );
    }
  }
}
