import React from "react";
import ApplicationComponentView from "online-shopping-cargo-parent/dist/applicationComponent.view";
import View from "online-shopping-cargo-parent/dist/view";

export default class RedPocketView extends ApplicationComponentView {
  render() {
    return (
      <this.Wrapper>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>微信為澳提用戶贈送紅包</p>
          <p>微信搜"澳提" 或掃描以下二維碼</p>
          <img
            alt=""
            src="https://raw.githubusercontent.com/pkkwilliam/github.io-contents/master/oscm/assert/office_account_qrcode.jpg"
          />
          <p>關注公眾號即可領取紅包</p>
        </View>
      </this.Wrapper>
    );
  }
}
