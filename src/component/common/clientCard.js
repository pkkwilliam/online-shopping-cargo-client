import React from "react";
import Card from "react-bootstrap/esm/Card";

export default function ClientCard(props) {
  return (
    <Card>
      <Card.Header style={styles.cardHeader}>{props.header}</Card.Header>
      <Card.Body style={styles.cardBody}>{props.children}</Card.Body>
    </Card>
  );
}

const styles = {
  cardHeader: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  cardBody: { padding: 10 },
};
