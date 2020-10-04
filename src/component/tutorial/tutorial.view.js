import React from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import H1 from "online-shopping-cargo-parent/dist/text/h1";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

export default function TutorialView(props) {
  return (
    <div>
      <H1>this is tutorial view</H1>
      <P>使用教程</P>
      <AddressContainer />
    </div>
  );
}

function AddressContainer() {
  return (
    <>
      <P>可使用淘寶的地址智能填寫功能</P>
      <div style={styles.addressContainer}>
        <P>收貨人: 潘嘉朞@63530392</P>
        <P>手機號碼: 15363530392</P>
        <P>所在地區: 廣東省珠海市香州區</P>
        <P>詳細地址: 問號路112</P>
      </div>
    </>
  );
}

const styles = {
  addressContainer: {
    boxShadow: styleSchema.shadow,
    boxRadius: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
  },
};
