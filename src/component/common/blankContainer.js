import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";

export default function BlankContainer(props) {
  const { children, headerText } = props;
  return (
    <View
      style={{ alignItems: "center", flexDirection: "column", marginTop: 60 }}
    >
      <h6 style={{ marginBottom: 20 }}>{headerText}</h6>
      <LineBreak dark />
      {children}
    </View>
  );
}
