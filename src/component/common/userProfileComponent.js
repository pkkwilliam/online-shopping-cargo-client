import ClientApplicationComponent from "../clientApplicationComponent";

export default class UserProfileComponent extends ClientApplicationComponent {
  componentDidMount() {
    super.componentDidMount();
    this.checkUserToken();
  }

  checkUserToken() {
    if (this.userToken) {
      this.initialServiceRequest();
    } else {
      window.location.href = "/login";
    }
  }

  initialServiceRequest() {
    console.log(
      "override this method of first service request after user token checked"
    );
  }
}
