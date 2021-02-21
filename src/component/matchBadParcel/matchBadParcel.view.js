import React from "react";
import ApplicationTextField from "online-shopping-cargo-parent/dist/applicationTextField";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";

export default class MatchBadParcelView extends ApplicationComponentView {
  render() {
    const {
      onChangeOriginalTrackingNumber,
      onClickSubmit,
      originalTrackingNumber,
    } = this.props;
    return (
      <this.Wrapper>
        <OriginalTrackingNumberTextField
          onChangeOriginalTrackingNumber={onChangeOriginalTrackingNumber}
          originalTrackingNumber={originalTrackingNumber}
        />
        <SubmitButton onClickSubmit={onClickSubmit} />
      </this.Wrapper>
    );
  }
}

function OriginalTrackingNumberTextField({
  onChangeOriginalTrackingNumber,
  originalTrackingNumber,
}) {
  return (
    <ApplicationTextField
      label={"原單號"}
      onChange={(event) => onChangeOriginalTrackingNumber(event.target.value)}
      placeHolder={"SF92138210023"}
      value={originalTrackingNumber}
    />
  );
}

function SubmitButton({ onClickSubmit }) {
  return (
    <ApplicationButton block onClick={onClickSubmit} style={{ marginTop: 15 }}>
      認領
    </ApplicationButton>
  );
}
