import axios from "axios";

const API_URL = "http://localhost:8080/CourseWorkRusut_war_exploded";

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

//   const token = await getToken();

//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   return headers;
// };

// export const get = async (endpoint = "", extendHeaders = {}) => {
//   try {
//     const { data, headers } = await axios.get(`${API_URL}${endpoint}`, {
//       headers: await getHeaders(extendHeaders),
//     });
//     return { data, headers };
//   } catch (error) {
//     return error.response;
//   }
// };

// export const post = async (body, endpoint = "", extendHeaders = {}) => {
//   try {
//     const response = await axios.post(`${API_URL}${endpoint}`, body, {
//       headers: await getHeaders(extendHeaders),
//     });

//     const { headers, data } = response;
//     return { data, headers };
//   } catch (error) {
//     return error.response;
//   }
// };

// export const put = async (body = {}, endpoint = "", extendHeaders = {}) => {
//   try {
//     const response = await axios.put(`${API_URL}${endpoint}`, body, {
//       headers: await getHeaders(extendHeaders),
//     });

//     const { headers, data } = response;
//     return { data, headers };
//   } catch (error) {
//     return error.response;
//   }
// };

// export const del = async (body = {}, endpoint = "", extendHeaders = {}) => {
//   try {
//     const response = await axios.delete(`${API_URL}${endpoint}`, {
//       data: body,
//       headers: await getHeaders(extendHeaders),
//     });
//     const { headers, data } = response;
//     return { data, headers };
//   } catch (error) {
//     return error.response;
//   }
// };

class API {
  //   const getToken = async () => {
  //   const token = await localStorage.getItem("token");
  //   return token;
  // };
  axios = axios.create({
    withCredentials: true,
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
