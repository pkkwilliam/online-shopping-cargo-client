import React, { Suspense } from "react";
import View from "online-shopping-cargo-parent/dist/view";
import Spinner from "react-bootstrap/esm/Spinner";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Routes from "./routes";
import { Provider } from "./context/provider";
import "bootstrap/dist/css/bootstrap.min.css";

const SectionContainer = React.lazy(() =>
  import("./component/common/sectionContainer")
);
export default function App(props) {
  return (
    <div
      style={{
        backgroundColor: "#f3f3f3",
        display: "flex",
        flexDirection: "column",
        minHeight: "-webkit-fill-available",
        overflow: "auto",
      }}
    >
      <Provider>
        <Suspense fallback={<SuspenseLoading />}>
          <Router>
            <Switch>{getRoutes()}</Switch>
          </Router>
        </Suspense>
      </Provider>
    </div>
  );
}

function getRoutes() {
  return Routes.map((item) => {
    const { backgroundColor, component, label, sectionContainer, url } = item;
    return (
      <Route path={url}>
        <div
          style={{
            backgroundColor: backgroundColor ? backgroundColor : "#f3f3f3",
          }}
        >
          {sectionContainer ? (
            <SectionContainer pageName={label} {...item}>
              {component}
            </SectionContainer>
          ) : (
            <>{component}</>
          )}
        </div>
      </Route>
    );
  });
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
