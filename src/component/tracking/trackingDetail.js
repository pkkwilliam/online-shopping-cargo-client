import React, { Component } from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge";
import ParcelDisplayUtil from "online-shopping-cargo-parent/dist/parcelDisplayUtil";
import CaretDownFill from "react-bootstrap-icons/dist/icons/caret-down-fill";
import CaretUpFill from "react-bootstrap-icons/dist/icons/caret-up-fill";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

const Collapse = React.lazy(() => import("react-bootstrap/Collapse"));
const LineBreak = React.lazy(() =>
  import("online-shopping-cargo-parent/dist/lineBreak")
);
export default class TrackingDetail extends Component {
  render() {
    const { onClickShowDetail, showDetaiDisplayId, parcel } = this.props;
    const { displayId, originalTrackingNumber, parcelLocation, parcelStatus } =
      parcel;
    const parcelDisplayUtil = new ParcelDisplayUtil();
    // const location = parcelDisplayUtil.getParcelLocation(parcelLocation);
    const parcelStatusBageAndLabel =
      parcelDisplayUtil.getParcelStatusBageAndLabel(parcelStatus);
    const arrowColor = styleSchema.color.primaryMedium;
    return (
      <>
        <tr
          className="text-center"
          onClick={() => onClickShowDetail(displayId)}
        >
          <td style={styles.defaultText}>
            <Badge pill variant={parcelStatusBageAndLabel.badge}>
              {parcelStatusBageAndLabel.label}
            </Badge>
          </td>
          <td style={styles.defaultText}>{originalTrackingNumber}</td>
          <td>
            {showDetaiDisplayId === displayId ? (
              <CaretUpFill style={{ color: arrowColor }} />
            ) : (
              <CaretDownFill style={{ color: arrowColor }} />
            )}
          </td>
        </tr>
        <ExpandItem parcel={parcel} showDetaiDisplayId={showDetaiDisplayId} />
      </>
    );
  }
}

function CostSection({ cost, dayStored, storageCost }) {
  return (
    <SectionContainer header="費用">
      <Row>
        <Col>
          <P>{`存放: ${dayStored}日`}</P>
        </Col>
        <Col>
          <P>{`倉儲費: ${storageCost ? storageCost : 0}`}</P>
        </Col>
        <Col>
          <P>{`運費: ${cost}`}</P>
        </Col>
      </Row>
    </SectionContainer>
  );
}

function ExpandItem({ parcel, showDetaiDisplayId }) {
  const { displayId } = parcel;
  return (
    <tr>
      <td colSpan={100} style={{ padding: 0 }}>
        <Collapse in={displayId === showDetaiDisplayId}>
          <Container style={styles.collpaseContainer}>
            <TimeSection {...parcel} />
            <ParcelDetailSection {...parcel} />
            <ShopDetailSection {...parcel} />
            <CostSection {...parcel} />
          </Container>
        </Collapse>
      </td>
    </tr>
  );
}

function ParcelDetailSection({
  height,
  length,
  originalTrackingNumber,
  weight,
  width,
}) {
  return (
    <SectionContainer header="包裹詳細">
      <Row>
        <Col>
          <P>{`原單號: ${originalTrackingNumber}`}</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>{`長寛高總和: ${length + width + height}cm`}</P>
        </Col>
        <Col>
          <P>{`重量: ${weight}kg`}</P>
        </Col>
      </Row>
    </SectionContainer>
  );
}

function SectionContainer({ header, children }) {
  return (
    <div style={{ marginTop: 5 }}>
      <P style={{ fontWeight: "bold" }}>{header}</P>
      <LineBreak />
      {children}
    </div>
  );
}

function ShopDetailSection({ shop }) {
  const { openingHour, shopAddress, shopName, shopNumber, shopPhoneNumber } =
    shop;
  return (
    <SectionContainer header="門店資科">
      <Row>
        <Col>
          <P>{`店名: ${shopName} ${shopNumber}`}</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>{`地址: ${shopAddress}`}</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>{`電話: ${shopPhoneNumber}`}</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>{`營業時間: ${openingHour}`}</P>
        </Col>
      </Row>
    </SectionContainer>
  );
}

function TimeSection({ createTime, readyToPickupDate, updateTime }) {
  const ReadyToPickUp = readyToPickupDate ? (
    <Row>
      <Col>
        <P>{`到達門店: ${readyToPickupDate ? readyToPickupDate : "未到達"}`}</P>
      </Col>
    </Row>
  ) : null;
  return (
    <SectionContainer header="時間詳細">
      <Row>
        <Col>
          <P>{`入庫時間: ${createTime}`}</P>
        </Col>
      </Row>
      {ReadyToPickUp}
    </SectionContainer>
  );
}

const styles = {
  collpaseContainer: {
    padding: 5,
  },
};
