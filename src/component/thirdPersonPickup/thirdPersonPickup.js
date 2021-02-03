import React from "react";
import ThirdPersonPickupView from "./thirdPersonPickup.view";
import {
  ADD_THIRD_PERSON,
  GET_THIRD_PERSONS,
  REMOVE_THIRD_PERSON,
} from "online-shopping-cargo-parent/dist/service";
import UserProfileComponent from "../common/userProfileComponent";

export default class ThirdPersonPickup extends UserProfileComponent {
  state = {
    ...this.state,
    confirmModal: {
      body: "",
      header: "",
      onClickConfirm: () => {},
      show: false,
    },
    thirdPersons: [],
  };

  componentDidMount() {
    this.getThirdPersons();
  }

  render() {
    return (
      <ThirdPersonPickupView
        onClickAddThirdPerson={this.onClickAddThirdPerson}
        onClickRemoveThirdPerson={this.onClickRemoveThirdPerson}
        onCloseModal={this.onCloseError}
        onCloseConfirmModal={this.onCloseConfirmModal}
        onChangeCountryCode={this.onChangeCountryCode}
        onChangeSmsNumber={this.onChangeSmsNumber}
        {...this.state}
      />
    );
  }

  getThirdPersons() {
    this.serviceExecutor
      .execute(GET_THIRD_PERSONS())
      .then((thirdPersons) => this.setState({ thirdPersons }));
  }

  modifyThirdPerson(isAdd, countryCode, smsNumber) {
    if (countryCode && smsNumber) {
      this.serviceExecutor
        .execute(
          isAdd
            ? ADD_THIRD_PERSON({ countryCode, smsNumber })
            : REMOVE_THIRD_PERSON({ countryCode, smsNumber })
        )
        .then((thirdPersons) => this.setState({ thirdPersons }));
    }
  }

  onClickRemoveThirdPerson = (countryCode, smsNumber) => {
    this.setState({
      confirmModal: {
        body: `删除${smsNumber}?`,
        header: "删除代收件人",
        onClickConfirm: () =>
          this.modifyThirdPerson(false, countryCode, smsNumber),
        show: true,
      },
    });
  };

  onClickAddThirdPerson = () => {
    const { countrySelected, smsNumber } = this.state;
    this.setState({
      confirmModal: {
        body: `添加${smsNumber}?`,
        header: "添加代收件人",
        onClickConfirm: () =>
          this.modifyThirdPerson(true, countrySelected.code, smsNumber),
        show: true,
      },
    });
  };

  onCloseConfirmModal = () => {
    this.setState({
      confirmModal: {
        show: false,
      },
    });
  };
}
