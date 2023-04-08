import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

const apiClient = axios.create({
  baseURL: baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // anything you want to add to the headers
  },
  validateStatus: function (status) {
    return status < 500; // Resolve only if the status code is less than 500
  },
});

export function logException(error: any) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
}

export default apiClient;
