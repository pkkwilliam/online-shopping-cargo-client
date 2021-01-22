import React from "react";
import ClientCard from "../common/clientCard";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import Accordion from "react-bootstrap/esm/Accordion";
import ClientApplicationComponent from "../clientApplicationComponent";
import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";
export default class Announcement extends ClientApplicationComponent {
  state = {
    ...this.state,
    announcements: [],
  };

  componentDidMount() {
    this.serviceExecutor
      .execute(GET_GITHUB_JSON_CONTENT("/label/accouncements.json"))
      .then((announcements) => this.setState({ announcements }));
  }

  render() {
    return (
      <ClientCard header="公告">
        <Accordion>
          <Contents contents={this.state.announcements} />
        </Accordion>
      </ClientCard>
    );
  }
}

function Contents({ contents }) {
  return contents.map((content, index) => {
    const lastItem = index === contents.length - 1;
    const { date, header, detail } = content;
    const { headerText } = styles;
    return (
      <>
        <div style={{ marginBottom: 10, marginTop: 10 }}>
          <Accordion.Toggle as={P} eventKey={`${index}`}>
            <Row>
              <Col xs={3}>
                <P style={headerText}>{date}</P>
              </Col>
              <Col>
                <P style={headerText}>{header}</P>
              </Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse as={P} eventKey={`${index}`}>
            <div
              dangerouslySetInnerHTML={{ __html: detail }}
              style={{ paddingTop: 10 }}
            />
          </Accordion.Collapse>
        </div>
        {lastItem ? null : <LineBreak />}
      </>
    );
  });
}

const styles = {
  headerText: {
    fontSize: "1rem",
  },
};
