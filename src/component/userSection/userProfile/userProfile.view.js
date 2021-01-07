import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

export default function UserProfileView(props) {
  const { userProfile } = props;
  const { balance } = userProfile;
  return (
    <Container>
      <CashPointSection balance={balance} />
    </Container>
  );
}

function CashPointSection({ balance }) {
  return (
    <>
      <Row>
        <Col>
          <P>賬戶餘額</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P style={styles.cashPoint}>{`$${balance}`}</P>
        </Col>
      </Row>
    </>
  );
}

const styles = {
  cashPoint: {
    fontSize: 38,
    fontWeight: "900",
  },
};
