import React, { Component } from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Badge from "react-bootstrap/esm/Badge";
import ParcelDisplayUtil from "online-shopping-cargo-parent/dist/parcelDisplayUtil";

const Collapse = React.lazy(() => import("react-bootstrap/Collapse"));

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

  ExpandItem = ({
    cost,
    createTime,
    updateTime,
    destination,
    displayId,
    originalTrackingNumber,
    height,
    length,
    parcelLocation,
    parcelStatus,
    shop,
    showDetaiDisplayId,
    weight,
    width,
    volumeWeight,
  }) => {
    return (
      <tr>
        <td colSpan={100} style={{ padding: 0 }}>
          <Collapse in={displayId === showDetaiDisplayId}>
            <Container style={styles.collpaseContainer}>
              <Row>
                <Col>
                  <P>{`入庫時間: ${this.getDate(createTime)}`}</P>
                </Col>
              </Row>
              <Row>
                <Col>
                  <P>{`更新時間: ${this.getDate(
                    updateTime !== null ? updateTime : createTime
                  )}`}</P>
                </Col>
              </Row>
              <Row>
                <Col>
                  <P>{`原單號: ${originalTrackingNumber}`}</P>
                </Col>
              </Row>
              <Row>
                <Col>
                  <P>{`店名: ${shop.shopName} ${shop.shopNumber}`}</P>
                </Col>
              </Row>
              <Row>
                <Col>
                  <P>{`地址: ${shop.shopAddress}`}</P>
                </Col>
              </Row>
              <Row>
                <Col>
                  <P>{`電話: ${shop.shopPhoneNumber}`}</P>
                </Col>
              </Row>
              <Row>
                <Col>
                  <P>{`營業時間: ${shop.openingHour}`}</P>
                </Col>
              </Row>
              <Row>
                <Col>
                  <P>{`重量: ${weight}`}</P>
                </Col>
                <Col>
                  <P>{`空間重量: ${volumeWeight}`}</P>
                </Col>
              </Row>
              <Row>
                <Col>
                  <P>{`運費: ${cost}`}</P>
                </Col>
              </Row>
            </Container>
          </Collapse>
        </td>
      </tr>
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
