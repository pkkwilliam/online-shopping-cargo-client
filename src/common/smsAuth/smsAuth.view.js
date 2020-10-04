import React, { Component } from "react";
import FormControl from "react-bootstrap/esm/FormControl";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Dropdown from "react-bootstrap/esm/Dropdown";

export default class SmsAuthView extends Component {
  render() {
    return (
      <div>
        <this.NumberInput />
      </div>
    );
  }

  NumberInput = () => {
    const {
      countrySelected,
      dropDownCountryCodeList,
      onChangeCountryCode,
      onClickSubmit,
    } = this.props;
    return (
      <InputGroup className="mb-3" size="sm">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={`${countrySelected.chineseName} +${countrySelected.code}`}
          id="input-group-dropdown-1"
          onSelect={(countryCode) => onChangeCountryCode(countryCode)}
        >
          {this.generateDropDownList(dropDownCountryCodeList)}
        </DropdownButton>
        <this.Form />
        <InputGroup.Append>
          <Button onClick={onClickSubmit} variant="outline-secondary">
            驗證
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  };

  Form = () => {
    return this.props.codeSent ? (
      <this.VerifyForm />
    ) : (
      <this.RequestVerificationForm />
    );
  };

  RequestVerificationForm = () => {
    return (
      <FormControl
        onChange={(number) => this.props.onChangeSmsNumber(number.target.value)}
        placeholder={"@號碼"}
        aria-describedby="basic-addon1"
      />
    );
  };

  VerifyForm = () => {
    return (
      <FormControl
        onChange={(number) =>
          this.props.onChangeOneTimePassword(number.target.value)
        }
        placeholder={"驗證碼"}
        aria-describedby="basic-addon1"
      />
    );
  };

  generateDropDownList(list) {
    return list.map((item) => (
      <Dropdown.Item
        eventKey={item.name}
      >{`${item.chineseName} +${item.code}`}</Dropdown.Item>
    ));
  }
}
