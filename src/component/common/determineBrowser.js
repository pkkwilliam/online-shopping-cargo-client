export const BROWSER_CHROME = "BROWSER_CHROME";
export const BROWSER_SAFARI = "BROWSER_SAFARI";
export const BROWSER_WECHAT = "BROWSER_WECHAT";

export default function detectBrowser() {
  var userAgent = navigator.userAgent;
  if (userAgent.indexOf("Chrome") !== -1) {
    return BROWSER_CHROME;
  } else if (userAgent.indexOf("Safari") !== -1) {
    return BROWSER_SAFARI;
  } else if (userAgent.indexOf("MicroMessenger") !== -1) {
    return BROWSER_WECHAT;
  }
}
