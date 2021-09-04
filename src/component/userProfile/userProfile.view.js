import React from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ListMenu from "../common/listMenu";
import BackgroundCard from "../common/backgroundCard";
import { ADDRESS, CHANGE_PASSWORD, THIRD_PERSON } from "../../routes";
import ApplicationTextButton from "online-shopping-cargo-parent/dist/applicationTextButton";
import View from "online-shopping-cargo-parent/dist/view";

export default function UserProfileView(props) {
  const { userProfile } = props;
  const { balance } = userProfile;
  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "column" }}>
        <CashPointSection balance={balance ?? 0} />
        <UsernameSection {...userProfile} />
        <ListMenuSection />
      </View>
      <View>
        <LogoutSection {...props} />
      </View>
    </View>
  );
}

function CashPointSection({ balance }) {
  return (
    <BackgroundCard>
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
      items={[ADDRESS, THIRD_PERSON, CHANGE_PASSWORD]}
      style={{ marginTop: 15 }}
    />
  );
}

function LogoutSection({ onClickLogout }) {
  return (
    <ApplicationTextButton block onClick={onClickLogout} style={{ margin: 50 }}>
      登出
    </ApplicationTextButton>
  );
}

export function UsernameSection({
  countryCode,
  smsNumber,
  username,
  zyId,
  preferredShop,
}) {
  return (
    <BackgroundCard style={{ marginTop: 15 }}>
      <Row>
        <Col>
          <P>
            登入用戶: {username && username.length < 20 ? username : smsNumber}
          </P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>使用區域: {countryCode === "853" ? "澳門" : "中國"}</P>
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
