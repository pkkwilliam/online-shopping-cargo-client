import React, { Suspense, useState } from "react";
import View from "online-shopping-cargo-parent/dist/view";
import Spinner from "react-bootstrap/esm/Spinner";

import "bootstrap/dist/css/bootstrap.min.css";

const Accouncement = React.lazy(() =>
  import("./component/announcement/announcement")
);
const AddressGenerator = React.lazy(() =>
  import("./component/addressGenerator/addressGenerator")
);
const CostCalculator = React.lazy(() =>
  import("./component/costCalculator/costCalculator.view")
);
const LandingPage = React.lazy(() =>
  import("./component/landingPage/landingPage")
);
const SmsAuth = React.lazy(() =>
  import("online-shopping-cargo-parent/dist/smsAuth/smsAuth")
);
const Menu = React.lazy(() => import("./component/menu/menu"));
const PickupQRCode = React.lazy(() =>
  import("./component/pickupQRCode/pickupQRCode")
);
const SectionContainer = React.lazy(() =>
  import("./component/common/sectionContainer")
);
const ShopLandingPage = React.lazy(() =>
  import("./component/shopLandingPage/shopLandingPage")
);
const Tracking = React.lazy(() => import("./component/tracking/tracking"));
const UserProfile = React.lazy(() =>
  import("./component/userProfile/userProfile")
);
export default function App(props) {
  const [currentPage, setCurrentPage] = useState("");

  return (
    <div style={styles.rootContainer}>
      <Suspense fallback={<SuspenseLoading />}>
        <Content currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Suspense>
    </div>
  );
}

function Content({ currentPage, setCurrentPage }) {
  let content;
  switch (currentPage) {
    case "#addressGenerator":
      content = <AddressGenerator />;
      break;
    case "#costCalculator":
      content = <CostCalculator />;
      break;
    case "#login":
      content = <SmsAuth passwordLogin />;
      break;
    case "#myParcel":
      content = <Tracking />;
      break;
    case "#myPickupQRCode":
      content = <PickupQRCode />;
      break;
    case "#shopLandingPage":
      content = <ShopLandingPage />;
      break;
    case "#userProfile":
      content = <UserProfile />;
      break;
    default:
      return (
        <LandingPage>
          <div>
            <Menu onClickMenuItem={setCurrentPage} />
          </div>
          <div style={{ marginTop: 20 }}>
            <Accouncement />
          </div>
        </LandingPage>
      );
  }
  return (
    <SectionContainer onClickHeaderBackButton={() => setCurrentPage("")}>
      {content}
    </SectionContainer>
  );
}

function SuspenseLoading() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Spinner animation="border" variant="warning" />
    </View>
  );
}

const styles = {
  rootContainer: {
    backgroundColor: "#f3f3f3",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "auto",
  },
};
