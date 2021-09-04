import React from "react";
import ClientApplicationComponent from "./clientApplicationComponent";
import View from "online-shopping-cargo-parent/dist/view";
import { Image } from "react-bootstrap";
import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";
import { getRouteByKey } from "../routes";
import { withRouter } from "react-router-dom";

export class Advertisement extends ClientApplicationComponent {
  async componentDidMount() {
    const advertisement = await this.serviceExecutor.execute(
      GET_GITHUB_JSON_CONTENT("/advertisement/advertisement.json")
    );
    this.appState.advertisement.setAdvertisement(advertisement);
  }

  render() {
    const { baseUrl, row } = this.appState.advertisement.content;
    const ImageContainers = row.map((rowContent) => (
      <AdvertisementRow
        baseUrl={baseUrl}
        onClickAdvertisement={this.onClickAdvertisement}
        row={rowContent}
      />
    ));
    return <View style={{ flexDirection: "column" }}>{ImageContainers}</View>;
  }

  onClickAdvertisement = (key, params) => {
    this.goTo(getRouteByKey(key), params);
  };
}

function AdvertisementRow({ baseUrl, onClickAdvertisement, row }) {
  const RowContent = row.map((image, index) => (
    <ImageContainer
      baseUrl={baseUrl}
      description={image.description}
      onClickAdvertisement={onClickAdvertisement}
      imageUrl={image.url}
      isLastIndex={index === row.length - 1}
      isSingle={row.length === 1}
      onClick={image.onClick}
    />
  ));
  return (
    <View
      style={{ width: "100%", justifyContent: "space-around", marginTop: 10 }}
    >
      {RowContent}
    </View>
  );
}

function ImageContainer({
  baseUrl,
  description,
  imageUrl,
  onClick,
  onClickAdvertisement,
  isLastIndex,
  isSingle,
}) {
  return (
    <Image
      onClick={() =>
        onClickAdvertisement(onClick, { baseUrl, description, imageUrl })
      }
      src={baseUrl + imageUrl}
      style={{
        borderRadius: 10,
        height: 100,
        objectFit: "cover",
        marginRight: isLastIndex ? 0 : 8,
        width: isSingle ? "100%" : {},
      }}
    />
  );
}

export default withRouter(Advertisement);
