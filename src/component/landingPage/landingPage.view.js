import React from "react";
import EyeCatch from "../eyeCatch/eyeCatch";
import UserSection from "../userSection/userSection";
import TutorialView from "../tutorial/tutorial.view";
import ComingFunctionality from "../comingFunctionality/comingFunctionality.view";
import CostCalculatorView from "../costCalculator/costCalculator.view";

export default function LandingPageView(props) {
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
  rootContainer: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 74,
  },
};
