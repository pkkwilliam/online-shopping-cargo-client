import React, { useState } from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import View from "online-shopping-cargo-parent/dist/view";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import ApplicationTextField from "online-shopping-cargo-parent/dist/applicationTextField";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import {
  COUNTRY_CODE_LIST,
  CountryCodeDropDown,
  PasswordField,
} from "../login/login.view";
import P from "online-shopping-cargo-parent/dist/text/paragraph";

export default class SmsRequestView extends ApplicationComponentView {
  render() {
    const {
      countdown,
      onClickRequestVerification,
      onClickSubmit,
      submitLabel,
    } = this.props;
    return (
      <this.Wrapper>
        <Container
          countdown={countdown}
          submitLabel={submitLabel}
          onClickRequestVerification={onClickRequestVerification}
          onClickSubmit={onClickSubmit}
        />
      </this.Wrapper>
    );
  }
}

export function Container({
  countdown,
  onClickRequestVerification,
  onClickSubmit,
  submitLabel,
  style,
}) {
  const [credential, setCredential] = useState({
    countryCode: COUNTRY_CODE_LIST[0],
    smsNumber: "",
    password: "",
    confirmPassword: "",
    oneTimePassword: "",
  });
  return (
    <View style={{ flexDirection: "column", ...style }}>
      <>
        <Form.Label>電話</Form.Label>
        <InputGroup className="mb-3" style={{ alignItems: "center" }}>
          <CountryCodeDropDown
            countryCode={credential.countryCode}
            onChangeCountryCode={(countryCode) =>
              setCredential({ ...credential, countryCode })
            }
          />
          <ApplicationTextField
            onChange={(event) =>
              setCredential({
                ...credential,
                smsNumber: event.target.value,
              })
            }
            placeholder="請輸入電話號碼"
            style={{ marginLeft: 15 }}
          />
          <MiniButton
            disabled={countdown > 0}
            onClick={() => onClickRequestVerification(credential)}
            style={{ marginLeft: 8 }}
          >
            {countdown <= 0 ? "獲取驗證碼" : `獲取驗證碼(${countdown})`}
          </MiniButton>
        </InputGroup>
      </>
      <VerificationCode
        onChangeVerificationCode={(oneTimePassword) =>
          setCredential({ ...credential, oneTimePassword })
        }
      />
      <PasswordField
        onChangePassword={(password) =>
          setCredential({ ...credential, password })
        }
      />
      <ConfirmPasswordField
        onChangeConfirmPassword={(confirmPassword) =>
          setCredential({ ...credential, confirmPassword })
        }
      />
      <ApplicationButton onClick={() => onClickSubmit(credential)}>
        {submitLabel}
      </ApplicationButton>
    </View>
  );
}

export function ConfirmPasswordField({ onChangeConfirmPassword }) {
  return (
    <>
      <Form.Label>確認密碼</Form.Label>
      <InputGroup className="mb-3">
        <ApplicationTextField
          onChange={(event) => onChangeConfirmPassword(event.target.value)}
          placeholder="請再次輸入密碼"
          type="password"
        />
      </InputGroup>
    </>
  );
}

export function VerificationCode({ onChangeVerificationCode }) {
  return (
    <>
      <Form.Label>驗證碼</Form.Label>
      <InputGroup className="mb-3">
        <ApplicationTextField
          onChange={(event) => onChangeVerificationCode(event.target.value)}
          placeholder="請輸入驗證碼"
          type="text"
        />
      </InputGroup>
    </>
  );
}

export function MiniButton(props) {
  const backgroundColor = props.disabled ? "#9F9F9F" : "#28a745";
  return (
    <P
      {...props}
      style={{
        backgroundColor,
        borderRadius: 8,
        color: "white",
        fontSize: 12,
        padding: 3,
        paddingLeft: 8,
        paddingRight: 8,
        ...props.style,
      }}
    >
      {props.children}
    </P>
  );
}
