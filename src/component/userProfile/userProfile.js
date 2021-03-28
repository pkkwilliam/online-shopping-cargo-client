import React from "react";
import UserProfileView from "./userProfile.view";
import UserProfileComponent from "../common/userProfileComponent";

export default class UserProfile extends UserProfileComponent {
  render() {
    return <UserProfileView userProfile={this.appState.user.userProfile} />;
  }
}
