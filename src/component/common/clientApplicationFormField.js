import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import React from "react";
import Form from "react-bootstrap/esm/Form";

export default function ClientApplicationFormField(props) {
  const { label, style, textarea, value } = props;
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as={textarea ? "textarea" : "input"}
        style={{
          borderRadius: 10,
          boxShadow: styleSchema.shadowLight,
          ...style,
        }}
        value={value}
        {...props}
      />
    </Form.Group>
  );
}
