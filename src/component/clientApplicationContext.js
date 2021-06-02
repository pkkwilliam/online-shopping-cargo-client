import applicationContext from "online-shopping-cargo-parent/dist/applicationContext";

export default class ClientApplicationContext extends applicationContext {
  get mock() {
    return true;
  }

  get serviceUrl() {
    // REACT_APP_SERVICE_URL=http://bitcode-service:9091 yarn start
    return process.env.REACT_APP_SERVICE_URL;
  }
}
