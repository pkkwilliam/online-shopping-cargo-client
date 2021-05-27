import React from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import EyeCatch from "../eyeCatch/eyeCatch";
import Header from "../header/header";
import FooterView from "../footer/footer.view";
import { GITHUB_CONTENT_URL } from "online-shopping-cargo-parent/dist/service";
import View from "online-shopping-cargo-parent/dist/view";
import {
  MY_PARCEL,
  PICKUP_QR_CODE,
  USER_PROFILE,
  TUTORIAL,
  MATCH_BAD_PARCEL,
  CALCULATOR,
  ADDRESS_GENERATOR,
  SAVE_TO_DESKTOP,
  SHIP_TO_HOME_LANDING_PAGE,
} from "../../routes";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

const Accouncement = React.lazy(() => import("../announcement/announcement"));
const Menu = React.lazy(() => import("../menu/menu"));
const RegisterPromp = React.lazy(() =>
  import("../registerPromp/registerPromp")
);

export default class LandingPageView extends ApplicationComponentView {
  render() {
    const { isApp, userToken } = this.props;
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
          <div>
            {/* <ImportantNotice {...this.props} /> */}
            <Menu
              isApp={isApp}
              menuItems={getMenuItems(isApp, userToken)}
              userToken={userToken}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <Accouncement />
          </div>
        </div>
        <FooterView />
      </this.Wrapper>
    );
  }
}

function ImportantNotice({ importantNotices }) {
  return importantNotices.map((importantNotice) => {
    const { detail } = importantNotice;
    return (
      <View
        style={{
          border: styleSchema.color.primaryDark,
          borderStyle: "solid",
          padding: 15,
          borderRadius: 5,
          borderWidth: 3,
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: detail,
          }}
        />
      </View>
    );
  });
}

function getMenuItems(isApp, userToken) {
  if (isApp) {
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
  } else {
    return [
      SAVE_TO_DESKTOP,
      USER_PROFILE,
      PICKUP_QR_CODE,
      MY_PARCEL,
      TUTORIAL,
      CALCULATOR,
      MATCH_BAD_PARCEL,
      ADDRESS_GENERATOR,
    ];
  }
}
