import ApplicationComponent from "online-shopping-cargo-parent/dist/applicationComponent";
import ClientApplicationContext from "./clientApplicationContext";
import { CargoManagementContext } from "../context/provider";
import {
  GET_USER_PROFILE,
  LINK_PUSH_NOTIFICATION_TOKEN,
} from "online-shopping-cargo-parent/dist/service";
export default class ClientApplicationComponent extends ApplicationComponent {
  static contextType = CargoManagementContext;

  static _notificationToken = "";

  _clientApplicationContext = new ClientApplicationContext();

  componentDidMount() {
    if (this.userToken) {
      this.getUserProfile();
      this.linkNotificationToken();
    }
  }

  async getUserProfile() {
    if (this.appState.user.dirty) {
      this.serviceExecutor.execute(GET_USER_PROFILE()).then((userProfile) => {
        this.appState.user.setUserProfile(userProfile);
      });
    }
  }

  async linkNotificationToken() {
    const { dirty, token } = this.appState.notificationToken;
    if (dirty && token) {
      this.serviceExecutor.execute(LINK_PUSH_NOTIFICATION_TOKEN(token));
    }
  }

  get applicationContext() {
    return this._clientApplicationContext;
  }

  get appState() {
    return this.context;
  }

  get notificationToken() {
    return ClientApplicationComponent._notificationToken;
  }

  set notificationToken(notificationToken) {
    ClientApplicationComponent._notificationToken = notificationToken;
  }
}
