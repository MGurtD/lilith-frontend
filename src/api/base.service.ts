import { AxiosInstance } from "axios";
import apiClient, { logException } from "./api.client";

export default abstract class BaseService<T> {
  public apiClient: AxiosInstance;
  constructor(public resource: string) {
    this.apiClient = apiClient;
  }

  async getAll(): Promise<Array<T> | undefined> {
    try {
      const response = await apiClient.get(this.resource);
      if (response.status === 200) {
        return response.data as Array<T>;
      } else {
        // TODO: Toast amb error
      }
    } catch (err) {
      logException(err);
    }
  }
  async getById(id: string): Promise<T | undefined> {
    try {
      const response = await apiClient.get(`${this.resource}/${id}`);
      if (response.status === 200) {
        return response.data as T;
      } else {
        // TODO: Toast amb error
      }
    } catch (err) {
      logException(err);
    }
  }
  async create(model: T): Promise<boolean> {
    let result: boolean = false;
    try {
      const response = await apiClient.post(`${this.resource}`, model);
      if (response.status === 200 || response.status === 201) {
        result = true;
      } else {
        // TODO: Toast amb error
      }
    } catch (err) {
      logException(err);
    }
    return result;
  }
  async update(id: string, model: T) {
    let result: boolean = false;
    try {
      const response = await apiClient.put(`${this.resource}/${id}`, model);
      if (response.status === 200 || response.status === 201) {
        result = true;
      } else {
        // TODO: Toast amb error
      }
    } catch (err) {
      logException(err);
    }
    return result;
  }
  async delete(id: string) {
    let result: boolean = false;
    try {
      const response = await apiClient.delete(`${this.resource}/${id}`);
      if (response.status === 200 || response.status === 201) {
        result = true;
      } else {
        // TODO: Toast amb error
      }
    } catch (err) {
      logException(err);
    }
    return result;
  }
}
