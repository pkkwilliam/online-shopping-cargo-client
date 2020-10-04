import React from "react";
import EyeCatchImage from "../../common/assert/eye_catch.png";

export default function EyeCatch(props) {
  return (
    <div>
      <img alt="eye_catch" src={EyeCatchImage} style={{ width: "100%" }} />
    </div>
  );
}
