import React from "react";
import Card from "react-bootstrap/esm/Card";
import Nav from "react-bootstrap/esm/Nav";

const LOGIN = "#login";
const MY_PARCEL = "#myParcel";
const PICKUP_QR_CODE = "#myPickupQRCode";

const ClientModal = React.lazy(() => import("../clientModal"));
const PickupQRCode = React.lazy(() => import("./pickupQRCode/pickupQRCode"));
const SmsAuth = React.lazy(() =>
  import("online-shopping-cargo-parent/dist/smsAuth/smsAuth")
);
const Tracking = React.lazy(() => import("./tracking/tracking"));

export default function UserSectionView(props) {
  const {
    display,
    hasToken,
    modal,
    onCloseModal,
    serviceExecutor,
    showModal,
  } = props;
  let displayComponent;
  if (hasToken && display === PICKUP_QR_CODE) {
    displayComponent = <PickupQRCode showModal={showModal} />;
  } else if (hasToken || display === MY_PARCEL) {
    displayComponent = <Tracking showModal={showModal} />;
  } else {
    displayComponent = (
      <div style={styles.loginContainer}>
        <SmsAuth
          onSuceed={() => window.location.reload()}
          serviceExecutor={serviceExecutor}
        />
      </div>
    );
  }
  return (
    <>
      <ClientModal onClose={onCloseModal} {...modal} />
      <Container {...props}>{displayComponent}</Container>
    </>
  );
}

function Container({ children, display, hasToken, onClickSectionDirect }) {
  // this is weird thing from react bootstrap
  let page = hasToken ? "#myParcel" : "#login";
  page = display ? undefined : page;

  return (
    <Card>
      <Card.Header>
        <Nav variant="tabs" activeKey={page}>
          <LoginPageItem hasToken={hasToken} />
          <ParcelsPage
            hasToken={hasToken}
            onClickSectionDirect={onClickSectionDirect}
          />
          <QRCodePickupPage
            hasToken={hasToken}
            onClickSectionDirect={onClickSectionDirect}
          />
        </Nav>
      </Card.Header>
      <Card.Body style={styles.cardBody}>{children}</Card.Body>
    </Card>
  );
}

function ParcelsPage({ hasToken, onClickSectionDirect }) {
  return (
    <Nav.Item>
      <Nav.Link
        disabled={!hasToken}
        href={MY_PARCEL}
        onClick={() => onClickSectionDirect(MY_PARCEL)}
      >
        包裹
      </Nav.Link>
    </Nav.Item>
  );
}

function QRCodePickupPage({ hasToken, onClickSectionDirect, showModal }) {
  return (
    <Nav.Item>
      <Nav.Link
        disabled={!hasToken}
        href={PICKUP_QR_CODE}
        onClick={() => onClickSectionDirect(PICKUP_QR_CODE)}
      >
        提取碼
      </Nav.Link>
    </Nav.Item>
  );
}

function LoginPageItem({ hasToken }) {
  return !hasToken ? (
    <Nav.Item>
      <Nav.Link href={LOGIN} disabled={hasToken}>
        登入
      </Nav.Link>
    </Nav.Item>
  ) : null;
}

const styles = {
  cardBody: {
    padding: 0,
  },
  loginContainer: {
    padding: 10,
  },
};
