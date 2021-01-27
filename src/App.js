import React, { Suspense } from "react";
import View from "online-shopping-cargo-parent/dist/view";
import Spinner from "react-bootstrap/esm/Spinner";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Routes from "./routes";

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
        minHeight: "100vh",
        overflow: "auto",
      }}
    >
      <Suspense fallback={<SuspenseLoading />}>
        <Router>
          <div>
            <Switch>{getRoutes()}</Switch>
          </div>
        </Router>
      </Suspense>
    </div>
  );
}

function getRoutes() {
  return Routes.map((item) => {
    const { component, hideCard, label, sectionContainer, url } = item;
    return (
      <Route path={url}>
        {sectionContainer ? (
          <SectionContainer hideCard={hideCard} pageName={label}>
            {component}
          </SectionContainer>
        ) : (
          <>{component}</>
        )}
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
