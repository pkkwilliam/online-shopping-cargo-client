import React from "react";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ClientCard from "../common/clientCard";

export default function TutorialView(props) {
  return <AddressContainer />;
}

function AddressContainer() {
  return (
    <ClientCard header={<P style={{ fontWeight: "bold" }}>使用教程</P>}>
      <P>可使用淘寶的地址智能填寫功能</P>
      <div style={styles.addressContainer}>
        <P>收件人: 店號 用戶電話</P>
        <P>手機號碼: 15363530392</P>
        <P>广东省珠海市香洲区九洲大道中2123号</P>
      </div>
      <br />
      <P>范例</P>
      <div style={styles.addressContainer}>
        <P>收件人: 1130 63530392</P>
        <P>手機號碼: 15363530392</P>
        <P>广东省珠海市香洲区九洲大道中2123号</P>
      </div>
    </ClientCard>
  );
}

const styles = {
  addressContainer: {
    borderRadius: 8,
    boxShadow: styleSchema.shadowLight,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
  },
};
