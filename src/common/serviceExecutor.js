export default class ServiceExecutor {
  baseUrl;
  persistHeaderToken;
  removeHeaderToken;
  retrieveHeaderToken;

  constructor(
    baseUrl,
    persistHeaderToken,
    removeHeaderToken,
    retrieveHeaderToken
  ) {
    this.baseUrl = baseUrl;
    this.persistHeaderToken = persistHeaderToken;
    this.removeHeaderToken = removeHeaderToken;
    this.retrieveHeaderToken = retrieveHeaderToken;
  }

  async execute(service) {
    return new Promise((resolve, reject) => {
      fetch(this.baseUrl + service.requestMapping, {
        body: service.body,
        headers: this.generateHeader(service.publicRequset),
        method: service.requestMethod,
      })
        .then((result) => {
          if (result.status < 300) {
            this.saveHeaderToken(result.headers);
            return result.status === 204 ? result : result.json();
          } else if (result.status === 403) {
            this.removeHeaderToken();
            reject(result.statusText);
          } else {
            reject(result.statusText);
          }
        })
        .then((result) => resolve(result))
        .catch((ex) => reject(ex));
    });
  }

  saveHeaderToken(headers) {
    const userToken = headers.get("Authorization");
    if (userToken) {
      console.debug("--- save user token ---");
      this.persistHeaderToken(userToken);
      window.location.reload();
    }
  }

  generateHeader(publicRequest) {
    var header = {
      "Content-Type": "application/json",
    };
    if (!publicRequest) {
      const userToken = this.retrieveHeaderToken();
      console.debug(userToken);
      header = {
        ...header,
        ...{ Authorization: `Bearer ${userToken}` },
      };
    }
    console.log(header);
    return header;
  }
}
