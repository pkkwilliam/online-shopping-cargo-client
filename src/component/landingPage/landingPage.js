import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";
import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import LandingPageView from "./landingPage.view";
export default class LandingPage extends ClientApplicationComponent {
  state = {
    ...this.state,
    importantNotices: [],
  };

  componentDidMount() {
    super.componentDidMount();
    this.setAppParam();
    this.getImportantNotice();
  }

  render() {
    return (
      <LandingPageView
        isApp={this.isApp}
        userToken={this.userToken}
        {...this.state}
      />
    );
  }

  getImportantNotice() {
    this.serviceExecutor
      .execute(GET_GITHUB_JSON_CONTENT("/label/important_notice.json"))
      .then((importantNotices) => this.setState({ importantNotices }));
  }

  setAppParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const isApp = urlParams.get("isApp");
    const token = urlParams.get("notificationToken");
    console.debug("app user", isApp);
    console.debug("client notification token", token);
    if (token) {
      this.appState.notificationToken.setNotificationToken(token);
    }
    if (isApp) {
      this.isApp = isApp === "true";
    }
  }
}
