import React from "react";
import UserSectionView from "./userSection.view";
import ClientApplicationComponent from "../clientApplicationComponent";

export default class UserSection extends ClientApplicationComponent {
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
