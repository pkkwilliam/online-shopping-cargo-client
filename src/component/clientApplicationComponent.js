import ApplicationComponent from "online-shopping-cargo-parent/dist/applicationComponent";
import ClientApplicationContext from "./clientApplicationContext";
import { CargoManagementContext } from "../context/provider";
import { LINK_PUSH_NOTIFICATION_TOKEN } from "online-shopping-cargo-parent/dist/service";
import AppStateService from "./appStateService";

export default class ClientApplicationComponent extends ApplicationComponent {
  static contextType = CargoManagementContext;

  static _appStateService;
  static _isApp = false;
  static _notificationToken = "";

  _clientApplicationContext = new ClientApplicationContext();

  componentDidMount() {
    const { isApp, notificationToken } = this.getAppParam();
    if (this.userToken) {
      this.appStateService.getUserProfile();
    }
    if (this.userToken && notificationToken) {
      this.appStateService.linkNotificationToken(notificationToken);
    }
    this.isApp = isApp === "true";
  }

  goBack() {
    window.history.back();
  }

  goTo(page, params = {}) {
    // import { withRouter } from 'react-router-dom'
    // export default withRouter(MyComponent)
    this.props.history.push({
      pathname: page.url,
      state: params,
    });
  }

  async linkNotificationToken() {
    const { dirty, token } = this.appState.notificationToken;
    if (dirty && token) {
      this.serviceExecutor.execute(LINK_PUSH_NOTIFICATION_TOKEN(token));
    }
  }

  getAppParam() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const isApp = urlParams.get("isApp");
    const notificationToken = urlParams.get("notificationToken");
    console.debug("app user", isApp);
    console.debug("client notification token", notificationToken);
    return { isApp, notificationToken };
  }

  get routerParams() {
    // import { withRouter } from 'react-router-dom'
    // export default withRouter(MyComponent)
    return this.props.location.state;
  }

  get applicationContext() {
    return this._clientApplicationContext;
  }

  get appState() {
    return this.context;
  }

  get appStateService() {
    if (!this._appStateService) {
      this._appStateService = new AppStateService(
        this.appState,
        this.serviceExecutor
      );
    }
    return this._appStateService;
  }

  get isApp() {
    return ClientApplicationComponent._isApp;
  }

  get notificationToken() {
    return ClientApplicationComponent._notificationToken;
  }

  set isApp(isApp) {
    ClientApplicationComponent._isApp = isApp;
  }

  set notificationToken(notificationToken) {
    ClientApplicationComponent._notificationToken = notificationToken;
  }
}
