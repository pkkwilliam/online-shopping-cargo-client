import React, { Suspense } from "react";
import View from "online-shopping-cargo-parent/dist/view";
import Spinner from "react-bootstrap/esm/Spinner";
import ClientApplicationComponent from "./component/clientApplicationComponent";
import { LOGIN } from "./component/menu/menu";

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

export default class App extends ClientApplicationComponent {
  state = {
    ...this.state,
    currentPage: {
      backgroundColor: "",
      headerColor: "",
      label: "",
      url: "",
    },
    userToken: "",
  };

  componentDidMount() {
    const userToken = this.storage.getUserToken();
    this.setState({
      userToken,
    });
  }

  render() {
    const { currentPage, userToken } = this.state;
    return (
      <div style={styles.rootContainer}>
        <Suspense fallback={<SuspenseLoading />}>
          <Content
            currentPage={currentPage}
            userToken={userToken}
            setCurrentPage={this.setCurrentPage}
            serviceExecutor={this.serviceExecutor}
          />
        </Suspense>
      </div>
    );
  }

  setCurrentPage = (currentPage) => {
    this.setState({
      currentPage,
    });
  };
}

// TODO clean this ASAP!!!
function Content({ currentPage, userToken, setCurrentPage, serviceExecutor }) {
  let content;
  switch (currentPage.url) {
    case "#addressGenerator":
      content = <AddressGenerator />;
      break;
    case "#costCalculator":
      content = <CostCalculator />;
      break;
    case "#login":
      content = <SmsAuthContent serviceExecutor={serviceExecutor} />;
      break;
    case "#myParcel":
      content = checkPermission(userToken, serviceExecutor, <Tracking />);
      break;
    case "#myPickupQRCode":
      content = checkPermission(userToken, serviceExecutor, <PickupQRCode />);
      break;
    case "#shopLandingPage":
      content = <ShopLandingPage />;
      break;
    case "#userProfile":
      content = checkPermission(userToken, serviceExecutor, <UserProfile />);
      break;
    default:
      return (
        <LandingPageContent
          setCurrentPage={setCurrentPage}
          userToken={userToken}
        />
      );
  }
  return (
    <SectionContainer
      currentPage={currentPage}
      onClickHeaderBackButton={() => setCurrentPage({})}
    >
      {content}
    </SectionContainer>
  );
}

function checkPermission(userToken, serviceExecutor, page) {
  return userToken ? (
    page
  ) : (
    <SmsAuthContent serviceExecutor={serviceExecutor} />
  );
}

function LandingPageContent({ setCurrentPage, userToken }) {
  return (
    <LandingPage>
      <div>
        <Menu userToken={userToken} onClickMenuItem={setCurrentPage} />
      </div>
      <div style={{ marginTop: 20 }}>
        <Accouncement />
      </div>
    </LandingPage>
  );
}

function SmsAuthContent({ serviceExecutor }) {
  return (
    <SmsAuth
      passwordLogin
      onSuceed={() => window.location.reload()}
      serviceExecutor={serviceExecutor}
    />
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
