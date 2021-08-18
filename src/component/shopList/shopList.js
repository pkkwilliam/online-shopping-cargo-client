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
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import ApplicationTextButton from "online-shopping-cargo-parent/dist/applicationTextButton";
import View from "online-shopping-cargo-parent/dist/view";
import InstructionText from "../common/instructionText";

export default class ShopList extends ClientApplicationComponent {
  state = {
    ...this.state,
  };

  componentDidMount() {
    this.appStateService.getShops();
  }

  render() {
    return (
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <ShopsDisplay
          shops={this.appState.shop.shops}
          onSelectShop={this.props.onSelectShop}
        />
      </View>
    );
  }
}

function DeliveryShopDetail({ areaShopName, shopPhoneNumber, wechatId }) {
  return (
    <>
      <P style={{ fontWeight: 600, marginTop: 8 }}>
        {`收費方式: 首公斤$6 + 續重每公斤$4\n此收費不會與正常代收費用重覆計算。`}
      </P>
      {/* <P style={{ color: "red", marginBottom: 8 }}>
        *詳細收費公式將會在3天內公布，敬請留意。
      </P> */}
      <P>電話:{shopPhoneNumber}</P>
      {wechatId ? <P>微信:{wechatId}</P> : null}
    </>
  );
}

function PickupShopDetail({
  openingHour,
  shopAddress,
  areaShopName,
  shopPhoneNumber,
  wechatId,
}) {
  return (
    <>
      <P>店名:{areaShopName}</P>
      <P>地址:{shopAddress}</P>
      <P>營業時間:{openingHour}</P>
      <P>電話:{shopPhoneNumber}</P>
      {wechatId ? <P>微信:{wechatId}</P> : null}
    </>
  );
}

function ShopsDisplay({ shops, onSelectShop }) {
  shops.sort((shop1, shop2) => shop1.shopNumber - shop2.shopNumber);

  const deliveryShops = [];
  const pickupShops = [];

  shops.forEach((shop) => {
    if (shop.shopType === "DELIVERY") {
      deliveryShops.push(shop);
    } else {
      pickupShops.push(shop);
    }
  });

  const deliveryShopsCard = deliveryShops.map((shop, index) => (
    <ShopCard index={index + 1} shop={shop} onSelectShop={onSelectShop} />
  ));

  const pickupShopsCard = pickupShops.map((shop, index) => (
    <ShopCard index={index + 1} shop={shop} onSelectShop={onSelectShop} />
  ));

  return (
    <>
      <InstructionText>送貨上門</InstructionText>
      <Accordion>{deliveryShopsCard}</Accordion>
      <InstructionText>代收門店</InstructionText>
      <Accordion>{pickupShopsCard}</Accordion>
    </>
  );
}

function ShopCard({ index, shop, onSelectShop }) {
  const {
    area,
    areaShopName,
    openingHour,
    shopAddress,
    imageUrls,
    shopNumber,
    shopPhoneNumber,
    shopType,
    wechatId,
  } = shop;
  const isPickupShop = shopType === "PICK_UP";
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
          {isPickupShop ? (
            <PickupShopDetail {...shop} />
          ) : (
            <DeliveryShopDetail {...shop} />
          )}

          <ApplicationButton
            block
            onClick={() => onSelectShop(shop)}
            style={{ marginBottom: 10, marginTop: 10 }}
          >
            創建收貨地址
          </ApplicationButton>
          {images}
        </div>
      </Accordion.Collapse>
    </ShadowCard>
  );
}

function ShopImage({ imageUrl }) {
  return (
    <img
      alt="shop_image"
      src={imageUrl}
      style={{ borderRadius: 10, width: "100%" }}
    />
  );
}

function getDeliveryInfo() {
  this.serviceExecutor.execute(GET_GITHUB_JSON_CONTENT());
}
