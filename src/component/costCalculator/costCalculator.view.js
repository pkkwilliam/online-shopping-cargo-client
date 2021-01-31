import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import View from "online-shopping-cargo-parent/dist/view";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import ApplicationTextField from "../common/applicationTextField";
import ClientApplicationComponent from "../clientApplicationComponent";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import { GET_PARCEL_ESTIMATE_COST } from "online-shopping-cargo-parent/dist/service";
export default class CostCalculatorView extends ClientApplicationComponent {
  state = {
    dirty: true,
    height: 0,
    length: 0,
    parcelResponse: undefined,
    weight: 0,
    width: 0,
  };

  render() {
    return (
      <Container>
        <View>
          <Container style={{ padding: 0 }}>
            <DisclaimerContainer>
              *所有包裹均享有72小時免費存放
            </DisclaimerContainer>
          </Container>
        </View>

        <TextField
          onChangeValue={this.onChangeValue}
          placeholder="重量(KG)"
          target="weight"
        />
        <LineBreak />
        <TextField
          onChangeValue={this.onChangeValue}
          placeholder="長(CM)"
          target="length"
        />
        <LineBreak />
        <TextField
          onChangeValue={this.onChangeValue}
          placeholder="寬(CM)"
          target="width"
        />
        <LineBreak />
        <TextField
          onChangeValue={this.onChangeValue}
          placeholder="高(CM)"
          target="height"
        />
        <SubmitButton onClick={this.onClickEsimateParcelCost}>
          計算
        </SubmitButton>
        <View style={{ justifyContent: "center", marginTop: 15 }}>
          <EsimateCostResult parcelResponse={this.state.parcelResponse} />
        </View>
      </Container>
    );
  }

  onClickEsimateParcelCost = () => {
    const { dirty, weight } = this.state;
    if (!dirty) {
      return;
    }
    if (!weight || weight === 0) {
      alert("請輸入重量");
    } else {
      this.serviceExecutor
        .execute(GET_PARCEL_ESTIMATE_COST(this.state))
        .then((parcelResponse) =>
          this.setState({ dirty: false, parcelResponse })
        );
    }
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
      dirty: true,
      height,
      length,
      weight,
      width,
      parcelResponse: undefined,
    });
  };
}

function DisclaimerContainer({ children }) {
  return (
    <Row style={{ display: "flex", justifyContent: "flex-end" }}>
      <P style={{ fontSize: 12, margin: 0 }}>{children}</P>
    </Row>
  );
}

function EsimateCostResult({ parcelResponse }) {
  if (parcelResponse) {
    return <h6>費用: ${parcelResponse.cost}</h6>;
  } else {
    return null;
  }
}

function SubmitButton({ children, onClick }) {
  return (
    <ApplicationButton block onClick={onClick} style={{ marginTop: 10 }}>
      {children}
    </ApplicationButton>
  );
}

function TextField({ onChangeValue, placeholder, target }) {
  return (
    <Col style={{ paddingLeft: 2, paddingRight: 2 }}>
      <ApplicationTextField
        placeholder={placeholder}
        onChange={(event) => {
          onChangeValue(target, event.target.value);
        }}
      />
    </Col>
  );
}
