import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";
import ShipToHomeLandingPageView from "./shipToHomeLandingPage.view";
import {
  ADDRESS,
  CALCULATOR,
  SHIP_TO_HOME,
  SHIP_TO_HOME_ORDER,
  TUTORIAL,
} from "../../routes";

class ShipToHomeLandingPage extends UserProfileComponent {
  state = {
    ...this.state,
  };

  componentDidMount() {
    super.componentDidMount();
    this.appStateService.getParcels();
    this.appStateService.getShipToHomeOrders();
  }

  render() {
    const { parcel, shipToHome } = this.appState;
    return (
      <ShipToHomeLandingPageView
        parcels={parcel.parcels}
        shipToHomeOrders={shipToHome.shipToHomeOrders}
        onClickCreateShipToHome={this.onClickCreateShipToHome}
        onClickEstimateCost={this.onClickEstimateCost}
        onClickManageAddress={this.onClickManageAddress}
        onClickShipToHomeOrder={this.onClickShipToHomeOrder}
        onClickTutorial={this.onClickTutorial}
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        {...this.state}
      />
    );
  }

  onClickCreateShipToHome = () => {
    this.goTo(SHIP_TO_HOME);
  };

  onClickEstimateCost = () => {
    this.goTo(CALCULATOR);
  };

  onClickManageAddress = () => {
    this.goTo(ADDRESS);
  };

  onClickShipToHomeOrder = () => {
    this.goTo(SHIP_TO_HOME_ORDER);
  };

  onClickTutorial = () => {
    this.goTo(TUTORIAL, { displayTab: SHIP_TO_HOME });
  };
}

export default withRouter(ShipToHomeLandingPage);
