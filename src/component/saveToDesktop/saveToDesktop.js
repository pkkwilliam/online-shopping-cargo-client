import React from "react";
import ClientApplicationComponent from "../clientApplicationComponent";
import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";
import P from "online-shopping-cargo-parent/dist/text/paragraph";
import View from "online-shopping-cargo-parent/dist/view";
import ThreeDots from "react-bootstrap-icons/dist/icons/three-dots";
import BoxArrowUp from "react-bootstrap-icons/dist/icons/box-arrow-up";
import PlusSquare from "react-bootstrap-icons/dist/icons/plus-square";
import BackgroundCard from "../common/backgroundCard";
import LineBreak from "online-shopping-cargo-parent/dist/lineBreak";
import ArrowLeft from "react-bootstrap-icons/dist/icons/arrow-left";
import detectBrowser, {
  BROWSER_CHROME,
  BROWSER_SAFARI,
  BROWSER_WECHAT,
} from "../common/determineBrowser";

const APPLE_BLUE = "#006EE6";

export default class SaveToDesktop extends ClientApplicationComponent {
  state = {
    ...this.state,
    browserInfo: {
      browserName: "",
    },
    saveToDesktopImageJsonContent: {
      baseUrl: "",
      chromeImage: "",
      safariImage: "",
      wechatIamge: "",
    },
  };

  componentDidMount() {
    this.setState({
      browserInfo: {
        browserName: detectBrowser(),
      },
    });
    this.serviceExecutor
      .execute(GET_GITHUB_JSON_CONTENT("/label/save_to_desktop.json"))
      .then((saveToDesktopImageJsonContent) =>
        this.setState({ saveToDesktopImageJsonContent })
      );
  }

  render() {
    const { browserInfo, saveToDesktopImageJsonContent } = this.state;
    const { browserName } = browserInfo;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <BackIcon />
        {getDisplayContent(browserName, saveToDesktopImageJsonContent)}
      </View>
    );
  }
}

function getDisplayContent(browserName, saveToDesktopImageJsonContent) {
  switch (browserName) {
    case BROWSER_CHROME:
      return (
        <ChromeInstruction
          saveToDesktopImageJsonContent={saveToDesktopImageJsonContent}
        />
      );
    case BROWSER_SAFARI:
      return (
        <SafariInstruction
          saveToDesktopImageJsonContent={saveToDesktopImageJsonContent}
        />
      );
    case BROWSER_WECHAT:
      return (
        <WeChatInstruction
          saveToDesktopImageJsonContent={saveToDesktopImageJsonContent}
        />
      );
    default:
      return <p>暫時未有止瀏覽器教程，請瀏覽器PickTB店面客服。</p>;
  }
}

function Arrow({ style }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-app"
      viewBox="0 0 512.171 512.171"
      style={{
        color: APPLE_BLUE,
        height: 40,
        width: 40,
        ...style,
      }}
    >
      <path
        d="M476.723,216.64L263.305,3.115C261.299,1.109,258.59,0,255.753,0c-2.837,0-5.547,1.131-7.552,3.136L35.422,216.64
    c-3.051,3.051-3.947,7.637-2.304,11.627c1.664,3.989,5.547,6.571,9.856,6.571h117.333v266.667c0,5.888,4.779,10.667,10.667,10.667
    h170.667c5.888,0,10.667-4.779,10.667-10.667V234.837h116.885c4.309,0,8.192-2.603,9.856-6.592
    C480.713,224.256,479.774,219.691,476.723,216.64z"
      />
    </svg>
  );
}

function AppImageSection({ imageSrc }) {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <P style={{ fontSize: "1.2rem", fontWeight: 300, marginTop: 15 }}>
        添加App到桌面
      </P>
      <img
        alt="app_image"
        src={imageSrc}
        style={{ marginTop: 25, width: "65%" }}
      />
    </View>
  );
}

function BackIcon() {
  return (
    <ArrowLeft
      onClick={() => window.history.back()}
      style={{ fontSize: 30, left: 0, position: "fixed", margin: 15 }}
    />
  );
}

