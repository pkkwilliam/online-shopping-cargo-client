import React, { Suspense, useState } from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import Header from "./component/header/header";
import FooterView from "./component/footer/footer.view";
import LandingPage from "./component/landingPage/landingPage";

import "bootstrap/dist/css/bootstrap.min.css";

const ShopLandingPage = React.lazy(() =>
  import("./component/shopLandingPage/shopLandingPage")
);

export default function App(props) {
  const [consumerLandingPage, setConsumerLandingPage] = useState(true);
  const DisplayLandingPage = consumerLandingPage ? (
    <LandingPage />
  ) : (
    <ShopLandingPage />
  );

  return (
    <div style={styles.rootContainer}>
      <Suspense fallback={<div>loading page...</div>}>
        <Header
          onClickSwitchLandingPage={() =>
            setConsumerLandingPage(!consumerLandingPage)
          }
          switchLandingPageText={consumerLandingPage ? "商戶加入" : "查找包裹"}
        />
        <div style={styles.landingPageContentContainer}>
          {DisplayLandingPage}
        </div>
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
  landingPageContentContainer: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    paddingTop: 74,
  },
};
