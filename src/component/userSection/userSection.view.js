import React from "react";
import Card from "react-bootstrap/esm/Card";
import Nav from "react-bootstrap/esm/Nav";

const MY_PACKAGE = "MY_PACKAGE";
const PICKUP_QR_CODE = "PICKUP_QR_CODE";

const Tracking = React.lazy(() => import("./tracking/tracking"));
const PickupQRCode = React.lazy(() => import("./pickupQRCode/pickupQRCode"));
const SmsAuth = React.lazy(() => import("../../common/smsAuth/smsAuth"));

export default function UserSectionView(props) {
  const { display, hasToken } = props;
  let displayComponent;
  if (hasToken && display === PICKUP_QR_CODE) {
    displayComponent = <PickupQRCode />;
  } else if (hasToken || display === MY_PACKAGE) {
    displayComponent = <Tracking />;
  } else {
    displayComponent = (
      <div style={styles.loginContainer}>
        <SmsAuth />
      </div>
    );
  }
  return <Container {...props}>{displayComponent}</Container>;
}

function Container(props) {
  const { hasToken, onClickSectionDirect } = props;
  return (
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#login" disabled={hasToken}>
              登入
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              disabled={!hasToken}
              href="#myParcel"
              onClick={() => onClickSectionDirect(MY_PACKAGE)}
            >
              包裹
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              disabled={!hasToken}
              href="#myPickupQRCode"
              onClick={() => onClickSectionDirect(PICKUP_QR_CODE)}
            >
              提取碼
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body style={{ padding: 0 }}>{props.children}</Card.Body>
    </Card>
  );
}

const styles = {
  loginContainer: {
    padding: 5,
  },
};
