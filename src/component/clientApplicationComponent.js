import ApplicationComponent from "online-shopping-cargo-parent/dist/applicationComponent";
import ClientApplicationContext from "./clientApplicationContext";

export default class ClientApplicationComponent extends ApplicationComponent {
  static _notificationToken = "";

  _clientApplicationContext = new ClientApplicationContext();

  get applicationContext() {
    return this._clientApplicationContext;
  }

  get notificationToken() {
    return ClientApplicationComponent._notificationToken;
  }

  set notificationToken(notificationToken) {
    ClientApplicationComponent._notificationToken = notificationToken;
  }
}
