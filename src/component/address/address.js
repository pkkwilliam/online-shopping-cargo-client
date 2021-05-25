import { GET_ALL_ADDRESS_BY_USER } from "online-shopping-cargo-parent/dist/service";
import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import AddressView from "./address.view";
import { withRouter } from "react-router-dom";
import { EDIT_ADDRESS } from "../../routes";

class Address extends UserProfileComponent {
  state = {
    ...this.state,
  };

  componentDidMount() {
    super.componentDidMount();
  }

  initialServiceRequest() {
    this.getAddress();
  }

  render() {
    return (
      <AddressView
        addresses={this.appState.address.addresses}
        onClickAddress={this.onClickAddress}
        onClickAddAddress={this.onClickAddAddress}
        onClickEditAddress={this.onClickEditAddress}
        {...this.state}
      />
    );
  }

  onClickAddress = (address) => {
    this.appState.address.setSelectedAddress(address);
    this.goBack();
  };

  onClickAddAddress = () => {
    this.goTo(EDIT_ADDRESS);
  };

  onClickEditAddress = (address) => {
    this.goTo(EDIT_ADDRESS, { address });
  };

  getAddress() {
    if (this.appState.address.dirty) {
      this.serviceExecutor
        .execute(GET_ALL_ADDRESS_BY_USER())
        .then((addresses) => {
          this.appState.address.setAddress(addresses);
        });
    }
  }
}

export default withRouter(Address);
