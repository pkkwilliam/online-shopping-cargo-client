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
    this.setNotificationToken();
    this.getImportantNotice();
  }

  render() {
    return <LandingPageView userToken={this.userToken} {...this.state} />;
  }

  getImportantNotice() {
    this.serviceExecutor
      .execute(GET_GITHUB_JSON_CONTENT("/label/important_notice.json"))
      .then((importantNotices) => this.setState({ importantNotices }));
  }

  setNotificationToken() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("notificationToken");
    if (token) {
      this.appState.notificationToken.setNotificationToken(token);
    }
  }
}
