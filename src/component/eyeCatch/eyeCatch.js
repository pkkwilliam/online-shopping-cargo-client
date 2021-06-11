import React from "react";
import Carousel from "react-bootstrap/esm/Carousel";
import ClientApplicationComponent from "../clientApplicationComponent";
import { ADDRESS_GENERATOR, SAVE_TO_DESKTOP, TUTORIAL } from "../../routes";

import "./eyeCatch.css";

export default class EyeCatch extends ClientApplicationComponent {
  state = {
    ...this.state,
    eyeCatchJsonContent: {
      baseUrl: "",
      images: [],
    },
  };

  componentDidMount() {
    this.appStateService.getEyeCatch();
  }

  render() {
    const { baseUrl, images } = this.appState.eyeCatch;
    const CarouselItems = images.map((image) => (
      <Carousel.Item onClick={() => onClickEyeCatch(image.onClick)}>
        <img
          alt="eye_catch"
          src={baseUrl + image.url}
          style={{ width: "100%" }}
        />
      </Carousel.Item>
    ));
    return (
      <Carousel
        indicators={true}
        interval={3000}
        nextIcon={null}
        prevIcon={null}
        style={styles.carousel}
      >
        {CarouselItems}
      </Carousel>
    );
  }
}

function onClickEyeCatch(action) {
  switch (action) {
    case "DELIVERY":
      window.location.href = ADDRESS_GENERATOR.url;
      break;
    case "INSTALL":
      window.location.href = SAVE_TO_DESKTOP.url;
      break;
    case "TUTORIAL":
      window.location.href = TUTORIAL.url;
      break;
    default:
      console.debug("no action");
  }
}

const styles = {
  carousel: {
    paddingTop: 40,
    paddingBottom: 10,
  },
};
