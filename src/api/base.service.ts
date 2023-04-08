import { AxiosInstance } from "axios";
import apiClient from "./api.client";

export default abstract class BaseService<T> {
  public apiClient: AxiosInstance;
  constructor(public resource: string) {
    this.apiClient = apiClient;
  }

  getAll() {
    return apiClient.get(this.resource);
  }
  getById(id: string) {
    return apiClient.get(`${this.resource}/${id}`);
  }
  create(model: T) {
    return apiClient.post(this.resource, model);
  }
  update(id: string, model: T) {
    return apiClient.put(`${this.resource}/${id}`, model);
  }
  delete(id: string) {
    return apiClient.delete(`${this.resource}/${id}`);
  }
}
