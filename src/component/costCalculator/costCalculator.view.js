import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import View from "online-shopping-cargo-parent/dist/view";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import ApplicationTextField from "online-shopping-cargo-parent/dist/applicationTextField";
import ClientApplicationComponent from "../clientApplicationComponent";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import { GET_PARCEL_ESTIMATE_COST } from "online-shopping-cargo-parent/dist/service";
import Table from "react-bootstrap/esm/Table";
import Plus from "react-bootstrap-icons/dist/icons/plus";
import BackgroundCard from "../common/backgroundCard";
import InstructionText from "../common/instructionText";

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
        <InstructionText>請輸入包裹資料</InstructionText>
        <BackgroundCard style={{ marginTop: 10 }}>
          <TextField
            label="長(cm)"
            onChangeValue={this.onChangeValue}
            placeholder="0"
            target="length"
          />
          <LineBreak />
          <TextField
            label="寬(cm)"
            onChangeValue={this.onChangeValue}
            placeholder="0"
            target="width"
          />
          <LineBreak />
          <TextField
            label="高(cm)"
            onChangeValue={this.onChangeValue}
            placeholder="0"
            target="height"
          />
          <LineBreak />
          <TextField
            label={"重量(kg)"}
            onChangeValue={this.onChangeValue}
            placeholder="0"
            target="weight"
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
        <P>長寬高總和: {length + width + height}cm</P>
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
  const { disclaimerText } = styles;
  return (
    <div style={{ marginTop: 15 }}>
      <h6>代收費用</h6>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CostCalculatorTable>
          <tr>
            <TableHeaderItem>長+寛+高(cm)</TableHeaderItem>
          </tr>
          <tbody>{SizeSumFeeRows}</tbody>
        </CostCalculatorTable>
        <Plus style={{ fontSize: "3rem", fontWeight: "bold" }} />
        <CostCalculatorTable>
          <tr>
            <TableHeaderItem>重量(kg)</TableHeaderItem>
          </tr>
          <tbody>{WeightFeeRows}</tbody>
        </CostCalculatorTable>
      </View>
      <P style={disclaimerText}>*代收費用 = 長寛高尺吋費用 + 重量費用</P>
      {/* <P style={disclaimerText}>{"不增反減: 當長寛高尺吋 >= 120cm, 即減$1"}</P> */}
      <P style={disclaimerText}>*所有包裹均享有72小時免費存放</P>
      <P style={disclaimerText}>
        *10kg及以上包裹，若體積重大於實際重量，則按體積重計算重量。(體積重計算公式=長cm
        * 寬cm * 高cm / 6000)
      </P>
    </div>
  );
}

function CostCalculatorTable({ children }) {
  return (
    <Table striped bordered hover size="sm" style={{ width: "revert" }}>
      {children}
    </Table>
  );
}

function TableHeaderItem({ children }) {
  return <th colSpan="2">{children}</th>;
}

function TableItem({ children }) {
  return (
    <td>
      <P style={{ marginRight: 15 }}>{children}</P>
    </td>
  );
}

function TextField({ label, onChangeValue, placeholder, target }) {
  return (
    <Col style={{ paddingLeft: 2, paddingRight: 2 }}>
      <ApplicationTextField
        label={label}
        placeholder={placeholder}
        onChange={(event) => {
          onChangeValue(target, event.target.value);
        }}
      />
    </Col>
  );
}

function generateSizeSumFee(numberOfRow) {
  const base = 20;
  const costBase = 2;
  const initialRow = (
    <tr>
      <TableItem>0~20</TableItem>
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

const styles = {
  disclaimerText: { fontSize: 11 },
};
