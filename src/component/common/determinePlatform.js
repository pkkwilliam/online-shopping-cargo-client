export const ANDROID = "Android";
export const IPAD = "iPad";
export const IPHONE = "iPhone";

export default function determinePlatform() {
  const platform = window.navigator.platform;
  switch (platform) {
    case ANDROID:
      return ANDROID;
    case IPHONE:
      return IPHONE;
  }
}
