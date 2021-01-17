import React from "react";
import { ADDRESS_GENERATOR, LOGIN } from "../menu/menu";
import { CircularButton } from "../menu/menu.view";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import View from "online-shopping-cargo-parent/dist/view";
import { GITHUB_CONTENT_URL } from "online-shopping-cargo-parent/dist/service";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { styleSchema } from "online-shopping-cargo-parent/dist/styleSchema";

const HOW_TO_GENERATE_ADDRESS = [
  {
    content: "輸入店號",
    extra: "如不清楚附近的店號，請諮詢微信客服:PickTB",
  },
  {
    content: "輸入你的手機號",
  },
  {
    content: "生成收貨地址",
  },
  {
    content: "複制並帖至淘寶",
    extra: "設為默認方便使用",
  },
];

const HOW_TO_LOGIN = [
  {
    content: "輸入手機號",
  },
  {
    content: "獲取驗證碼",
  },
  {
    content: "輸入驗證碼",
  },
  {
    content: "驗證",
  },
];

const HOW_IT_WORKS = [
  {
    content: "用戶注冊/登入",
  },
  {
    content: "生成收貨地址",
  },
  {
    content: "地址添加到淘寶或其他購物網站",
  },
  {
    content: "包裹發到用戶所選的店號",
  },
  {
    content: "該店收到包裹後發出短信提醒用戶提取包裹",
  },
];

export default function Tutorial(props) {
  return (
    <div>
      <HowItWorks />
      <SectionLineBreak />
      <LoginSection />
      <SectionLineBreak />
      <AddAddressSection />
    </div>
  );
}

function AddAddressSection() {
  return (
    <div>
      <h5>收貨地址</h5>
      <ButtonToClickContainer text="在主畫面輕觸生成地址">
        <CircularButton {...ADDRESS_GENERATOR} label="" onClick={() => {}} />
      </ButtonToClickContainer>
      {generateSectionText(HOW_TO_GENERATE_ADDRESS)}
      <TutorialImage
        src={`${GITHUB_CONTENT_URL}/assert/address_generator_1.png`}
      />
      <TutorialImage
        src={`${GITHUB_CONTENT_URL}/assert/address_generator_2.png`}
      />
    </div>
  );
}
function ButtonToClickContainer({ children, text }) {
  return (
    <View
      style={{
        alignItems: "center",
        borderRadius: 15,
        boxShadow: styleSchema.shadow,
        justifyContent: "space-evenly",
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        width: "100%",
      }}
    >
      <P style={{ marginRight: 20 }}>{text}</P>
      {children}
    </View>
  );
}

function HowItWorks() {
  return (
    <div>
      <h5>如何運作</h5>
      {generateSectionText(HOW_IT_WORKS)}
    </div>
  );
}

function LoginSection() {
  return (
    <div>
      <h5>登入/注冊</h5>
      <ButtonToClickContainer text="在主畫面輕觸">
        <CircularButton {...LOGIN} label="" onClick={() => {}} />
      </ButtonToClickContainer>
      {generateSectionText(HOW_TO_LOGIN)}
      <TutorialImage src={`${GITHUB_CONTENT_URL}/assert/login_1.png`} />
      <TutorialImage src={`${GITHUB_CONTENT_URL}/assert/login_2.png`} />
    </div>
  );
}

function SectionLineBreak() {
  return <LineBreak style={{ marginBottom: 15, marginTop: 15 }} />;
}

function TutorialImage({ src }) {
  return <img src={src} style={{ width: "100%" }} />;
}

function generateSectionText(steps) {
  const { column, extra, stepContainer } = styles;
  return steps.map((step, index) => {
    const extraContent = step.extra ? (
      <Row>
        <Col xs={1} />
        <Col style={column}>
          <P style={extra}>{step.extra}</P>
        </Col>
      </Row>
    ) : null;
    return (
      <div style={stepContainer}>
        <Row>
          <Col xs={1}>
            <P>{`${index + 1}.`}</P>
          </Col>
          <Col style={column}>
            <P>{step.content}</P>
          </Col>
        </Row>
        {extraContent}
      </div>
    );
  });
}

const styles = {
  column: {
    padding: 0,
  },
  extra: {
    color: "red",
    fontSize: 11,
  },
  stepContainer: {
    marginBottom: 2,
    marginTop: 2,
  },
};
