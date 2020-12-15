import React from "react";
import Card from "react-bootstrap/esm/Card";
import Nav from "react-bootstrap/esm/Nav";
import ApplicationCompoentnView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import ClientCard from "../common/clientCard";

const LOGIN = "#login";
const MY_PARCEL = "#myParcel";
const PICKUP_QR_CODE = "#myPickupQRCode";

const PickupQRCode = React.lazy(() => import("./pickupQRCode/pickupQRCode"));
const SmsAuth = React.lazy(() =>
  import("online-shopping-cargo-parent/dist/smsAuth/smsAuth")
);
const Tracking = React.lazy(() => import("./tracking/tracking"));
export default class UserSectionView extends ApplicationCompoentnView {
  render() {
    const {
      display,
      hasToken,
      onCloseModal,
      serviceExecutor,
      showModal,
    } = this.props;
    let displayComponent;
    if (hasToken && display === PICKUP_QR_CODE) {
      displayComponent = (
        <PickupQRCode showModal={showModal} onCloseModal={onCloseModal} />
      );
    } else if (hasToken || display === MY_PARCEL) {
      displayComponent = (
        <Tracking showModal={showModal} onCloseModal={onCloseModal} />
      );
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
      <this.Wrapper>
        <this.Container {...this.props}>{displayComponent}</this.Container>
      </this.Wrapper>
    );
  }
  Container = ({ children, display, hasToken, onClickSectionDirect }) => {
    // this is weird thing from react bootstrap
    let page = hasToken ? "#myParcel" : "#login";
    page = display ? undefined : page;

    const HEADER_NAV = (
      <Nav fill justify variant="tabs" activeKey={page}>
        <this.LoginPageItem hasToken={hasToken} />
        <this.ParcelsPage
          hasToken={hasToken}
          onClickSectionDirect={onClickSectionDirect}
        />
        <this.QRCodePickupPage
          hasToken={hasToken}
          onClickSectionDirect={onClickSectionDirect}
        />
      </Nav>
    );

    return (
      <ClientCard header={HEADER_NAV}>
        <Card.Body style={styles.cardBody}>{children}</Card.Body>
      </ClientCard>
    );
  };

  ParcelsPage({ hasToken, onClickSectionDirect }) {
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

  QRCodePickupPage({ hasToken, onClickSectionDirect }) {
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

  LoginPageItem({ hasToken }) {
    return !hasToken ? (
      <Nav.Item>
        <Nav.Link href={LOGIN} disabled={hasToken}>
          登入
        </Nav.Link>
      </Nav.Item>
    ) : null;
  }
}

const styles = {
  cardBody: { padding: 10 },
};
