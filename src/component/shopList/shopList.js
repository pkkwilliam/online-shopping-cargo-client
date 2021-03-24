import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import {
  GET_GITHUB_JSON_CONTENT,
  GITHUB_CONTENT_URL,
} from "online-shopping-cargo-parent/dist/service";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ShadowCard from "../common/shadowCard";
import Accordion from "react-bootstrap/esm/Accordion";
import Spinner from "react-bootstrap/esm/Spinner";

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
      <Accordion>
        {/* <ShopsDisplay shops={this.state.shops} /> */}
        <Spinner
          animation="border"
          size="sm"
          style={{ margin: 20 }}
          variant="warning"
        />
      </Accordion>
    );
  }
}

function ShopsDisplay({ shops }) {
  return shops.map((shop, index) => <ShopCard index={index + 1} shop={shop} />);
}

function ShopCard({ index, shop }) {
  const {
    openingHour,
    shopAddress,
    shopFrontImage,
    shopMapImage,
    shopName,
    shopNumber,
    shopPhoneNumber,
  } = shop;
  return (
    <ShadowCard style={{ flexDirection: "column" }}>
      <Accordion.Toggle as={P} eventKey={index}>
        <>
          <P
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >{`店號:${shopNumber} ${shopName}`}</P>
          <LineBreak style={{ marginBottom: 5, marginTop: 5 }} />
          <P>{shopAddress}</P>
        </>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={index}>
        <div>
          <P>{`營業時間: ${openingHour}`}</P>
          <P>{`電話: ${shopPhoneNumber}`}</P>
          <ShopImage imageUrl={`${GITHUB_CONTENT_URL}${shopMapImage}`} />
          <ShopImage imageUrl={`${GITHUB_CONTENT_URL}${shopFrontImage}`} />
        </div>
      </Accordion.Collapse>
    </ShadowCard>
  );
}

function ShopImage({ imageUrl }) {
  return <img alt="shop_image" src={imageUrl} style={{ width: "100%" }} />;
}
