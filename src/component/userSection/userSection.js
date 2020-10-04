import React from "react";
import ApplicationComponent from "../../common/applicationComponent";
import UserSectionView from "./userSection.view";

export default class UserSection extends ApplicationComponent {
  state = {
    display: "",
    userToken: "",
  };

  componentDidMount() {
    this.setState({
      userToken: this.storage.getUserToken(),
    });
  }

  render() {
    const { display, userToken } = this.state;
    return (
      <UserSectionView
        display={display}
        hasToken={userToken}
        onClickSectionDirect={this.onClickSectionDirect}
      />
    );
  }

  onClickSectionDirect = (display) => {
    this.setState({
      display,
    });
  };
}
