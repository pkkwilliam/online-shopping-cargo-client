import ApplicationComponent from "online-shopping-cargo-parent/dist/applicationComponent";
import ClientApplicationContext from "./clientApplicationContext";

export default class ClientApplicationComponent extends ApplicationComponent {
  _clientApplicationContext = new ClientApplicationContext();

  get applicationContext() {
    return this._clientApplicationContext;
  }
}
