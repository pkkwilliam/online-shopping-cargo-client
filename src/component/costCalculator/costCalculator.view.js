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
import Table from "react-bootstrap/esm/Table";
import Plus from "react-bootstrap-icons/dist/icons/plus";
import BackgroundCard from "../common/backgroundCard";

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
        <BackgroundCard style={{ marginTop: 20 }}>
          <View>
            <Container style={{ padding: 0 }}>
              <DisclaimerContainer>
                *所有包裹均享有72小時免費存放
              </DisclaimerContainer>
            </Container>
          </View>
          <TextField
            onChangeValue={this.onChangeValue}
            placeholder="重量(kg)"
            target="weight"
          />
          <LineBreak />
          <TextField
            onChangeValue={this.onChangeValue}
            placeholder="長(cm)"
            target="length"
          />
          <LineBreak />
          <TextField
            onChangeValue={this.onChangeValue}
            placeholder="寬(cm)"
            target="width"
          />
          <LineBreak />
          <TextField
            onChangeValue={this.onChangeValue}
            placeholder="高(cm)"
            target="height"
          />
          <SubmitButton onClick={this.onClickEsimateParcelCost}>
            計算
          </SubmitButton>
          <EsimateCostResult parcelResponse={this.state.parcelResponse} />
        </BackgroundCard>
        <CostTable />
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
    const { cost, height, length, weight, width } = parcelResponse;
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <P>3邊總和: {length + width + height}cm</P>
        <P>重量: {weight}kg</P>
        <P style={{ fontWeight: "bold" }}>費用: ${cost}</P>
      </View>
    );
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

function CostTable() {
  const numberOfRow = 9;
  const SizeSumFeeRows = generateSizeSumFee(numberOfRow);
  const WeightFeeRows = generateWeightFee(numberOfRow);
  return (
    <div style={{ marginTop: 15 }}>
      <h6>代收費用</h6>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Table striped bordered hover size="sm">
          <tr>
            <TableHeaderItem>長+寛+高(cm)</TableHeaderItem>
          </tr>
          <tbody>{SizeSumFeeRows}</tbody>
        </Table>
        <Plus style={{ fontSize: "6rem", fontWeight: "bold" }} />
        <Table striped bordered hover size="sm">
          <tr>
            <TableHeaderItem>重量(kg)</TableHeaderItem>
          </tr>
          <tbody>{WeightFeeRows}</tbody>
        </Table>
      </View>
    </div>
  );
}

function TableHeaderItem({ children }) {
  return <th colSpan="2">{children}</th>;
}

function TableItem({ children }) {
  return (
    <td>
      <P>{children}</P>
    </td>
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

function generateSizeSumFee(numberOfRow) {
  const base = 45;
  const costBase = 2;
  const initialRow = (
    <tr>
      <TableItem>0 ~ 45</TableItem>
      <TableItem>$1</TableItem>
    </tr>
  );
  const lastRow = (
    <tr>
      <TableItem>每+15cm</TableItem>
      <TableItem>+$1</TableItem>
    </tr>
  );
  let rows = [];
  for (let row = 0; row < numberOfRow; row++) {
    // before 45 were $1, then plus by every 15cm + 1
    const from = base + row * 15 + 1;
    const to = base + (row + 1) * 15;
    const rowDetail = (
      <tr>
        <TableItem>{`${from}~${to}`}</TableItem>
        <TableItem>{`$${costBase + row}`}</TableItem>
      </tr>
    );
    rows.push(rowDetail);
  }

  return [initialRow, rows, lastRow];
}

function generateWeightFee(numberOfRow) {
  const base = 0.5;
  const lastRow = (
    <tr>
      <TableItem>每+0.5kg</TableItem>
      <TableItem>+$1</TableItem>
    </tr>
  );
  let rows = [];
  for (let weightRow = 1; weightRow < numberOfRow + 2; weightRow++) {
    const row = (
      <tr>
        <TableItem>{`${base * weightRow}`}</TableItem>
        <TableItem>{`$${weightRow}`}</TableItem>
      </tr>
    );
    rows.push(row);
  }
  return [rows, lastRow];
}
