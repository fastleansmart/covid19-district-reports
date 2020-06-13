const baseURL = "http://localhost:8070";

class FetchLoader {
    constructor({ baseURL }) {
        this.baseURL = baseURL;
    }

    buildAPIEndpoint(baseURL, endpoint) {
        return `${baseURL}${endpoint}`;
    }

    buildQueryString(parameters) {
        return Object.keys(parameters)
            .map(key => `${key}=${parameters[key]}`)
            .join('&');
    }

    // e.g. /federal-states
    makeCall({ endpoint, parameters }) {    
        let fullURL = this.buildAPIEndpoint(this.baseURL, endpoint);
        if (parameters)
            fullURL += `?${this.buildQueryString(parameters)}`;

        return fetch(fullURL)
            .then(res => res.json())               
    }

    fetchFederalStates() {
        return this.makeCall({ endpoint: '/federal-states' });
    }
}

const createFetchLoaderForEndpoint = (endpoint) => {
    const fetchLoader = new FetchLoader({ baseURL });
    return (parameters) => {
        return fetchLoader.makeCall({ endpoint, parameters });
    };    
}

const fetchFederalStates = createFetchLoaderForEndpoint('/federal-states');
const fetchFederalStateSummaryReports = createFetchLoaderForEndpoint('/reports');

export { fetchFederalStates, fetchFederalStateSummaryReports }