import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ClientCard from "../common/clientCard";

export default function ComingFunctionalityView(props) {
  return (
    <ClientCard header={<P style={{ fontWeight: "bold" }}>即將開放</P>}>
      <P>淘寶代購</P>
    </ClientCard>
  );
}
