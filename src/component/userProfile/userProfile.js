import React from "react";
import UserProfileView from "./userProfile.view";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";

class UserProfile extends UserProfileComponent {
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

export default withRouter(UserProfile);
