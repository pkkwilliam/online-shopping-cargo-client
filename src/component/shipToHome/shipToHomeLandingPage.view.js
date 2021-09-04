import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/functionalApplicationComponent.view";
import BackgroundCard from "../common/backgroundCard";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import { ChevronRight, Gear } from "react-bootstrap-icons";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import {
  ADDRESS,
  CALCULATOR,
  SHIP_TO_HOME_ORDER,
  TUTORIAL,
} from "../../routes";
import ApplicationTextButton from "online-shopping-cargo-parent/dist/applicationTextButton";
import Info from "../text/info";
import { getShipToHomeParcels } from "./shipToHome";

export default function ShipToHomeLandingView(props) {
  return (
    <ApplicationComponentView {...props}>
      <View
        style={{
          flexDirection: "column",
          height: "inherit",
        }}
      >
        <View style={{ justifyContent: "space-around" }}>
          <EstimateCost {...props} />
          <View style={{ marginLeft: 15 }} />
          <Tutorial {...props} />
        </View>
        <View style={{ marginTop: 15 }}>
          <ManageAddress {...props} />
        </View>
        <View style={{ marginTop: 15 }}>
          <ShipToHomeOrders {...props} />
        </View>
        <View style={{ marginTop: 15 }}>
          <CreateNewShipToHomeOrder {...props} />
        </View>
      </View>
    </ApplicationComponentView>
  );
}

function CardIconButton({ backgroundColor = "#FFFFFF", icon, onClick, text }) {
  console.log(backgroundColor);
  return (
    <BackgroundCard
      onClick={onClick}
      style={{
        alignItems: "center",
        backgroundColor: backgroundColor,
        display: "flex",
      }}
    >
      {icon}
      <P style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>{text}</P>
    </BackgroundCard>
  );
}

function CreateNewShipToHomeOrder({ onClickCreateShipToHome, parcels }) {
  const waitingToCombineParcels = getShipToHomeParcels(parcels);
  return (
    <BackgroundCard
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View>
          <Gear style={{ fontSize: 22 }} />
          <P style={{ marginLeft: 8 }}>待處理包裹</P>
        </View>
        <View>
          <Info
            style={{ color: styleSchema.color.secondaryDark }}
          >{`x${waitingToCombineParcels.length}`}</Info>
        </View>
      </View>
      <View
        style={{
          marginBottom: 15,
          marginTop: 15,
          width: "100%",
        }}
      >
        <LineBreak />
      </View>
      <View
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ApplicationTextButton
          onClick={onClickCreateShipToHome}
          disabled={waitingToCombineParcels.length === 0}
        >
          合併包裹
        </ApplicationTextButton>
        <ChevronRight
          style={{ color: styleSchema.color.secondaryDark, fontSize: 18 }}
        />
      </View>
    </BackgroundCard>
  );
}

function EstimateCost({ onClickEstimateCost }) {
  return (
    <CardIconButton
      icon={CALCULATOR.icon}
      onClick={onClickEstimateCost}
      text={CALCULATOR.label}
    />
  );
}

function ManageAddress({ onClickManageAddress }) {
  return (
    <CardIconButton
      icon={ADDRESS.icon}
      onClick={onClickManageAddress}
      text={`管理${ADDRESS.label}`}
    />
  );
}

function ShipToHomeOrders({ onClickShipToHomeOrder, shipToHomeOrders }) {
  const activeShipToHomeOrders = shipToHomeOrders.filter(
    (order) => order.active
  );
  return (
    <BackgroundCard
      onClick={onClickShipToHomeOrder}
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {SHIP_TO_HOME_ORDER.icon}
        <P style={{ marginLeft: 8 }}>{SHIP_TO_HOME_ORDER.label}</P>
      </View>
      <View>
        <Info
          style={{ color: styleSchema.color.secondaryDark }}
        >{`未完成: ${activeShipToHomeOrders.length}`}</Info>
      </View>
    </BackgroundCard>
  );
}

function Tutorial({ onClickTutorial }) {
  return (
    <CardIconButton
      backgroundColor="rgb(177, 204, 52, 0.8)"
      icon={TUTORIAL.icon}
      onClick={onClickTutorial}
      text={TUTORIAL.label}
    />
  );
}
