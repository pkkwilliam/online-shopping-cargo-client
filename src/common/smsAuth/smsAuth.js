import React from "react";
import SmsAuthView from "./smsAuth.view";
import { REQUEST_VERIFICATION, VERIFY } from "../service";
import ApplicationComponent from "../applicationComponent";

const COUNTRY_CODE_LIST = [
  { name: "MACAU", code: "853", chineseName: "澳門", englishName: "Macau" },
  {
    name: "HONG_KONG",
    code: "852",
    chineseName: "香港",
    englishName: "Hong Kong",
  },
];

export default class SmsAuth extends ApplicationComponent {
  state = {
    codeSent: false,
    countrySelected: COUNTRY_CODE_LIST[0],
    smsNumber: "",
    oneTimePassword: "",
  };

  render() {
    const { codeSent, countrySelected } = this.state;
    return (
      <SmsAuthView
        codeSent={codeSent}
        countrySelected={countrySelected}
        dropDownCountryCodeList={COUNTRY_CODE_LIST}
        onChangeCountryCode={this.onChangeCountryCode}
        onChangeOneTimePassword={this.onChangeOneTimePassword}
        onChangeSmsNumber={this.onChangeSmsNumber}
        onClickSubmit={this.onClickSubmit}
      />
    );
  }

  onChangeCountryCode = (countryUpdate) => {
    COUNTRY_CODE_LIST.forEach((country) => {
      if (country.name === countryUpdate) {
        this.setState({
          countrySelected: country,
        });
        // JS/TS not supported? break;
      }
    });
  };

  onChangeOneTimePassword = (oneTimePassword) => {
    this.setState({
      oneTimePassword,
    });
  };

  onChangeSmsNumber = (smsNumber) => {
    this.setState({
      smsNumber,
    });
  };

  onClickSubmit = async () => {
    const {
      codeSent,
      countrySelected,
      oneTimePassword,
      smsNumber,
    } = this.state;
    if (!smsNumber) {
      return null;
    }
    if (!codeSent) {
      this.serviceExecutor
        .execute(REQUEST_VERIFICATION(countrySelected.code, smsNumber))
        .then((result) => {
          this.setState({
            codeSent: true,
          });
        });
    } else if (oneTimePassword) {
      this.serviceExecutor.execute(
        VERIFY(countrySelected.code, smsNumber, oneTimePassword)
      );
    }
  };
}
