import React from "react";
import ClientCard from "../common/clientCard";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import Accordion from "react-bootstrap/esm/Accordion";

const CONTENTS = [
  {
    date: "2020/01/13",
    detail:
      "團隊設計並開發更加User Friednly的介面，有任何意見或改進歡迎與我們我客服溝通。",
    header: "UI用戶介面更新為2.0",
  },
  {
    date: "2020/01/10",
    detail:
      "當用戶使用任何形式支付，平台將會為用戶馬上返回1%以供下次消費使用。",
    header: "用戶餘額",
  },
];

export default function Announcement(props) {
  return (
    <ClientCard header="公告">
      <Accordion>
        <Contents contents={CONTENTS} />
      </Accordion>
    </ClientCard>
  );
}

function Contents({ contents }) {
  return contents.map((content, index) => {
    const lastItem = index === contents.length - 1;
    const { date, header, detail } = content;
    return (
      <>
        <div style={{ marginBottom: 10, marginTop: 10 }}>
          <Accordion.Toggle as={P} eventKey={`${index}`}>
            <Row>
              <Col xs={3}>{date}</Col>
              <Col>{header}</Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse as={P} eventKey={`${index}`}>
            <P>{detail}</P>
          </Accordion.Collapse>
        </div>
        {lastItem ? null : <LineBreak />}
      </>
    );
  });
}
