import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";
import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import LandingPageView from "./landingPage.view";
import { withRouter } from "react-router-dom";

class LandingPage extends ClientApplicationComponent {
  state = {
    ...this.state,
    importantNotices: [],
  };

  componentDidMount() {
    super.componentDidMount();
    // this.getImportantNotice();
  }

  render() {
    return (
      <LandingPageView
        app={this.app}
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
}

export default withRouter(LandingPage);
