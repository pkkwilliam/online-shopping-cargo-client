import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import Clickable from "../common/clickable";
import Image from "react-bootstrap/esm/Image";

export default function AdvertisementView(props) {
  return (
    <View style={{ flexDirection: "column" }}>
      <AdvertisementCells advertisement={props.advertisement} />
    </View>
  );
}

export function AdvertisementCells({ advertisement }) {
  const { baseUrl, images } = advertisement;
  return images.map((image) => (
    <AdvertismentCell
      imageUrl={baseUrl + image.url}
      onClickRedirect={image.onClickRedirect}
    />
  ));
}

export function AdvertismentCell({ imageUrl, onClickRedirect }) {
  return (
    <Clickable style={{ marginTop: 15 }}>
      <a href={onClickRedirect}>
        <Image src={imageUrl} style={{ borderRadius: 8, width: "100%" }} />
      </a>
    </Clickable>
  );
}