function CenterBottomArrow() {
  return <Arrow style={{ alignSelf: "center", transform: "rotate(180deg)" }} />;
}

function ChromeInstruction({ saveToDesktopImageJsonContent }) {
  const { baseUrl, appImage } = saveToDesktopImageJsonContent;
  return (
    <>
      <TopRightArrow />
      <AppImageSection imageSrc={baseUrl + appImage} />
      <InstructionContainer
        imageSrc={null}
        instructionFirstRow={
          <>
            <P style={{ fontSize: "1.1rem" }}>點擊右上方的</P>
            <ThreeDots
              style={{
                color: APPLE_BLUE,
                fontSize: "1.5rem",
                marginLeft: 3,
                transform: "rotate(90deg)",
              }}
            />
          </>
        }
        instructionSecondRow={
          <P style={{ fontSize: "1.1rem" }}>
            並選擇<StrongFont>"加到主畫面"</StrongFont>
          </P>
        }
      />
    </>
  );
}

function InstructionContainer({
  children,
  imageSrc,
  instructionFirstRow,
  instructionSecondRow,
}) {
  return (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
    >
      <BackgroundCard
        style={{
          margin: 15,
          padding: 10,
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "column" }}>
          <View>
            <P style={styles.step}>1.</P> {instructionFirstRow}
          </View>
          <View style={{ alignItems: "center" }}>
            <P style={styles.step}>2.</P> {instructionSecondRow}
          </View>
        </View>
        {imageSrc ? (
          <>
            <LineBreak
              style={{ borderColor: "darkgray", marginBottom: 5, marginTop: 5 }}
            />
            <img
              alt="instruction_image"
              src={imageSrc}
              style={{
                borderRadius: 5,
                width: "100%",
                marginTop: 5,
              }}
            />
          </>
        ) : null}
      </BackgroundCard>
      {children}
    </View>
  );
}

function SafariInstruction({ saveToDesktopImageJsonContent }) {
  const { baseUrl, appImage, safariImage } = saveToDesktopImageJsonContent;
  return (
    <>
      <AppImageSection imageSrc={baseUrl + appImage} />
      <InstructionContainer
        imageSrc={baseUrl + safariImage}
        instructionFirstRow={
          <>
            <P style={{ fontSize: "1.1rem" }}>點擊下方的</P>
            <BoxArrowUp
              style={{
                color: APPLE_BLUE,
                fontSize: "1.5rem",
                marginLeft: 3,
              }}
            />
          </>
        }
        instructionSecondRow={
          <>
            <P style={{ fontSize: "1.1rem" }}>並選擇</P>
            &nbsp;
            <PlusSquare style={{ fontSize: "1.2rem", marginBottom: 2 }} />
            &nbsp;
            <StrongFont>"加到主畫面"</StrongFont>
          </>
        }
      >
        <CenterBottomArrow />
      </InstructionContainer>
    </>
  );
}

function StrongFont({ children }) {
  return (
    <strong style={{ fontSize: "1.1rem", color: APPLE_BLUE }}>
      {children}
    </strong>
  );
}

function TopRightArrow() {
  return <Arrow style={{ alignSelf: "flex-end", marginRight: 10 }} />;
}

function WeChatInstruction({ saveToDesktopImageJsonContent }) {
  const { baseUrl, appImage, wechatImage } = saveToDesktopImageJsonContent;
  return (
    <>
      <TopRightArrow />
      <AppImageSection imageSrc={baseUrl + appImage} />
      <InstructionContainer
        imageSrc={baseUrl + wechatImage}
        instructionFirstRow={
          <>
            <P style={{ fontSize: "1.1rem" }}>點擊右上方的</P>
            <ThreeDots
              style={{ color: APPLE_BLUE, fontSize: "1.5rem", marginLeft: 3 }}
            />
          </>
        }
        instructionSecondRow={
          <P style={{ fontSize: "1.1rem" }}>
            並選擇<StrongFont>"在瀏覽器打開"</StrongFont>
          </P>
        }
      />
    </>
  );
}

const styles = {
  step: {
    fontSize: "1.1rem",
  },
};
