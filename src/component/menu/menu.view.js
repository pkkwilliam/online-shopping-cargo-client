import React from "react";
import Button from "react-bootstrap/esm/Button";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import View from "online-shopping-cargo-parent/dist/view";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

const BUTTON_SIZE = 50;
const ROW_SIZE = 4;

export default function MenuView(props) {
  const { menuItems, onClick } = props;
  return (
    <Container>
      <MenuItems items={menuItems} onClick={onClick} />
    </Container>
  );
}

function MenuItems({ items, onClick }) {
  let itemsRows = [];
  items.forEach((item, index) => {
    const row = Math.floor(index / ROW_SIZE);
    if (!itemsRows[row]) {
      itemsRows[row] = [];
    }
    itemsRows[row].push(
      <Col>
        <CircularButton onClick={onClick} {...item} />
      </Col>
    );
  });

  const menuItems = itemsRows.map((itemsRow) => (
    <Row style={{ marginBottom: 8, marginTop: 8 }}>{itemsRow}</Row>
  ));
  return menuItems;
}

export function CircularButton(item) {
  const { buttonBackgroundColor, children, disabled, label, onClick } = item;
  const { primaryGradient, primaryLight } = styleSchema.color;
  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <Button
        disabled={disabled}
        onClick={() => onClick(item)}
        style={{
          alignItems: "center",
          background: buttonBackgroundColor
            ? buttonBackgroundColor
            : primaryGradient,
          borderColor: buttonBackgroundColor
            ? buttonBackgroundColor
            : primaryLight,
          borderRadius: 30,
          boxShadow: "none",
          display: "flex",
          height: BUTTON_SIZE,
          width: BUTTON_SIZE,
        }}
      >
        {children}
      </Button>
      <P style={{ fontSize: "0.8rem" }}>{label}</P>
    </View>
  );
}
