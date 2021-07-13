import React from "react";
import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";
import { SHIP_TO_HOME, STORE_PICKUP } from "./tutorial/tutorial";

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
        <Tab eventKey={STORE_PICKUP} title="門店自提">
          {storePickupComponent}
        </Tab>
        <Tab eventKey={SHIP_TO_HOME} title="送貨上門">
          {shipToHomeComponent}
        </Tab>
      </Tabs>
    </div>
  );
}
