import React from "react";
import View from "online-shopping-cargo-parent/dist/view";
import ClientApplicationComponent from "../clientApplicationComponent";
import { GET_GITHUB_JSON_CONTENT } from "online-shopping-cargo-parent/dist/service";

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
    const { androidAPK, baseUrl, ios } = this.state.installAppContent;
    return (
      <View
        style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <DownloadButton baseUrl={baseUrl} {...androidAPK} />
        <DownloadButton baseUrl={baseUrl} {...ios} />
      </View>
    );
  }
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
