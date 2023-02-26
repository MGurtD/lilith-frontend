import { Axios, AxiosInstance } from "axios";
import apiClient from "./api.client";

export default abstract class BaseService<T> {
  public apiClient: AxiosInstance;
  constructor(public resource: string) {
    this.apiClient = apiClient;
  }

  getAll() {
    return apiClient.get(this.resource);
  }
  getById(id: number) {
    return apiClient.get(`${this.resource}/${id}`);
  }
  create(model: T) {
    return apiClient.post(this.resource, model);
  }
  update(model: T) {
    return apiClient.put(this.resource, model);
  }
  delete(id: number) {
    return apiClient.delete(`${this.resource}/${id}`);
  }
}
