import React, { useState } from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import View from "online-shopping-cargo-parent/dist/view";
import Dropdown from "react-bootstrap/esm/Dropdown";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import ApplicationTextField from "online-shopping-cargo-parent/dist/applicationTextField";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import Button from "react-bootstrap/esm/Button";

export const COUNTRY_CODE_LIST = ["853", "86", "852"];

export default class LoginView extends ApplicationComponentView {
  render() {
    return (
      <this.Wrapper>
        <h3>澳提登入</h3>
        <Container style={{ marginTop: 15 }} {...this.props} />
      </this.Wrapper>
    );
  }
}

export function Container({
  onClickForgotPassword,
  onClickLogin,
  onClickRegister,
  style,
}) {
  const [credential, setCredential] = useState({
    countryCode: COUNTRY_CODE_LIST[0],
    smsNumber: "",
    password: "",
  });
  return (
    <View style={{ flexDirection: "column", ...style }}>
      <PhoneNumberField
        currentCountryCode={credential.countryCode}
        onChangeCountryCode={(countryCode) =>
          setCredential({ ...credential, countryCode })
        }
        onChangePhoneNumber={(smsNumber) =>
          setCredential({ ...credential, smsNumber })
        }
      />
      <PasswordField
        onChangePassword={(password) =>
          setCredential({ ...credential, password })
        }
      />
      <ApplicationButton onClick={() => onClickLogin(credential)}>
        登入
      </ApplicationButton>
      <Row style={{ justifyContent: "space-between", marginTop: 10 }}>
        <Button onClick={onClickForgotPassword} variant="link">
          忘記密碼
        </Button>
        <Button onClick={onClickRegister} variant="link">
          註冊
        </Button>
      </Row>
    </View>
  );
}

export function CountryCodeDropDown({ countryCode, onChangeCountryCode }) {
  return (
    <Dropdown
      onSelect={(selectedCountryCode) =>
        onChangeCountryCode(selectedCountryCode)
      }
      style={{ display: "flex" }}
    >
      <Dropdown.Toggle
        id="dropdown-custom-components"
        variant=""
        style={{ padding: 0 }}
      >
        {`+${countryCode}`}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {COUNTRY_CODE_LIST.map((code) => (
          <Dropdown.Item eventKey={code}>{`+${code}`}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export function PhoneNumberField({
  currentCountryCode,
  onChangeCountryCode,
  onChangePhoneNumber,
}) {
  return (
    <>
      <Form.Label>電話</Form.Label>
      <InputGroup className="mb-3">
        <CountryCodeDropDown
          countryCode={currentCountryCode}
          onChangeCountryCode={onChangeCountryCode}
        />
        <ApplicationTextField
          onChange={(event) => onChangePhoneNumber(event.target.value)}
          placeholder="請輸入電話號碼"
          style={{ marginLeft: 15 }}
        />
      </InputGroup>
    </>
  );
}

export function PasswordField({ onChangePassword }) {
  return (
    <>
      <Form.Label>密碼</Form.Label>
      <InputGroup className="mb-3">
        <ApplicationTextField
          onChange={(event) => onChangePassword(event.target.value)}
          placeholder="請輸入密碼"
          type="password"
        />
      </InputGroup>
    </>
  );
}
