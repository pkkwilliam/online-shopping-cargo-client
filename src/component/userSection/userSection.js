import React from "react";
import UserSectionView from "./userSection.view";
import ClientApplicationComponent from "../clientApplicationComponent";

export default class UserSection extends ClientApplicationComponent {
  state = {
    ...this.state,
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
        showModal={this.setError}
        onClickSectionDirect={this.onClickSectionDirect}
        onCloseModal={this.onCloseError}
        serviceExecutor={this.serviceExecutor}
        {...this.state}
      />
    );
  }

  onClickSectionDirect = (display) => {
    this.setState({
      display,
    });
  };
}
