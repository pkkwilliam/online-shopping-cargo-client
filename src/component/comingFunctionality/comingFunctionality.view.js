import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ClientCard from "../common/clientCard";
import Container from "react-bootstrap/esm/Container";

export default function ComingFunctionalityView(props) {
  return (
    <ClientCard header={<P>即將開放</P>}>
      <Container>
        <P>淘寶代購</P>
      </Container>
    </ClientCard>
  );
}
