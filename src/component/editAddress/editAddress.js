import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import EditAddressView, {
  CONTACT_NAME,
  STREET,
  UNIT,
} from "./editAddress.view";
import { withRouter } from "react-router-dom";
import {
  CREATE_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADDRESS,
} from "online-shopping-cargo-parent/dist/service";
import { getCountryObjectByCode } from "online-shopping-cargo-parent/dist/applicationPhoneNumberTextField";

class EditAddress extends UserProfileComponent {
  state = {
    ...this.state,
    address: {
      contactName: "",
      street: "",
      unit: "",
    },
    isEdit: false,
  };

  componentDidMount() {
    super.componentDidMount();
    if (this?.routerParams?.address) {
      const { address } = this.routerParams;
      this.setState({
        address,
        countrySelected: getCountryObjectByCode(address.countryCode),
        isEdit: true,
        smsNumber: address.phoneNumber,
      });
    }
  }

  render() {
    console.log(this.state);
    return (
      <EditAddressView
        onChangeValue={this.onChangeValue}
        onClickConfirmDelete={this.onClickConfirmDelete}
        onClickDelete={this.onClickDelete}
        onClickSubmit={this.onClickSubmit}
        onCloseConfirmModal={this.onCloseConfirmModal}
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        onChangeCountryCode={this.onChangeCountryCode}
        onChangeSmsNumber={this.onChangeSmsNumber}
        {...this.state}
      />
    );
  }

  onChangeValue = (target, value) => {
    let { contactName, phoneNumber, street, unit } = this.state.address;
    switch (target) {
      case CONTACT_NAME:
        contactName = value;
        break;
      case STREET:
        street = value;
        break;
      case UNIT:
        unit = value;
        break;
      default:
        return;
    }
    this.setState((state) => ({
      address: {
        // doing this to keep the id so of the address object for post and delete
        ...state.address,
        contactName,
        phoneNumber,
        street,
        unit,
      },
    }));
  };

  onCloseConfirmModal = () => {
    this.setState({
      confirmModal: {
        show: false,
      },
    });
  };

  onClickDelete = () => {
    this.setState({
      confirmModal: {
        body: "確定要删除此地址嗎?",
        header: "删除地址",
        show: true,
      },
    });
  };

  onClickConfirmDelete = () => {
    this.setState({
      confirmModal: {
        show: false,
      },
    });
    this.serviceExecutor
      .execute(DELETE_ADDRESS(this.state.address))
      .then(() => this.onServiceSuccess());
  };

  onClickSubmit = () => {
    let { address, countrySelected, isEdit, smsNumber } = this.state;
    address = {
      ...address,
      countryCode: countrySelected.code,
      phoneNumber: smsNumber,
    };
    if (isEdit) {
      this.serviceExecutor
        .execute(UPDATE_ADDRESS(address))
        .then(() => this.onServiceSuccess());
    } else {
      this.serviceExecutor
        .execute(CREATE_ADDRESS(address))
        .then(() => this.onServiceSuccess());
    }
  };

  onServiceSuccess() {
    this.setState({
      toast: {
        body: `${this.state.isEdit ? "修改" : "創建"}成功`,
        show: true,
      },
    });
    this.appState.address.setAddressDirty();
    setTimeout(() => this.goBack(), 1500);
  }
}

export default withRouter(EditAddress);
