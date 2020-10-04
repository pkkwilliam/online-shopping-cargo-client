import React from "react";
import TutorialView from "../tutorial/tutorial.view";
import EyeCatch from "../eyeCatch/eyeCatch";
import H1 from "../../common/text/h1";
import P from "../../common/text/paragraph";
import UserSection from "../userSection/userSection";

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
        <ComingFunctionalities />
      </div>
    </div>
  );
}

function ComingFunctionalities() {
  return (
    <div>
      <H1>待開發功能:</H1>
      <P>淘寶代購</P>
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
