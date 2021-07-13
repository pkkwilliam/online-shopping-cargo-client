import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import {
  AddAddressToEcommerce,
  GenerateAddressSection,
  LoginSection,
  MessageNotificationSection,
} from "./tutorial";

export default class StorePickupTutorial extends UserProfileComponent {
  render() {
    return (
      <>
        <LoginSection />
        <GenerateAddressSection />
        <AddAddressToEcommerce />
        <MessageNotificationSection />
      </>
    );
  }
}
