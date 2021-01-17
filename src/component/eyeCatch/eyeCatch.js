import React from "react";
import Carousel from "react-bootstrap/esm/Carousel";
import { GITHUB_CONTENT_URL } from "online-shopping-cargo-parent/dist/service";

const EYE_CATCH_IMAGES = [
  "/assert/eye_catch_1.png",
  "/assert/eye_catch_2.png",
  "/assert/eye_catch_3.png",
];

export default function EyeCatch(props) {
  const CarouselItems = EYE_CATCH_IMAGES.map((image) => (
    <Carousel.Item>
      <img
        alt="eye_catch"
        src={GITHUB_CONTENT_URL + image}
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

const styles = {
  carousel: {
    paddingTop: 55,
    paddingBottom: 10,
  },
};
