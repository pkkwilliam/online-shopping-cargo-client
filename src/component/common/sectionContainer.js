import React from "react";
import Header from "../header/header";
import { ChevronLeft } from "react-bootstrap-icons";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import View from "online-shopping-cargo-parent/dist/view";

export default function SectionContainer(props) {
  const { children, currentPage, onClickHeaderBackButton } = props;
  const { backgroundColor, label } = currentPage;
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
        {children}
      </View>
    </>
  );
}

function BackIcon({ onClickHeaderBackButton }) {
  return (
    <div onClick={onClickHeaderBackButton} style={{ padding: 8 }}>
      <ChevronLeft />
    </div>
  );
}
