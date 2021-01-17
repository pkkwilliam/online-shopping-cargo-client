import React from "react";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";
import EyeCatch from "../eyeCatch/eyeCatch";
import Header from "../header/header";
import FooterView from "../footer/footer.view";
import { GITHUB_CONTENT_URL } from "online-shopping-cargo-parent/dist/service";

export default function LandingPage(props) {
  return (
    <>
      <Header>
        <img
          alt={"header_icon"}
          src={`${GITHUB_CONTENT_URL}/assert/logo.png`}
          style={{ height: 45 }}
        />
      </Header>
      <EyeCatch />
      <div style={{ padding: 10, marginBottom: 40 }}>
        {props.children}
        <Disclaimer />
      </div>
      <FooterView />
    </>
  );
}

function Disclaimer() {
  return (
    <>
      <P style={styles.disclaimerText}>
        * 1135代收點因租金成本過高, 無法提供免費試用.
      </P>
      <P style={styles.disclaimerText}>
        * 新用戶免費限重量或體積重量不大於2公斤的包裹
      </P>
    </>
  );
}

const styles = {
  disclaimerText: {
    color: styleSchema.color.secondaryDark,
    fontSize: 8,
  },
};
