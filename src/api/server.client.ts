import axios from "axios";
import { useApiStore } from "../store/backend";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL as string;

const serverClient = axios.create({
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

// Add a request interceptor
serverClient.interceptors.request.use(
  function (config) {
    const store = useApiStore();
    store.isWaiting = true;

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
serverClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const store = useApiStore();
    store.isWaiting = false;

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const store = useApiStore();
    store.isWaiting = false;
    store.setError("Error de comunicació amb el servidor de producció.");

    logException(error);
    return Promise.reject(error);
  }
);

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
  console.log(error);
}

export default serverClient;
