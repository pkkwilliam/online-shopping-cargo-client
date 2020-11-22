import React, { Component } from "react";
import TextButton from "online-shopping-cargo-parent/dist/text/textButton";
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
      carrierIdentifier,
      displayId,
      onClickShowDetail,
      parcelLocation,
      parcelStatus,
    } = this.props;
    const parcelDisplayUtil = new ParcelDisplayUtil();
    const itemLocation = `${parcelDisplayUtil.getParcelLocation(
      parcelLocation
    )} ${carrierIdentifier !== null ? carrierIdentifier : ""}`;
    const parcelStatusBageAndLabel = parcelDisplayUtil.getParcelStatusBageAndLabel(
      parcelStatus
    );
    return (
      <>
        <tr>
          <td style={styles.defaultText}>
            <Badge pill variant={parcelStatusBageAndLabel.badge}>
              {parcelStatusBageAndLabel.label}
            </Badge>
          </td>
          <td style={styles.defaultText}>
            {this.getTrackingNumber(displayId)}
          </td>
          <td style={styles.defaultText}>{itemLocation}</td>
          <td>
            <TextButton onClick={() => onClickShowDetail(displayId)}>
              詳細
            </TextButton>
          </td>
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
                  <P>{`單號: ${this.getTrackingNumber(displayId)}`}</P>
                </Col>
                <Col>
                  <P>{`原單尾號: ${this.getTrackingNumber(
                    originalTrackingNumber
                  )}`}</P>
                </Col>
              </Row>
              <Row>
                <Col>
                  <P>{`空間重量: ${volumeWeight}`}</P>
                </Col>
                <Col>
                  <P>{`重量: ${weight}`}</P>
                </Col>
              </Row>
              <Row>
                <Col>
                  <P>{`目的地: ${destination}`}</P>
                </Col>
                <Col>
                  <P>{`金額: ${cost}`}</P>
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

  getTrackingNumber(trackingNumber) {
    return trackingNumber.substring(trackingNumber.length - 4);
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
