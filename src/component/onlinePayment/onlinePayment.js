import React from "react";
import ApplicationButton from "online-shopping-cargo-parent/dist/applicationButton";
import UserProfileComponent from "../common/userProfileComponent";

const CREATE_SHIP_TO_HOME_PAYMENT_SERVICE = (shipToHome) => ({
  body: JSON.stringify(shipToHome),
  publicRequset: false,
  requestMapping: "/user/shipToHome/v1/request_mpay_form_data_params",
  requestMethod: "POST",
});
export default class OnlinePayment extends UserProfileComponent {
  formRef;

  state = {
    ...this.state,
    formRequestParams: {
      paymentRequest: {},
    },
    isElectronicPaymentChannel: false,
  };

  requestShipToHomeMpayPaymentFormParams(shipToHome) {
    this.serviceExecutor
      .execute(CREATE_SHIP_TO_HOME_PAYMENT_SERVICE(shipToHome))
      .then((formRequestParams) => {
        this.setState({ formRequestParams });
      });
  }
}

export function MpayForm({ formRequestParams }) {
  const { paymentRequest, requestUrl } = formRequestParams;
  const inputFields = [];
  for (let key in paymentRequest) {
    let inputField = (
      <input type="hidden" name={key} value={paymentRequest[key]} />
    );
    inputFields.push(inputField);
  }
  return (
    <form action={requestUrl} method="get">
      {inputFields}
      <ApplicationButton type="submit">MPay支付</ApplicationButton>
    </form>
  );
}
