import React from "react";
import Header from "../header/header";
import { ChevronLeft } from "react-bootstrap-icons";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import View from "online-shopping-cargo-parent/dist/view";
import BackgroundCard from "./backgroundCard";

const MARGIN_PADDING_SIZE = 15;

export default function SectionContainer(props) {
  const { children, hideCard, pageName } = props;
  return (
    <>
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
          // background: backgroundColor,
          flex: 1,
          flexDirection: "column",
          padding: MARGIN_PADDING_SIZE,
          paddingTop: 50,
          width: "100%",
        }}
      >
        <ChildrenSection hideCard={hideCard}>{children}</ChildrenSection>
      </View>
    </>
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
