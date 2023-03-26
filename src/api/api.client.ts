import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL as string;

console.log(baseUrl);
console.log(import.meta.env);

const apiClient = axios.create({
  baseURL: baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // anything you want to add to the headers
  },
});

export default apiClient;
