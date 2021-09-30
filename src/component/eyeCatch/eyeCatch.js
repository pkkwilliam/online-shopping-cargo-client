import React from "react";
import Carousel from "react-bootstrap/esm/Carousel";
import ClientApplicationComponent from "../clientApplicationComponent";
import {
  RED_POCKET,
  SAVE_TO_DESKTOP,
  SHIP_TO_HOME_LANDING_PAGE,
  TUTORIAL,
} from "../../routes";
import { withRouter } from "react-router-dom";

import "./eyeCatch.css";

class EyeCatch extends ClientApplicationComponent {
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
      <Carousel.Item onClick={() => this.onClickEyeCatch(image.onClick)}>
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

  onClickEyeCatch(action) {
    switch (action) {
      case "DELIVERY":
        this.goTo(SHIP_TO_HOME_LANDING_PAGE);
        break;
      case "INSTALL":
        this.goTo(SAVE_TO_DESKTOP);
        break;
      case "TUTORIAL":
        this.goTo(TUTORIAL);
        break;
      case "RED_POCKET":
        this.goTo(RED_POCKET);
        break;
      default:
        console.debug("no action");
    }
  }
}

const styles = {
  carousel: {
    paddingTop: 40,
    paddingBottom: 10,
  },
};

export default withRouter(EyeCatch);
