import React, { Suspense } from "react";
import { styleSchema } from "./common/styleSchema";
import Header from "./component/header/header";
import FooterView from "./component/footer/footer.view";
import LandingPageView from "./component/landingPage/landingPage.view";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div style={styles.rootContainer}>
      <Suspense fallback={<div>loading...</div>}>
        <Header />
        <LandingPageView />
        <FooterView />
      </Suspense>
    </div>
  );
}

const styles = {
  rootContainer: {
    backgroundColor: styleSchema.color.backgroundColor,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "auto",
  },
};
