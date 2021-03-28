import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ListMenu from "../common/listMenu";
import BackgroundCard from "../common/backgroundCard";
import { CHANGE_PASSWORD, THIRD_PERSON } from "../../routes";

export default function UserProfileView(props) {
  const { userProfile } = props;
  const { balance } = userProfile;
  return (
    <>
      <CashPointSection balance={balance ?? 0} />
      <UsernameSection {...userProfile} />
      <ListMenuSection />
    </>
  );
}

function CashPointSection({ balance }) {
  return (
    <BackgroundCard style={{ marginTop: 15 }}>
      <Row>
        <Col>
          <P>賬戶餘額</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P style={styles.cashPoint}>{`$${balance.toFixed(2)}`}</P>
        </Col>
      </Row>
    </BackgroundCard>
  );
}

function ListMenuSection() {
  return (
    <ListMenu
      items={[THIRD_PERSON, CHANGE_PASSWORD]}
      style={{ marginTop: 15 }}
    />
  );
}

export function UsernameSection({ countryCode, smsNumber, zyId }) {
  return (
    <BackgroundCard style={{ marginTop: 15 }}>
      <Row>
        <Col>
          <P>
            手機號: {countryCode} {smsNumber}
          </P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>用戶名: {zyId}</P>
        </Col>
      </Row>
    </BackgroundCard>
  );
}

const styles = {
  cashPoint: {
    fontSize: 38,
    fontWeight: "900",
  },
};
