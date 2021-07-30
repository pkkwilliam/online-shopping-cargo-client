import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import {
  MAKE_SHIP_TO_HOME_PAYMENT,
  REQUEST_SHIP_TO_HOME_ONLINE_PAYMENT_FORM_PARAMS,
} from "online-shopping-cargo-parent/dist/service";

export default class OnlinePayment extends UserProfileComponent {
  formRef;

  state = {
    ...this.state,
    formRequestParams: {
      paymentRequest: {},
    },
    isElectronicPaymentChannel: false,
  };

  /**
   * create shipToHome order and mpay form data params
   * @param {*} shipToHome
   * @returns
   */
  async requestShipToHomeMpayPaymentFormParams(shipToHome) {
    return new Promise((resolve, reject) => {
      this.serviceExecutor
        .execute(REQUEST_SHIP_TO_HOME_ONLINE_PAYMENT_FORM_PARAMS(shipToHome))
        .then((formRequestParams) => {
          this.setState({ formRequestParams });
          return resolve(formRequestParams);
        });
    });
  }

  async makeShipToHomeH5Payment(shipToHome) {
    return new Promise((resolve, reject) => {
      this.serviceExecutor
        .execute(MAKE_SHIP_TO_HOME_PAYMENT(shipToHome))
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

export function isExpiredPaymentOrder(createTime) {
  let timeoutDate = new Date(createTime);
  timeoutDate = timeoutDate.setMinutes(timeoutDate.getMinutes() + 30);
  return new Date() > timeoutDate;
}
