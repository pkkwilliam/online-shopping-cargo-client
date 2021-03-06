import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ClientApplicationComponent from "../clientApplicationComponent";
import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";
import determinePlatform, { IPHONE } from "../common/determinePlatform";

export default class InstallApp extends ClientApplicationComponent {
  state = {
    installAppContent: {
      androidAPK: {},
      baseUrl: "",
    },
  };

  componentDidMount() {
    this.serviceExecutor
      .execute(GET_GITHUB_JSON_CONTENT("/label/install_app.json"))
      .then((installAppContent) => this.setState({ installAppContent }));
  }

  render() {
    return (
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          margin: 50,
        }}
      >
        <PlatformSelection {...this.state.installAppContent} />
      </View>
    );
  }
}

function PlatformSelection({ androidAPK, baseUrl, ios }) {
  const platform = determinePlatform();
  const downloadableButtons = [<DownloadButton baseUrl={baseUrl} {...ios} />];
  if (platform !== IPHONE) {
    downloadableButtons.push(
      <DownloadButton baseUrl={baseUrl} {...androidAPK} />
    );
  }
  return <>{downloadableButtons}</>;
}

function DownloadButton({ baseUrl, contentUrl, description, imageUrl, type }) {
  return (
    <View
      style={{ alignItems: "center", flexDirection: "column", padding: 10 }}
    >
      <a href={type === "ANDROID_APK" ? contentUrl : ""}>
        <img src={baseUrl + imageUrl} style={{ width: "11rem" }} />
      </a>
      <p>{description}</p>
    </View>
  );
}
