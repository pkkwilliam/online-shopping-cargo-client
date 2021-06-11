import ClientApplicationComponent from "../clientApplicationComponent";
import { LOGIN } from "../../routes";

export default class UserProfileComponent extends ClientApplicationComponent {
  componentDidMount() {
    super.componentDidMount();
    this.checkUserToken();
  }

  checkUserToken() {
    if (this.userToken) {
      this.initialServiceRequest();
    } else {
      this.goToReplace(LOGIN);
      // window.location.replace("/login");
    }
  }

  initialServiceRequest() {
    console.log(
      "override this method of first service request after user token checked"
    );
  }
}
