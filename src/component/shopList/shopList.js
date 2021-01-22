import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ShadowCard from "../common/shadowCard";

export default class ShopList extends ClientApplicationComponent {
  state = {
    ...this.state,
    shops: [],
  };

  componentDidMount() {
    this.serviceExecutor
      .execute(GET_GITHUB_JSON_CONTENT("/label/shops.json"))
      .then((shops) =>
        this.setState({
          shops,
        })
      );
  }

  render() {
    return (
      <div>
        <ShopsDisplay shops={this.state.shops} />
      </div>
    );
  }
}

function ShopsDisplay({ shops }) {
  return shops.map((shop) => <ShopCard shop={shop} />);
}

function ShopCard({ shop }) {
  const {
    openingHour,
    shopAddress,
    shopPhoneNumber,
    shopName,
    shopNumber,
  } = shop;
  return (
    <ShadowCard style={{ flexDirection: "column" }}>
      <P
        style={{ fontSize: "1rem", fontWeight: 600 }}
      >{`店號:${shopNumber} ${shopName}`}</P>
      <LineBreak style={{ marginBottom: 5, marginTop: 5 }} />
      <P>{shopAddress}</P>
    </ShadowCard>
  );
}
