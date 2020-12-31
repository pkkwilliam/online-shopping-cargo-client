import React from "react";
import EyeCatch from "../eyeCatch/eyeCatch";
import UserSection from "../userSection/userSection";
import AddressGenerator from "../addressGenerator/addressGenerator";
import ComingFunctionality from "../comingFunctionality/comingFunctionality.view";
import CostCalculatorView from "../costCalculator/costCalculator.view";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

export default function LandingPage(props) {
  return (
    <div style={styles.rootContainer}>
      <div style={styles.eyeCatchContainer}>
        <EyeCatch />
      </div>
      <div style={styles.borderContainer}>
        <UserSection />
      </div>
      <div style={styles.borderContainer}>
        <AddressGenerator />
      </div>
      <div style={styles.borderContainer}>
        <CostCalculatorView />
      </div>
      <div style={styles.borderContainer}>
        <ComingFunctionality />
      </div>
      <P style={styles.disclaimerText}>
        *
        小部分代收點因店租成本過高，無法提供免費試用，請提前諮詢該點是否提供新用戶免費代收
      </P>
      <P style={styles.disclaimerText}>
        * 新用戶免費限空間重量或重量不大於2公斤的包裹
      </P>
    </div>
  );
}

const styles = {
  borderContainer: {
    borderTop: "1px solid white",
    paddingTop: 10,
  },
  eyeCatchContainer: {
    paddingBottom: 10,
  },
  rootContainer: {},
  disclaimerText: {
    color: styleSchema.color.secondaryDark,
    fontSize: 8,
  },
};
