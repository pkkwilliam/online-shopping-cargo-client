import React from "react";
import EyeCatch from "../eyeCatch/eyeCatch";
import UserSection from "../userSection/userSection";
import TutorialView from "../tutorial/tutorial.view";
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
        <TutorialView />
      </div>
      <div style={styles.borderContainer}>
        <CostCalculatorView />
      </div>
      <div style={styles.borderContainer}>
        <ComingFunctionality />
      </div>
      <P style={styles.quoteText}>
        *
        新用戶免費僅限使用1130店號(PickTB自營取件站)和空間重量或重量不大於2公斤的包裹
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
  quoteText: {
    color: styleSchema.color.secondaryDark,
    fontSize: 8,
  },
};
