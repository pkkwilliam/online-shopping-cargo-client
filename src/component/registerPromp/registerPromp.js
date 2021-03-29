import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import RegisterPrompView from "./registerPromp.view";

export default class RegisterPromp extends ClientApplicationComponent {
  state = {
    showPromp: false,
  };

  render() {
    this.validateUserRegisterStatus();
    return (
      <RegisterPrompView
        onClickToRegister={this.onClickToRegister}
        onCloseModal={this.onCloseModal}
        {...this.state}
      />
    );
  }

  onClickToRegister = () => {
    window.location.href = "/changePassword";
  };

  onCloseModal = () => {
    this.onClickToRegister();
  };

  validateUserRegisterStatus() {
    const { showPromp } = this.state;
    const { dirty, userProfile } = this.appState.user;
    if (!showPromp && !dirty && !userProfile.register) {
      this.setState({
        showPromp: true,
      });
      console.log("not register!");
    } else if (userProfile && userProfile.register) {
      console.log("register");
    }
  }
}
