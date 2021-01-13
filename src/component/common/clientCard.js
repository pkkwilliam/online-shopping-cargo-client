import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

export default function ClientCard(props) {
  const { children, header } = props;
  const { cardBody, cardHeader } = styles;
  return (
    <div>
      <div style={cardHeader}>
        <P style={{ color: "white" }}>{header}</P>
      </div>
      <div style={cardBody}>{children}</div>
    </div>
  );
}

const styles = {
  cardHeader: {
    background:
      "linear-gradient(90deg, rgb(247, 58, 72, 1) 0%, rgb(244, 56, 70, 1) 100%)",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    fontWeight: "bold",
    padding: 10,
    paddingBottom: 25,
    paddingTop: 15,
  },
  cardBody: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: -10,
  },
};
