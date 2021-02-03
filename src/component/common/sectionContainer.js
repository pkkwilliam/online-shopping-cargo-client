import React from "react";
import Header from "../header/header";
import ChevronLeft from "react-bootstrap-icons/dist/icons/chevron-left";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import View from "online-shopping-cargo-parent/dist/view";
import BackgroundCard from "./backgroundCard";

const MARGIN_PADDING_SIZE = 15;

export default function SectionContainer(props) {
  const { children, hideBackground, hideCard, pageName } = props;
  return (
    <View style={{ minHeight: "-webkit-fill-available" }}>
      <Header>
        <View
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
        <div style={{ paddingTop: 40 }}>
          <ChildrenSection hideCard={hideCard}>{children}</ChildrenSection>
        </div>
      </View>
    </View>
  );
}

function ChildrenSection({ children, hideCard }) {
  return (
    <div style={{ marginTop: 3 }}>
      {hideCard ? (
        children
      ) : (
        <BackgroundCard style={{ marginTop: MARGIN_PADDING_SIZE }}>
          {children}
        </BackgroundCard>
      )}
    </div>
  );
}

function BackIcon() {
  return (
    <ChevronLeft
      onClick={() => window.history.back()}
      style={{ fontSize: 22 }}
    />
  );
}
