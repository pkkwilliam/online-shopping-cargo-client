import React from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import View from "online-shopping-cargo-parent/dist/view";
import X from "react-bootstrap-icons/dist/icons/x";
import BackgroundCard from "../common/backgroundCard";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import ApplicationPhoneNumberTextField from "online-shopping-cargo-parent/dist/applicationPhoneNumberTextField";
import BlankContainer from "../common/blankContainer";

const ApplicationConfirmModal = React.lazy(() =>
  import("online-shopping-cargo-parent/dist/applicationConfirmModal")
);
const PhoneNumberDisplay = React.lazy(() =>
  import("../common/phoneNumberDisplay")
);

export default class ThirdPersonPickupView extends ApplicationComponentView {
  render() {
    const { onClickRemoveThirdPerson, thirdPersons } = this.props;
    return (
      <this.Wrapper>
        <ConfirmModalSection {...this.props} />
        <BlankContainer headerText="已允許的代收件人">
          <ThirdPersonsSection
            onClickRemoveThirdPerson={onClickRemoveThirdPerson}
            thirdPersons={thirdPersons}
          />
          <AddThirdPersonSection {...this.props} />
        </BlankContainer>
      </this.Wrapper>
    );
  }
}

function ConfirmModalSection(props) {
  const { confirmModal, onClickConfirm, onCloseConfirmModal } = props;
  if (confirmModal.show) {
    return (
      <ApplicationConfirmModal
        onClickConfirm={onClickConfirm}
        onClose={onCloseConfirmModal}
        {...confirmModal}
      />
    );
  } else {
    return null;
  }
}

function ThirdPerson({ onClickRemoveThirdPerson, thirdPerson }) {
  const { countryCode, smsNumber } = thirdPerson;
  return (
    <BackgroundCard style={{ marginTop: 15 }}>
      <View style={{ alignItems: "center", justifyContent: "space-between" }}>
        <PhoneNumberDisplay countryCode={countryCode} smsNumber={smsNumber} />
        <X onClick={() => onClickRemoveThirdPerson(countryCode, smsNumber)} />
      </View>
    </BackgroundCard>
  );
}

function ThirdPersonsSection({ onClickRemoveThirdPerson, thirdPersons }) {
  if (!thirdPersons || thirdPersons.length < 1) {
    return <p>你暫時没有代收件人</p>;
  }
  return thirdPersons.map((thirdPerson) => (
    <ThirdPerson
      thirdPerson={thirdPerson}
      onClickRemoveThirdPerson={onClickRemoveThirdPerson}
    />
  ));
}

function AddThirdPersonSection(props) {
  return (
    <BackgroundCard style={{ marginTop: 15 }}>
      <ApplicationPhoneNumberTextField {...props} />
      <ApplicationButton
        block
        onClick={props.onClickAddThirdPerson}
        style={{ marginTop: 15 }}
      >
        添加代收件人
      </ApplicationButton>
    </BackgroundCard>
  );
}
