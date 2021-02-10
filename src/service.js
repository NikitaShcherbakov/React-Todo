import { url, queryOptions, searchError } from "./constants.js";

const getXmlAnswer = () => {
    return fetch(url, queryOptions).then((response) => {
      let responseCode = response.status;
      switch (responseCode) {
        case 200:
          return response.text();
        case 404:
          throw searchError;
        default:
          let responseStatus = response.statusText;
          let emptyStatus = "Status text did not come";
          let status = responseStatus || emptyStatus;
          let newError = new Object();
          newError.description = `Something went wrong`;
          newError.status = `StatusText: ${status}`;
          newError.code = `Status: ${responseCode}`;
          newError.url = `Url: ${url}`;
          throw newError;
      }
    });
};

export {
    getXmlAnswer
};