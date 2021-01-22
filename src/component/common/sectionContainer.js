import React from "react";
import Header from "../header/header";
import { ChevronLeft } from "react-bootstrap-icons";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import View from "online-shopping-cargo-parent/dist/view";
import BackgroundCard from "./backgroundCard";

export default function SectionContainer(props) {
  const { children, currentPage, onClickHeaderBackButton } = props;
  const { backgroundColor, hideCard, label } = currentPage;
  return (
    <>
      <Header>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BackIcon onClickHeaderBackButton={onClickHeaderBackButton} />
          <P style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {label}
          </P>
        </View>
      </Header>
      <View
        style={{
          background: backgroundColor,
          flex: 1,
          flexDirection: "column",
          padding: 10,
          paddingTop: 60,
          width: "100%",
        }}
      >
        <ChildrenSection hideCard={hideCard}>{children}</ChildrenSection>
      </View>
    </>
  );
}

function ChildrenSection({ children, hideCard }) {
  if (hideCard) {
    return children;
  } else {
    return <BackgroundCard>{children}</BackgroundCard>;
  }
}

function BackIcon({ onClickHeaderBackButton }) {
  return (
    <div onClick={onClickHeaderBackButton} style={{ padding: 8 }}>
      <ChevronLeft />
    </div>
  );
}
