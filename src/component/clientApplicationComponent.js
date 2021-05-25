import ApplicationComponent from "online-shopping-cargo-parent/dist/applicationComponent";
import ClientApplicationContext from "./clientApplicationContext";
import { CargoManagementContext } from "../context/provider";
import {
  GET_USER_PROFILE,
  LINK_PUSH_NOTIFICATION_TOKEN,
} from "online-shopping-cargo-parent/dist/service";

export default class ClientApplicationComponent extends ApplicationComponent {
  static contextType = CargoManagementContext;

  static _isApp = false;
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

  get routerParams() {
    // import { withRouter } from 'react-router-dom'
    // export default withRouter(MyComponent)
    return this.props.location.state;
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
