import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import AddressGeneratorView from "./addressGenerator.view";
import { withRouter } from "react-router-dom";
import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";

class AddressGenerator extends UserProfileComponent {
  state = {
    receiveAddress: undefined,
    shopSelected: undefined,
  };

  async componentDidMount() {
    const receiveAddress = await this.serviceExecutor.execute(
      GET_GITHUB_JSON_CONTENT("/receiveAddress/receiveAddress.json")
    );
    this.setState({
      receiveAddress,
      shopSelected: this.props.shopSelected,
    });
  }

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

export default withRouter(AddressGenerator);
