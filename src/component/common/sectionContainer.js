import React from "react";
import Header from "../header/header";

export default function SectionContainer(props) {
  const { children, onClickHeaderBackButton } = props;
  return (
    <>
      <Header>
        <p onClick={onClickHeaderBackButton}>返回</p>
      </Header>
      <div style={{ padding: 10, paddingTop: 74 }}>{children}</div>
    </>
  );
}
