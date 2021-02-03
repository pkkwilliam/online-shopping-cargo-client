import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Phone from "react-bootstrap-icons/dist/icons/phone";

export default function PhoneNumberDisplay(props) {
  const { countryCode, onClick, smsNumber } = props;
  return (
    <View
      onClick={() => onClick(countryCode, smsNumber)}
      style={{
        alignItems: "center",
        paddingBottom: 15,
        paddingTop: 15,
      }}
      {...props}
    >
      <Phone style={{ color: "#1FA254", fontSize: "1.1rem" }} />
      <P
        style={{ marginLeft: 5, fontSize: "1rem" }}
      >{`+${countryCode} ${smsNumber}`}</P>
    </View>
  );
}
