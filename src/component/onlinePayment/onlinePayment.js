import React from "react";
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

  async requestShipToHomeMpayPaymentFormParams(shipToHome) {
    return new Promise((resolve, reject) => {
      this.serviceExecutor
        .execute(CREATE_SHIP_TO_HOME_PAYMENT_SERVICE(shipToHome))
        .then((formRequestParams) => {
          this.setState({ formRequestParams });
          return resolve(formRequestParams);
        });
    });
  }
  /**
   * this is not very good, we are not sure how to redirect user to mpay payment using Fetch
   * that is why we have to construct a form and submit
   * @param {*} param0
   * @returns
   */
  MpayForm = () => {
    const { paymentRequest, requestUrl } = this.state.formRequestParams;
    console.log(paymentRequest);
    const inputFields = [];
    for (let key in paymentRequest) {
      let inputField = (
        <input type="hidden" name={key} value={paymentRequest[key]} />
      );
      inputFields.push(inputField);
    }
    return (
      <form id="payment_auto_submit_form" action={requestUrl} method="get">
        {inputFields}
        {/* <ApplicationButton type="submit">MPay支付</ApplicationButton> */}
      </form>
    );
  };

  submitMpayForm() {
    document.forms["payment_auto_submit_form"].submit();
  }
}
