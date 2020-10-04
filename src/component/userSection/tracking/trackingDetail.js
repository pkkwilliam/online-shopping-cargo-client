import React, { Component } from "react";
import TextButton from "online-shopping-cargo-parent/dist/text/textButton";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const Collapse = React.lazy(() => import("react-bootstrap/Collapse"));

export default class TrackingDetail extends Component {
  state = {
    show: false,
  };

  render() {
    const {
      carrierIdentifier,
      displayId,
      parcelLocation,
      parcelStatus,
    } = this.props;
    const itemLocation = `${this.getParcelLocation(parcelLocation)} ${
      carrierIdentifier !== null ? carrierIdentifier : ""
    }`;
    return (
      <>
        <tr>
          <td style={styles.defaultText}>
            {this.getParcelStatus(parcelStatus)}
          </td>
          <td style={styles.defaultText}>
            {this.getTrackingNumber(displayId)}
          </td>
          <td style={styles.defaultText}>{itemLocation}</td>
          <td>
            <TextButton
              onClick={() =>
                this.setState((state) => ({
                  show: !state.show,
                }))
              }
            >
              詳細
            </TextButton>
          </td>
        </tr>
        <this.ExpandItem {...this.props} />
      </>
    );
  }

  ExpandItem = ({
    carrierIdentifier,
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
    weight,
    width,
    volumeWeight,
  }) => {
    return (
      <tr>
        <td colSpan={100} style={{ padding: 0 }}>
          <Collapse in={this.state.show}>
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

  getParcelLocation(parcelLocation) {
    switch (parcelLocation) {
      case "MOBILE_DELIVERY_VEHICLE":
        return "移動提貨車";
      case "WAREHOUSE":
        return "倉庫";
      default:
        return "";
    }
  }

  getParcelStatus(parcelStatus) {
    switch (parcelStatus) {
      case "EXCEPTION":
        return "請電客服";
      case "DELIVERED":
        return "送達";
      case "IN_TRANSIT":
        return "運輸中";
      case "READY_TO_PICKUP":
        return "可提";
      case "PICKED_UP":
        return "已提";
      default:
        return "";
    }
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
