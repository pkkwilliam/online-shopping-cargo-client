import React from "react";
import { styleSchema } from "../styleSchema";

const styles = {
  margin: 0,
  fontWeight: "600",
  color: styleSchema.color.black,
};

export default function H1(props) {
  return <p style={styles}>{props.children}</p>;
}
