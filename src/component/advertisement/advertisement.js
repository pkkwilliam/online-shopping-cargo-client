import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";
import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import AdvertisementView from "./advertisement.view";

export default class Advertisement extends ClientApplicationComponent {
  state = {
    ...this.state,
    advertisement: {
      baseUrl: "",
      images: [],
    },
  };

  componentDidMount() {
    this.serviceExecutor
      .execute(GET_GITHUB_JSON_CONTENT("/advertisement/advertisement.json"))
      .then((advertisement) => this.setState({ advertisement }));
  }

  render() {
    return <AdvertisementView {...this.state} />;
  }
}
