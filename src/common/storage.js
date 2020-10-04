export default class Storage {
  getUserToken() {
    return localStorage.getItem("USER_TOKEN") ?? "";
  }

  removeUserToken() {
    localStorage.removeItem("USER_TOKEN");
  }

  saveUserToken(token) {
    localStorage.setItem("USER_TOKEN", token);
  }
}
