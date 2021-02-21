import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
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
  render() {
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
}
