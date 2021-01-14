import React from "react";
import Carousel from "react-bootstrap/esm/Carousel";

const GITHUB_REPO_URL =
  "https://raw.githubusercontent.com/pkkwilliam/github.io-contents/master/oscm";

const EYE_CATCHES = [
  "/assert/eye_catch_1.png",
  "/assert/eye_catch_2.png",
  "/assert/eye_catch_3.png",
];

export default function EyeCatch(props) {
  return (
    <Carousel
      indicators={false}
      nextIcon={null}
      prevIcon={null}
      style={styles.carousel}
    >
      <Carousel.Item>
        <img
          alt="eye_catch"
          src={GITHUB_REPO_URL + EYE_CATCHES[0]}
          style={{ width: "100%" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          alt="eye_catch"
          src={GITHUB_REPO_URL + EYE_CATCHES[1]}
          style={{ width: "100%" }}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          alt="eye_catch"
          src={GITHUB_REPO_URL + EYE_CATCHES[2]}
          style={{ width: "100%" }}
        />
      </Carousel.Item>
    </Carousel>
  );
}

const styles = {
  carousel: {
    paddingTop: 55,
    paddingBottom: 10,
  },
};
