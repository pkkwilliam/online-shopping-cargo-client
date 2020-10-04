export default class ApplicationContext {
  get mock() {
    return true;
  }

  get serviceUrl() {
    return this.mock ? "http://localhost:8081" : "http://localhost:8081";
  }
}
