import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import UserProfileView from "./userProfile.view";
import { GET_USER_PROFILE } from "online-shopping-cargo-parent/dist/service";

export default class UserProfile extends ClientApplicationComponent {
  state = {
    userProfile: {},
  };

  componentDidMount() {
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
