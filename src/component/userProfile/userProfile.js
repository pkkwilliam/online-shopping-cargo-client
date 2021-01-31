import React from "react";
import UserProfileView from "./userProfile.view";
import { GET_USER_PROFILE } from "online-shopping-cargo-parent/dist/service";
import UserProfileComponent from "../common/userProfileComponent";

export default class UserProfile extends UserProfileComponent {
  state = {
    userProfile: {},
  };

  initialServiceRequest() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.serviceExecutor.execute(GET_USER_PROFILE()).then((userProfile) =>
      this.setState({
        userProfile,
      })
    );
  }

  render() {
    const { userProfile } = this.state;
    return <UserProfileView userProfile={userProfile} />;
  }
}
