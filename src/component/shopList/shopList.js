import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import {
  GET_SHOPS,
  GITHUB_CONTENT_URL,
} from "online-shopping-cargo-parent/dist/service";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import ShadowCard from "../common/shadowCard";
import Accordion from "react-bootstrap/esm/Accordion";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import ApplicationTextButton from "online-shopping-cargo-parent/dist/applicationTextButton";
import View from "online-shopping-cargo-parent/dist/view";
import InstructionText from "../common/instructionText";

export default class ShopList extends ClientApplicationComponent {
  state = {
    ...this.state,
    shops: [],
  };

  componentDidMount() {
    this.serviceExecutor.execute(GET_SHOPS()).then((shops) =>
      this.setState({
        shops,
      })
    );
  }

  render() {
    return (
      <Accordion>
        <InstructionText>選擇門店點擊詳細並生成收貨地址</InstructionText>
        <ShopsDisplay
          shops={this.state.shops}
          onSelectShop={this.props.onSelectShop}
        />
      </Accordion>
    );
  }
}

function ShopsDisplay({ shops, onSelectShop }) {
  return shops.map((shop, index) => (
    <ShopCard index={index + 1} shop={shop} onSelectShop={onSelectShop} />
  ));
}

function ShopCard({ index, shop, onSelectShop }) {
  const {
    area,
    areaShopName,
    openingHour,
    shopAddress,
    imageUrls,
    shopName,
    shopNumber,
    shopPhoneNumber,
    wechatId,
  } = shop;
  const images = imageUrls.map((imageUrl) => (
    <ShopImage imageUrl={`${GITHUB_CONTENT_URL}${imageUrl}`} />
  ));
  return (
    <ShadowCard style={{ flexDirection: "column" }}>
      <Accordion.Toggle as={P} eventKey={index}>
        <View style={{ alignItems: "center", justifyContent: "space-between" }}>
          <P
            style={{ fontSize: "1rem", fontWeight: 600 }}
          >{`店號:${shopNumber} ${areaShopName}`}</P>
          <ApplicationTextButton style={{ fontSize: 13 }}>
            詳細
          </ApplicationTextButton>
        </View>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={index}>
        <div>
          <LineBreak style={{ marginBottom: 5, marginTop: 5 }} />
          <ApplicationButton
            block
            onClick={() => onSelectShop(shop)}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            創建收貨地址
          </ApplicationButton>
          <P>店名:{shopName}</P>
          <P>地址:{shopAddress}</P>
          <P>營業時間:{openingHour}</P>
          <P>電話:{shopPhoneNumber}</P>
          {wechatId ? <P>微信:{wechatId}</P> : null}
          {images}
        </div>
      </Accordion.Collapse>
    </ShadowCard>
  );
}

function ShopImage({ imageUrl }) {
  return <img alt="shop_image" src={imageUrl} style={{ width: "100%" }} />;
}
