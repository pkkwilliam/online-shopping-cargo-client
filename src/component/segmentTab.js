import React from "react";
import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";
import { SHIP_TO_HOME_TAB, STORE_PICKUP_TAB } from "./tutorial/tutorial";

export default function SegmentTab(props) {
  let { displayTab, shipToHomeComponent, storePickupComponent } = props;

  return (
    <div>
      <Tabs
        defaultActiveKey={displayTab}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Tab eventKey={STORE_PICKUP_TAB} title="門店自提">
          {storePickupComponent}
        </Tab>
        <Tab eventKey={SHIP_TO_HOME_TAB} title="送貨上門">
          {shipToHomeComponent}
        </Tab>
      </Tabs>
    </div>
  );
}
