import applicationContext from "online-shopping-cargo-parent/dist/applicationContext";

export default class ClientApplicationContext extends applicationContext {
  get mock() {
    return true;
  }
}
