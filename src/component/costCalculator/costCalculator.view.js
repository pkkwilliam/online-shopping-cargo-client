import React, { Component } from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import View from "online-shopping-cargo-parent/dist/view";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import ApplicationTextField from "../common/applicationTextField";

const COST_PER_UNIT = 2;
const DIVISOR = 6000;
const INITIAL_COST = 1;

export default class CostCalculatorView extends Component {
  state = {
    height: 0,
    length: 0,
    weight: 0,
    width: 0,
    calculatedVolumnWeight: 0,
  };

  render() {
    const { calculatedVolumnWeight, weight } = this.state;
    const highWeight =
      weight > calculatedVolumnWeight ? weight : calculatedVolumnWeight;
    return (
      <Container>
        <View>
          <Container style={{ padding: 0 }}>
            <this.DisclaimerContainer>
              {`*空間重量 = 長 x 寛 x 高 / ${DIVISOR}`}
            </this.DisclaimerContainer>
            <this.DisclaimerContainer>
              *所有包裹均享有3天免費存放
            </this.DisclaimerContainer>
          </Container>
        </View>
        <this.TextField placeholder="重量(KG)" target="weight" />
        <LineBreak />
        <this.TextField placeholder="長(CM)" target="length" />
        <LineBreak />
        <this.TextField placeholder="寬(CM)" target="width" />
        <LineBreak />
        <this.TextField placeholder="高(CM)" target="height" />
        <P>{`空間重量 = ${calculatedVolumnWeight} 重量: ${weight} 費用: ${
          INITIAL_COST + COST_PER_UNIT * highWeight
        }`}</P>
      </Container>
    );
  }

  roundupPointFive(value) {}

  onCalculateVolumnWeight(height, length, width) {
    return Math.ceil((height * length * width) / DIVISOR);
  }

  DisclaimerContainer = ({ children }) => {
    return (
      <Row style={{ display: "flex", justifyContent: "flex-end" }}>
        <P style={{ fontSize: 9, margin: 0 }}>{children}</P>
      </Row>
    );
  };

  TextField = ({ placeholder, target }) => {
    return (
      <Col style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ApplicationTextField
          placeholder={placeholder}
          onChange={(event) => {
            this.onChangeValue(target, event.target.value);
          }}
        />
      </Col>
    );
  };

  onChangeValue = (target, value) => {
    let { height, length, weight, width } = this.state;
    switch (target) {
      case "height":
        height = value;
        break;
      case "length":
        length = value;
        break;
      case "weight":
        weight = value;
        break;
      case "width":
        width = value;
        break;
      default:
        break;
    }
    this.setState({
      height,
      length,
      weight: Math.ceil(weight),
      width,
      calculatedVolumnWeight: this.onCalculateVolumnWeight(
        height,
        length,
        width
      ),
    });
  };
}
