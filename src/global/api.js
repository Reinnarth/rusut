import axios from "axios";

const API_URL = "https://rusut.herokuapp.com";

// const getToken = async () => {
//   const token = await localStorage.getItem("token");
//   return token;
// };

// const getHeaders = async (extendHeaders) => {
//   const headers = {
//     Accept: "application/json",
//   };

//   Object.keys(extendHeaders).forEach((key) => {
//     headers[key] = extendHeaders[key];
//   });

class API {
  axios = axios.create({
    // withCredentials: true,
    validateStatus(status) {
      return status >= 200 && status < 505;
    },
  });
  constructor(baseURL) {
    this.baseUrl = baseURL;
    this.init();
  }

  init = () => {
    this.axios.defaults.baseURL = this.baseUrl;
    this.axios.interceptors.request.use(this.requestSetHeaders, () => ({
      error: "Request is rejected",
    }));
  };

  requestSetHeaders = (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  };
}

export default new API(API_URL);
