import React from "react";

const EYE_CATCH_URL =
  "https://github.com/pkkwilliam/github.io-contents/raw/master/oscm/assert/eye_catch.png";

export default function EyeCatch(props) {
  return (
    <div>
      <img alt="eye_catch" src={EYE_CATCH_URL} style={{ width: "100%" }} />
    </div>
  );
}
