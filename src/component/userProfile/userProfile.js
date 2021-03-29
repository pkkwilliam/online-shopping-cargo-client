import React from "react";
import UserProfileView from "./userProfile.view";
import UserProfileComponent from "../common/userProfileComponent";

export default class UserProfile extends UserProfileComponent {
  render() {
    return (
      <UserProfileView
        onClickLogout={this.onClickLogout}
        userProfile={this.appState.user.userProfile}
      />
    );
  }

  onClickLogout = () => {
    this.storage.removeUserToken();
    window.location.reload();
  };
}
