import ApplicationComponent from "online-shopping-cargo-parent/dist/applicationComponent";
import ClientApplicationContext from "./clientApplicationContext";
import { CargoManagementContext } from "../context/provider";
import { GET_USER_PROFILE } from "online-shopping-cargo-parent/dist/service";
export default class ClientApplicationComponent extends ApplicationComponent {
  static contextType = CargoManagementContext;

  static _notificationToken = "";

  _clientApplicationContext = new ClientApplicationContext();

  componentDidMount() {
    if (this.appState.user.dirty && this.userToken) {
      this.getUserProfile();
    }
  }

  getUserProfile() {
    this.serviceExecutor
      .execute(GET_USER_PROFILE())
      .then((userProfile) => this.appState.user.setUserProfile(userProfile));
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
