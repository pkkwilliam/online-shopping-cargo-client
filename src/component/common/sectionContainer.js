import React from "react";
import Header from "../header/header";
import { ChevronLeft } from "react-bootstrap-icons";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import View from "online-shopping-cargo-parent/dist/view";

export default function SectionContainer(props) {
  const { children, title, onClickHeaderBackButton } = props;
  return (
    <>
      <Header>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <BackIcon onClickHeaderBackButton={onClickHeaderBackButton} />
          <P style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {title}
          </P>
        </View>
      </Header>
      <div style={{ padding: 10, paddingTop: 74 }}>{children}</div>
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
