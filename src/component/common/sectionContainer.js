import React from "react";
import Header from "../header/header";
import ChevronLeft from "react-bootstrap-icons/dist/icons/chevron-left";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import View from "online-shopping-cargo-parent/dist/view";
import BackgroundCard from "./backgroundCard";
import { withRouter } from "react-router-dom";
import ClientApplicationComponent from "../clientApplicationComponent";

const MARGIN_PADDING_SIZE = 15;

class SectionContainer extends ClientApplicationComponent {
  render() {
    const { children, hideBackground, hideCard, pageName } = this.props;
    return (
      <View style={{ height: "100%" }}>
        <Header>
          <View
            onClick={() => this.getBackButtonFunction(this.props.backButton)}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: 8,
              paddingTop: 8,
            }}
          >
            <BackIcon />
            <P
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                marginLeft: 5,
              }}
            >
              {pageName}
            </P>
          </View>
        </Header>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: hideBackground ? 0 : MARGIN_PADDING_SIZE,
            width: "100%",
          }}
        >
          <div style={{ height: "100%", paddingTop: 55 }}>
            <ChildrenSection hideCard={hideCard}>{children}</ChildrenSection>
          </div>
        </View>
      </View>
    );
  }

  getBackButtonFunction(backButton) {
    if (backButton?.action === "REPLACE") {
      return this.goToReplace(backButton.component);
    } else {
      return this.goBack();
    }
  }
}

function ChildrenSection({ children, hideCard }) {
  return (
    <>{hideCard ? children : <BackgroundCard>{children}</BackgroundCard>}</>
  );
}

function BackIcon() {
  return <ChevronLeft style={{ fontSize: 22 }} />;
}

export default withRouter(SectionContainer);
