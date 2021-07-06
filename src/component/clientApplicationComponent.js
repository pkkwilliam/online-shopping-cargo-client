import ApplicationComponent from "online-shopping-cargo-parent/dist/applicationComponent";
import ClientApplicationContext from "./clientApplicationContext";
import { CargoManagementContext } from "../context/provider";
import { LINK_PUSH_NOTIFICATION_TOKEN } from "online-shopping-cargo-parent/dist/service";
import AppStateService from "./appStateService";

export default class ClientApplicationComponent extends ApplicationComponent {
  state = {
    ...this.state,
    loading: false,
  };

  static contextType = CargoManagementContext;

  static _appStateService;
  static _app = false;
  static _notificationToken = "";

  _clientApplicationContext = new ClientApplicationContext();

  componentDidMount() {
    const { app, notificationToken } = this.getAppParam();
    if (this.userToken) {
      this.appStateService.getUserProfile();
    }
    if (this.userToken && notificationToken) {
      this.appStateService.linkNotificationToken(notificationToken);
    }
    this.app = app === "true";
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

  goToReplace(page, params = {}) {
    // import { withRouter } from 'react-router-dom'
    // export default withRouter(MyComponent)
    this.props.history.replace({
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
    const app = urlParams.get("app");
    const notificationToken = urlParams.get("notificationToken");
    console.debug("app user", app);
    console.debug("client notification token", notificationToken);
    return { app, notificationToken };
  }

  loadingEnd() {
    this.setState({ loading: false });
  }

  loadingStart() {
    this.setState({
      loading: true,
    });
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

  get app() {
    return ClientApplicationComponent._app;
  }

  get notificationToken() {
    return ClientApplicationComponent._notificationToken;
  }

  set app(app) {
    ClientApplicationComponent._app = app;
  }

  set notificationToken(notificationToken) {
    ClientApplicationComponent._notificationToken = notificationToken;
  }
}
