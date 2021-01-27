import React from "react";
import Carousel from "react-bootstrap/esm/Carousel";
import ClientApplicationComponent from "../clientApplicationComponent";
import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";
import { TUTORIAL } from "../../routes";
export default class EyeCatch extends ClientApplicationComponent {
  state = {
    ...this.state,
    eyeCatchJsonContent: {
      baseUrl: "",
      images: [],
    },
  };

  componentDidMount() {
    this.serviceExecutor
      .execute(GET_GITHUB_JSON_CONTENT("/label/eye_catch.json"))
      .then((eyeCatchJsonContent) =>
        this.setState({
          eyeCatchJsonContent,
        })
      );
  }

  render() {
    const { baseUrl, images } = this.state.eyeCatchJsonContent;
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
        indicators={false}
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
    case "TUTORIAL":
      window.location.href = TUTORIAL.url;
      break;
    default:
      console.debug("no action");
  }
}

const styles = {
  carousel: {
    paddingTop: 55,
    paddingBottom: 10,
  },
};
