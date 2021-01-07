import React, { Component } from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge";
import ParcelDisplayUtil from "online-shopping-cargo-parent/dist/parcelDisplayUtil";

const Collapse = React.lazy(() => import("react-bootstrap/Collapse"));
const LineBreak = React.lazy(() =>
  import("online-shopping-cargo-parent/dist/lineBreak")
);
export default class TrackingDetail extends Component {
  render() {
    const {
      displayId,
      onClickShowDetail,
      parcelLocation,
      parcelStatus,
    } = this.props;
    const parcelDisplayUtil = new ParcelDisplayUtil();
    const location = parcelDisplayUtil.getParcelLocation(parcelLocation);
    const parcelStatusBageAndLabel = parcelDisplayUtil.getParcelStatusBageAndLabel(
      parcelStatus
    );
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
          <td style={styles.defaultText}>{displayId}</td>
          <td style={styles.defaultText}>{location}</td>
        </tr>
        <this.ExpandItem {...this.props} />
      </>
    );
  }

  ExpandItem = ({ displayId, showDetaiDisplayId }) => {
    return (
      <tr>
        <td colSpan={100} style={{ padding: 0 }}>
          <Collapse in={displayId === showDetaiDisplayId}>
            <Container style={styles.collpaseContainer}>
              <this.TimeSection />
              <this.ParcelDetailSection />
              <this.ShopDetailSection />
              <this.CostSection />
            </Container>
          </Collapse>
        </td>
      </tr>
    );
  };

  CostSection = () => {
    const { cost, dayStored, storageCost } = this.props;
    return (
      <this.SectionContainer header="費用">
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
      </this.SectionContainer>
    );
  };

  ParcelDetailSection = () => {
    const { originalTrackingNumber, weight, volumeWeight } = this.props;
    return (
      <this.SectionContainer header="包裹詳細">
        <Row>
          <Col>
            <P>{`原單號: ${originalTrackingNumber}`}</P>
          </Col>
        </Row>
        <Row>
          <Col>
            <P>{`重量: ${weight} KG`}</P>
          </Col>
          <Col>
            <P>{`空間重量: ${volumeWeight} KG`}</P>
          </Col>
        </Row>
      </this.SectionContainer>
    );
  };

  ShopDetailSection = () => {
    const {
      openingHour,
      shopAddress,
      shopName,
      shopNumber,
      shopPhoneNumber,
    } = this.props.shop;
    return (
      <this.SectionContainer header="門店資科">
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
      </this.SectionContainer>
    );
  };

  SectionContainer = ({ header, children }) => {
    return (
      <div style={{ marginTop: 5 }}>
        <P style={{ fontWeight: "bold" }}>{header}</P>
        <LineBreak />
        {children}
      </div>
    );
  };

  TimeSection = () => {
    const { createTime, readyToPickupDate, updateTime } = this.props;
    const ReadyToPickUp = readyToPickupDate ? (
      <Row>
        <Col>
          <P>{`到達門店: ${
            readyToPickupDate ? readyToPickupDate : "未到達"
          }`}</P>
        </Col>
      </Row>
    ) : null;
    return (
      <this.SectionContainer header="時間詳細">
        <Row>
          <Col>
            <P>{`入庫時間: ${createTime}`}</P>
          </Col>
        </Row>
        <Row>
          <Col>
            <P>{`更新時間: ${
              updateTime !== null ? updateTime : createTime
            }`}</P>
          </Col>
        </Row>
        {ReadyToPickUp}
      </this.SectionContainer>
    );
  };

  getDate(dateResponse) {
    const date = new Date(dateResponse);
    return `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }
}

const styles = {
  collpaseContainer: {
    padding: 5,
  },
  defaultText: {
    fontSize: 12,
  },
  rootContainer: {},
};
