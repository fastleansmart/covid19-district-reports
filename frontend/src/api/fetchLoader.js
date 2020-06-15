const baseURL = "http://localhost:8070";

class FetchLoader {
  constructor({ baseURL, method }) {
    this.baseURL = baseURL;
    this.method = method;
  }

  buildAPIEndpoint(baseURL, endpoint) {
    return `${baseURL}${endpoint}`;
  }

  buildQueryString(parameters) {
    return Object.keys(parameters)
      .map((key) => `${key}=${parameters[key]}`)
      .join("&");
  }

  // e.g. /federal-states
  makeCall({ endpoint, parameters }) {
    const { baseURL, method } = this;
    let url = this.buildAPIEndpoint(baseURL, endpoint);

    return this[method](url, parameters);
  }

  GET(url, parameters) {
    let fullURL = url;
    if (parameters) fullURL += `?${this.buildQueryString(parameters)}`;
    return fetch(fullURL, { method: "GET" }).then((res) => res.json());
  }

  POST(fullURL, parameters) {
    return fetch(fullURL, {
      method: "POST",
      headers: {
        "Content-Type": "json",
      },
      body: JSON.stringify(parameters),
    });
  }
}

const createFetchLoaderForEndpoint = (endpoint, method = "GET") => {
  const fetchLoader = new FetchLoader({ baseURL, method });
  return (parameters) => {
    return fetchLoader.makeCall({ endpoint, parameters });
  };
};

const fetchFederalStates = createFetchLoaderForEndpoint("/federal-states");
const fetchDistrictsByState = createFetchLoaderForEndpoint("/districts");
const postReportForDistrict = createFetchLoaderForEndpoint("/reports", "POST");
const fetchFederalStateSummaryReports = createFetchLoaderForEndpoint("/reports");

export { fetchFederalStates, fetchDistrictsByState, postReportForDistrict, fetchFederalStateSummaryReports };
