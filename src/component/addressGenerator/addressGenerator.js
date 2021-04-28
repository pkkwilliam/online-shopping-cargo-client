import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import AddressGeneratorView from "./addressGenerator.view";

export default class AddressGenerator extends UserProfileComponent {
  state = {
    shopSelected: undefined,
  };

  render() {
    const { userProfile } = this.appState.user;
    return (
      <AddressGeneratorView
        onClickCopyableTextField={this.onClickCopyableTextField}
        onClickRestart={this.onClickRestart}
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        onSelectShop={this.onSelectShop}
        userProfile={userProfile}
        {...this.state}
      />
    );
  }

  onClickCopyableTextField = (label, value) => {
    this.setState({
      toast: {
        body: `複制${label}成功`,
        show: true,
      },
    });
    navigator.clipboard
      .writeText(value)
      .then(() => console.log("text copied"))
      .catch((ex) => console.log(ex));
  };

  onClickRestart = () => {
    this.setState({
      shopSelected: false,
    });
  };

  onSelectShop = (shopSelected) => {
    this.setState({
      shopSelected,
    });
  };
}
