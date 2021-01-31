import React from "react";
import Button from "react-bootstrap/esm/Button";
import View from "online-shopping-cargo-parent/dist/view";

export default function ShopLandingPage(props) {
  return (
    <div>
      <p>
        PickTB | 澳提
        正招募澳門代收點，我們是一間由擎思科技有限公司及龐志空運速遞有限公司合作的電子商務平台。
      </p>
      <p>
        我們現在正推廣轉運業務，讓香港及澳門的消費者在淘寶，天貓以及國外網站購物，下單時選擇我們的代收點作代收，以完成派送最後100米的難題。我們希望能與貴商戶合作，成為我們平台的代收點之一，以覆蓋全澳所有派送區域。
        注意到客戶的運費抵消運輸成本由平台與合作商戶共享。
      </p>
      <p>
        代收點的好處不止是代收本身的業務，而是它背後的流量。開通了代收快遞業務後，商戶的客流量會有顯著的提高。原本只是去取個快遞的顧客，很可能順手買瓶水，買包煙，積少成多，終以副業帶動主業的業績。
      </p>
      <p>
        代收最大特點在於靈活，更多的是一種“兼職”性質的營生。很多代收都是便利店，超市的“副業”，專門分割出一部分空間經營代收業務。
      </p>
      <p>
        為了促進澳門的電商代收平台，我們承諾不承認任何押金或加盟費，同時，我們提供運輸鏈，設備，廣告，電子管理平台以及消費者手機應用等的一站式服務。
      </p>
      <p>我們現接受個體，連鎖，物業，校園四個專屬合作通道，期待你的加入！</p>
      <View style={styles.bottonContainer}>
        <Button
          block
          href="https://docs.google.com/forms/d/e/1FAIpQLSeg8GQ08Mzssb3OtZxS_TQTuRGfOy7jdqr9SUBAkHCevwxswg/viewform?usp=sf_link"
          target="_blank"
          variant="warning"
        >
          加入我們
        </Button>
      </View>
    </div>
  );
}

const styles = {
  bottonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
};
