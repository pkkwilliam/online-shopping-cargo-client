import React from "react";
import UserProfileComponent from "../common/userProfileComponent";
import { withRouter } from "react-router-dom";
import OrderConfirmationView from "./shipToHomeOrderConfirmation.view";

class ShipToHomeOrderConfirmation extends UserProfileComponent {
  state = {
    ...this.state,
    shipToHomeOrder: {
      address: {
        active: true,
        createTime: "2021-05-23 01:18:35",
        updateTime: "2021-05-24 12:36:05",
        id: 2266,
        addressType: "SHIPPING_ADDRESS",
        contactName: "豬頭收件人",
        countryCode: "852",
        defaultShipping: false,
        phoneNumber: "63530392",
        street: "漁翁街166號",
        unit: "7樓E-FG",
      },
      parcels: [
        {
          active: true,
          createTime: "2021-06-07 06:30:53",
          updateTime: null,
          id: 2434,
          cost: 6,
          dayStored: 0,
          displayId: "119000002434",
          destination: null,
          discount: null,
          height: 13,
          length: 22,
          invoiceSent: false,
          originalTrackingNumber: "YT131",
          messageSent: false,
          parcelLocation: "WAREHOUSE",
          parcelStatus: "WAREHOUSE_RECEIVED",
          parcelType: "SHIP_TO_HOME",
          readyToPickupDate: null,
          receiverCountryCode: "853",
          receiverNumber: "63530392",
          shop: {
            active: true,
            createTime: "2021-05-09 07:55:44",
            updateTime: null,
            id: 2252,
            area: null,
            areaShopName: "送貨上門",
            imageUrls: [],
            newUserPromotion: false,
            openingHour: "稍後補全",
            shopAddress: "媽閣上街",
            shopName: "送貨上門",
            shopNumber: 1000,
            shopPhoneNumber: "65564207",
            shopType: "DELIVERY",
            wechatId: "TTEEWECHAT",
          },
          shopPaid: false,
          shopShouldPay: null,
          shopCommission: null,
          storageCost: 0,
          storeReceived: false,
          transactionDate: null,
          weight: 1,
          width: 16,
          volumeWeight: 1,
          zyId: "ZYA-2728",
          selected: true,
        },
      ],
      paymentType: "CASH",
    },
  };

  componentDidMount() {
    const { shipToHomeOrder } = this.routerParams;
  }

  render() {
    return (
      <OrderConfirmationView
        onCloseModal={this.onCloseError}
        onCloseToast={this.onCloseToast}
        {...this.state}
      />
    );
  }
}

export default withRouter(ShipToHomeOrderConfirmation);
