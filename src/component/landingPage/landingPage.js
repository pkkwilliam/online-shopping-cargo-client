import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import LandingPageView from "./landingPage.view";
export default class LandingPage extends ClientApplicationComponent {
  componentDidMount() {
    super.componentDidMount();
    this.setNotificationToken();
  }

  render() {
    return <LandingPageView userToken={this.userToken} />;
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
