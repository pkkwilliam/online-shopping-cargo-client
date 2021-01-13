import React from "react";
import Carousel from "react-bootstrap/esm/Carousel";

const EYE_CATCH_URL = `https://raw.githubusercontent.com/pkkwilliam/github.io-contents/master/oscm/assert/eye_catch.png`;
export default function EyeCatch(props) {
  return (
    <Carousel
      indicators={false}
      nextIcon={null}
      prevIcon={null}
      style={styles.carousel}
    >
      <Carousel.Item>
        <img alt="eye_catch" src={EYE_CATCH_URL} style={{ width: "100%" }} />
      </Carousel.Item>
    </Carousel>
  );
}

const styles = {
  carousel: {
    paddingTop: 74,
    paddingBottom: 10,
  },
};
