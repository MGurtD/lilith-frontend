import BaseService from "../../../api/base.service";
import { Lifecycle, Status, StatusTransition } from "../types";

export default class LifecycleService extends BaseService<Lifecycle> {
  async getByName(name: string): Promise<Lifecycle | undefined> {
    const response = await this.apiClient.get(`${this.resource}/name/${name}}`);
    if (response.status === 200) {
      return response.data as Lifecycle;
    }
  }
  // Statuses
  async createStatus(model: Status): Promise<boolean> {
    const response = await this.apiClient.post(
      `${this.resource}/Status`,
      model
    );
    return response.status === 200 || response.status === 201;
  }
  async updateStatus(model: Status): Promise<boolean> {
    const response = await this.apiClient.put(
      `${this.resource}/Status/${model.id}`,
      model
    );
    return response.status === 200 || response.status === 201;
  }
  async deleteStatus(id: string): Promise<boolean> {
    const response = await this.apiClient.delete(
      `${this.resource}/Status/${id}`
    );
    return response.status === 200 || response.status === 201;
  }
  // Transitions
  async createTransition(model: StatusTransition): Promise<boolean> {
    const response = await this.apiClient.post(
      `${this.resource}/StatusTransition`,
      model
    );
    return response.status === 200 || response.status === 201;
  }
  async updateTransition(model: StatusTransition): Promise<boolean> {
    const response = await this.apiClient.put(
      `${this.resource}/StatusTransition/${model.id}`,
      model
    );
    return response.status === 200 || response.status === 201;
  }
  async deleteTransition(id: string): Promise<boolean> {
    const response = await this.apiClient.delete(
      `${this.resource}/StatusTransition/${id}`
    );
    return response.status === 200 || response.status === 201;
  }
}
