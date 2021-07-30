import {
  GET_ALL_ADDRESS_BY_USER,
  GET_GITHUB_JSON_CONTENT,
  GET_PARCELS,
  GET_SHIP_TO_HOME_ALL,
  GET_SHOPS,
  GET_USER_PROFILE,
  LINK_PUSH_NOTIFICATION_TOKEN,
} from "online-shopping-cargo-parent/dist/service";

/**
 * @deprecated
 */
export default class AppStateService {
  static _appState;
  static _serviceExecutor;

  constructor(appState, serviceExecutor) {
    this._appState = appState;
    this._serviceExecutor = serviceExecutor;
  }

  get appState() {
    return this._appState;
  }

  get serviceExecutor() {
    return this._serviceExecutor;
  }

  getAddress() {
    if (this.appState.address.dirty) {
      this.serviceExecutor
        .execute(GET_ALL_ADDRESS_BY_USER())
        .then((addresses) => {
          this.appState.address.setAddress(addresses);
        });
    }
  }

  getAnnouncement() {
    if (this.appState.announcement.dirty) {
      this.serviceExecutor
        .execute(GET_GITHUB_JSON_CONTENT("/label/accouncements.json"))
        .then((announcement) => {
          this.appState.announcement.setAnnouncement(announcement);
        });
    }
  }

  getEyeCatch() {
    if (this.appState.eyeCatch.dirty) {
      this.serviceExecutor
        .execute(GET_GITHUB_JSON_CONTENT("/label/eye_catch.json"))
        .then((eyeCatch) => {
          this.appState.eyeCatch.setEyeCatch(eyeCatch);
        });
    }
  }

  getParcels(forceLoad = false) {
    if (this.appState.parcel.dirty || forceLoad) {
      this.serviceExecutor
        .execute(GET_PARCELS())
        .then((parcelResponse) =>
          this.appState.parcel.setParcel(parcelResponse.parcels)
        );
    }
  }

  getShipToHomeOrders(forceLoad = false, { callback = () => {} } = {}) {
    if (this.appState.shipToHome.dirty || forceLoad) {
      this.serviceExecutor
        .execute(GET_SHIP_TO_HOME_ALL())
        .then((shipToHomeOrders) => {
          this.appState.shipToHome.setShipToHome(shipToHomeOrders);
          callback();
        });
    }
  }

  getShops() {
    if (this.appState.shop.dirty) {
      this.serviceExecutor
        .execute(GET_SHOPS())
        .then((shops) => this.appState.shop.setShop(shops));
    }
  }

  getUserProfile() {
    if (this.appState.user.dirty) {
      this.serviceExecutor.execute(GET_USER_PROFILE()).then((userProfile) => {
        this.appState.user.setUserProfile(userProfile);
      });
    }
  }

  linkNotificationToken(token) {
    const { dirty } = this.appState.notificationToken;
    console.log(dirty, token);
    if (dirty && token) {
      this.serviceExecutor
        .execute(LINK_PUSH_NOTIFICATION_TOKEN(token))
        .then(() => {
          this.appState.notificationToken.setNotificationTokenDirty(false);
        });
    }
  }
}
