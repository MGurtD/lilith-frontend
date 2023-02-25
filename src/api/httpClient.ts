import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // anything you want to add to the headers
  },
});

export default httpClient;
