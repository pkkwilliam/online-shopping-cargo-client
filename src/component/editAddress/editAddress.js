import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import EditAddressView from "./editAddress.view";
import { withRouter } from "react-router-dom";

class EditAddress extends UserProfileComponent {
  state = {
    ...this.state,
    address: {},
    idEdit: false,
  };

  componentDidMount() {
    const { address } = this.routerParams;
    this.setState({
      address,
      idEdit: address?.contactName,
    });
  }

  render() {
    return (
      <EditAddressView
        onClickDelete={this.onClickDelete}
        onClickSubmit={this.onClickSubmit}
        {...this.state}
      />
    );
  }

  onClickDelete = () => {};

  onClickSubmit = () => {};
}

export default withRouter(EditAddress);
